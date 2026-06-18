import json
import os
import sys
from copy import deepcopy
from datetime import datetime, timedelta, timezone
from pathlib import Path
from types import SimpleNamespace

os.environ.setdefault("MONGO_URL", "mongodb://localhost:27017")
os.environ.setdefault("DB_NAME", "footruck_test")

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

try:
    import stripe  # noqa: F401
except ModuleNotFoundError:
    sys.modules["stripe"] = SimpleNamespace(
        api_key=None,
        checkout=SimpleNamespace(Session=SimpleNamespace(create=None)),
        error=SimpleNamespace(StripeError=Exception),
    )

import pytest
from fastapi.testclient import TestClient

import server


class FakeCursor:
    def __init__(self, docs):
        self.docs = [deepcopy(doc) for doc in docs]

    def sort(self, key, direction):
        reverse = direction < 0
        self.docs.sort(key=lambda doc: doc.get(key) or "", reverse=reverse)
        return self

    async def to_list(self, length):
        return [deepcopy(doc) for doc in self.docs[:length]]


class FakeCollection:
    def __init__(self):
        self.docs = []

    async def insert_one(self, doc):
        stored = deepcopy(doc)
        stored.setdefault("_id", f"fake_{len(self.docs) + 1}")
        self.docs.append(stored)
        return SimpleNamespace(inserted_id=stored["_id"])

    def find(self, query=None, projection=None):
        docs = [
            self._project(doc, projection)
            for doc in self.docs
            if self._matches(doc, query or {})
        ]
        return FakeCursor(docs)

    async def find_one(self, query=None, projection=None, sort=None):
        docs = [doc for doc in self.docs if self._matches(doc, query or {})]
        if sort:
            for key, direction in reversed(sort):
                docs.sort(key=lambda doc: doc.get(key) or "", reverse=direction < 0)
        if not docs:
            return None
        return self._project(docs[0], projection)

    async def update_one(self, query, update, upsert=False):
        for doc in self.docs:
            if self._matches(doc, query):
                before = deepcopy(doc)
                self._apply_update(doc, update)
                return SimpleNamespace(modified_count=1 if doc != before else 0)

        if upsert:
            doc = deepcopy(query)
            self._apply_update(doc, update)
            doc.setdefault("_id", f"fake_{len(self.docs) + 1}")
            self.docs.append(doc)
            return SimpleNamespace(modified_count=0, upserted_id=doc["_id"])

        return SimpleNamespace(modified_count=0, upserted_id=None)

    async def delete_one(self, query):
        for index, doc in enumerate(self.docs):
            if self._matches(doc, query):
                del self.docs[index]
                return SimpleNamespace(deleted_count=1)
        return SimpleNamespace(deleted_count=0)

    @staticmethod
    def _matches(doc, query):
        return all(doc.get(key) == value for key, value in query.items())

    @staticmethod
    def _project(doc, projection):
        projected = deepcopy(doc)
        if projection and projection.get("_id") == 0:
            projected.pop("_id", None)
        return projected

    @staticmethod
    def _apply_update(doc, update):
        if "$set" in update:
            doc.update(deepcopy(update["$set"]))
        else:
            doc.update(deepcopy(update))


class FakeDB:
    def __init__(self):
        self._collections = {}

    def __getattr__(self, name):
        if name not in self._collections:
            self._collections[name] = FakeCollection()
        return self._collections[name]


@pytest.fixture
def fake_db(monkeypatch):
    db = FakeDB()
    monkeypatch.setattr(server, "db", db)
    return db


@pytest.fixture
def client(fake_db):
    return TestClient(server.app)


def seed_user(fake_db, token="session_token", user_id="user_123", expires_at=None):
    from jose import jwt

    expires_at = expires_at or datetime.now(timezone.utc) + timedelta(hours=1)
    fake_db.users.docs.append(
        {
            "user_id": user_id,
            "email": f"{user_id}@example.test",
            "name": f"Owner {user_id}",
            "picture": None,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
    )
    session_token = jwt.encode(
        {
            "user_id": user_id,
            "exp": expires_at,
            "jti": token,
        },
        os.environ.get("JWT_SECRET", "dev-secret-change-in-production"),
        algorithm="HS256",
    )
    return {"Authorization": f"Bearer {session_token}"}


def test_auth_me_accepts_bearer_tokens_and_rejects_expired_sessions(client, fake_db):
    valid_headers = seed_user(fake_db, token="valid_token", user_id="user_valid")
    expired_headers = seed_user(
        fake_db,
        token="expired_token",
        user_id="user_expired",
        expires_at=datetime.now(timezone.utc) - timedelta(minutes=1),
    )

    valid_response = client.get("/api/auth/me", headers=valid_headers)
    assert valid_response.status_code == 200
    assert valid_response.json()["user_id"] == "user_valid"

    expired_response = client.get("/api/auth/me", headers=expired_headers)
    assert expired_response.status_code == 401
    assert expired_response.json()["detail"] == "Not authenticated"


def test_cors_allows_deployed_frontend_origin(client):
    response = client.options(
        "/api/auth/login",
        headers={
            "Origin": "https://footruck-apollo-frontend.onrender.com",
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type",
        },
    )

    assert response.status_code == 200
    assert (
        response.headers["access-control-allow-origin"]
        == "https://footruck-apollo-frontend.onrender.com"
    )
    assert response.headers["access-control-allow-credentials"] == "true"


def test_authenticated_truck_designs_are_upserted_and_filtered_by_user(client, fake_db):
    user_one_headers = seed_user(fake_db, token="token_one", user_id="user_one")
    user_two_headers = seed_user(fake_db, token="token_two", user_id="user_two")

    first_design = {
        "primary_color": "#111111",
        "accent_color": "#FFFFFF",
        "finish_type": "matte",
        "business_name": "First Truck",
    }
    updated_design = {
        "primary_color": "#E8592F",
        "accent_color": "#101010",
        "finish_type": "gloss",
        "business_name": "Updated Truck",
        "base_model": "truck_02",
    }
    other_user_design = {
        "primary_color": "#0057B8",
        "accent_color": "#FFFFFF",
        "finish_type": "metallic",
        "business_name": "Other Truck",
    }

    assert (
        client.post("/api/truck-designs", json=first_design, headers=user_one_headers).status_code
        == 200
    )
    assert (
        client.post("/api/truck-designs", json=updated_design, headers=user_one_headers).status_code
        == 200
    )
    assert (
        client.post("/api/truck-designs", json=other_user_design, headers=user_two_headers).status_code
        == 200
    )

    assert len(fake_db.truck_designs.docs) == 2

    user_one_response = client.get("/api/truck-designs", headers=user_one_headers)
    assert user_one_response.status_code == 200
    user_one_designs = user_one_response.json()
    assert len(user_one_designs) == 1
    assert user_one_designs[0]["business_name"] == "Updated Truck"
    assert user_one_designs[0]["base_model"] == "truck_02"

    user_two_latest = client.get("/api/truck-designs/latest", headers=user_two_headers)
    assert user_two_latest.status_code == 200
    assert user_two_latest.json()["business_name"] == "Other Truck"


def test_subscription_trial_flow_validates_auth_plan_and_expiration(client, fake_db):
    headers = seed_user(fake_db, token="trial_token", user_id="trial_user")

    unauthenticated = client.post("/api/subscription/start-trial", json={"plan_id": "standard"})
    assert unauthenticated.status_code == 401

    invalid_plan = client.post(
        "/api/subscription/start-trial",
        json={"plan_id": "enterprise"},
        headers=headers,
    )
    assert invalid_plan.status_code == 400
    assert invalid_plan.json()["detail"] == "Invalid plan"

    trial_response = client.post(
        "/api/subscription/start-trial",
        json={"plan_id": "standard"},
        headers=headers,
    )
    assert trial_response.status_code == 200
    subscription = trial_response.json()["subscription"]
    assert subscription["user_id"] == "trial_user"
    assert subscription["status"] == "trial"
    assert subscription["plan_id"] == "standard"

    stored_subscription = fake_db.subscriptions.docs[0]
    stored_subscription["trial_ends_at"] = (
        datetime.now(timezone.utc) - timedelta(seconds=1)
    ).isoformat()
    stored_subscription["status"] = "trial"

    status_response = client.get("/api/subscription/status", headers=headers)
    assert status_response.status_code == 200
    assert status_response.json()["status"] == "trial_expired"
    assert fake_db.subscriptions.docs[0]["status"] == "trial_expired"


def test_training_documents_enforce_size_limit_and_user_ownership(client, fake_db):
    user_one_headers = seed_user(fake_db, token="docs_one", user_id="docs_user_one")
    user_two_headers = seed_user(fake_db, token="docs_two", user_id="docs_user_two")

    oversized = {
        "name": "oversized.pdf",
        "category": "safety",
        "file_type": "application/pdf",
        "size": 3_000_000,
        "data_url": "data:application/pdf;base64," + ("a" * 3_500_001),
    }
    oversized_response = client.post(
        "/api/training-documents",
        json=oversized,
        headers=user_one_headers,
    )
    assert oversized_response.status_code == 413

    small_doc = {
        "name": "line-check.pdf",
        "category": "safety",
        "file_type": "application/pdf",
        "size": 120,
        "data_url": "data:application/pdf;base64,abc123",
    }
    created = client.post(
        "/api/training-documents",
        json=small_doc,
        headers=user_one_headers,
    )
    assert created.status_code == 200
    doc_id = created.json()["id"]

    user_two_list = client.get("/api/training-documents", headers=user_two_headers)
    assert user_two_list.status_code == 200
    assert user_two_list.json() == []

    forbidden_delete = client.delete(
        f"/api/training-documents/{doc_id}",
        headers=user_two_headers,
    )
    assert forbidden_delete.status_code == 404

    allowed_delete = client.delete(
        f"/api/training-documents/{doc_id}",
        headers=user_one_headers,
    )
    assert allowed_delete.status_code == 200
    assert allowed_delete.json() == {"deleted": True}


def test_stripe_checkout_webhook_activates_subscription(client, fake_db, monkeypatch):
    monkeypatch.setenv("STRIPE_API_KEY", "sk_test_local")
    monkeypatch.setenv("STRIPE_WEBHOOK_SECRET", "whsec_test_local")
    monkeypatch.setattr(
        server.stripe.Webhook,
        "construct_event",
        lambda body, signature, secret: json.loads(body),
    )
    fake_db.payment_transactions.docs.append(
        {
            "session_id": "cs_test_123",
            "payment_status": "pending",
            "user_id": "paid_user",
            "plan_id": "pro",
        }
    )

    response = client.post(
        "/api/webhook/stripe",
        json={
            "type": "checkout.session.completed",
            "data": {
                "object": {
                    "id": "cs_test_123",
                    "subscription": "sub_test_123",
                    "metadata": {
                        "user_id": "paid_user",
                        "plan_id": "pro",
                    },
                }
            },
        },
        headers={"stripe-signature": "test-signature"},
    )

    assert response.status_code == 200
    assert response.json() == {
        "status": "success",
        "event": "checkout.session.completed",
    }
    assert fake_db.payment_transactions.docs[0]["payment_status"] == "paid"
    assert (
        fake_db.payment_transactions.docs[0]["stripe_subscription_id"]
        == "sub_test_123"
    )
    assert fake_db.subscriptions.docs[0]["user_id"] == "paid_user"
    assert fake_db.subscriptions.docs[0]["plan_id"] == "pro"
    assert fake_db.subscriptions.docs[0]["status"] == "active"
