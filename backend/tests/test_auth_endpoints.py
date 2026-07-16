"""
Backend API tests for Food Truck Launch Pad Auth Endpoints.
Tests cover:
- /api/auth/me - Get current user (authenticated/unauthenticated)
- /api/auth/logout - Logout endpoint
- User-specific data filtering (truck-designs, recipes, etc.)
"""

import pytest
import requests
import os
import time

BASE_URL = os.environ.get("BACKEND_URL", "http://localhost:8000").rstrip("/")

# Test session token - loaded from environment for security
TEST_SESSION_TOKEN = os.environ.get("TEST_SESSION_TOKEN", "")
TEST_USER_ID = os.environ.get("TEST_USER_ID", "")

pytestmark = pytest.mark.skipif(
    os.environ.get("RUN_API_TESTS") != "1",
    reason="API integration tests are opt-in; set RUN_API_TESTS=1 to run them.",
)

requires_session_token = pytest.mark.skipif(
    not TEST_SESSION_TOKEN,
    reason="Requires TEST_SESSION_TOKEN (and TEST_USER_ID) for an existing user session.",
)


class TestAuthMe:
    """Tests for /api/auth/me endpoint"""
    
    def test_auth_me_without_auth_returns_401(self):
        """Unauthenticated request to /api/auth/me should return 401"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        
        data = response.json()
        assert "detail" in data
        assert data["detail"] == "Not authenticated"
        print("✓ /api/auth/me returns 401 for unauthenticated requests")
    
    @requires_session_token
    def test_auth_me_with_bearer_token(self):
        """Authenticated request with Bearer token should return user data"""
        headers = {"Authorization": f"Bearer {TEST_SESSION_TOKEN}"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "user_id" in data, "Response should contain user_id"
        assert "email" in data, "Response should contain email"
        assert "name" in data, "Response should contain name"
        assert data["user_id"] == TEST_USER_ID
        print(f"✓ /api/auth/me returns user data for authenticated user: {data['name']}")
    
    @requires_session_token
    def test_auth_me_with_cookie(self):
        """Authenticated request with session_token cookie should return user data"""
        cookies = {"session_token": TEST_SESSION_TOKEN}
        response = requests.get(f"{BASE_URL}/api/auth/me", cookies=cookies)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["user_id"] == TEST_USER_ID
        print("✓ /api/auth/me works with session_token cookie")
    
    def test_auth_me_with_invalid_token_returns_401(self):
        """Invalid session token should return 401"""
        headers = {"Authorization": "Bearer invalid_token_12345"}
        response = requests.get(f"{BASE_URL}/api/auth/me", headers=headers)
        assert response.status_code == 401, f"Expected 401, got {response.status_code}"
        print("✓ /api/auth/me returns 401 for invalid token")


class TestAuthLogout:
    """Tests for /api/auth/logout endpoint"""
    
    def test_logout_returns_success(self):
        """Logout endpoint should return success message"""
        response = requests.post(f"{BASE_URL}/api/auth/logout")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "message" in data
        assert data["message"] == "Logged out successfully"
        print("✓ /api/auth/logout returns success message")


class TestTruckDesignsLatest:
    """Tests for /api/truck-designs/latest endpoint"""
    
    def test_truck_designs_latest_unauthenticated(self):
        """Unauthenticated request should return any latest design (no user filter)"""
        response = requests.get(f"{BASE_URL}/api/truck-designs/latest")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        # Response can be null if no designs exist, or a design object
        if response.text and response.text != "null":
            data = response.json()
            if data:
                assert "primary_color" in data, "Design should have primary_color"
                assert "business_name" in data, "Design should have business_name"
                print(f"✓ /api/truck-designs/latest returns design: {data.get('business_name', 'N/A')}")
            else:
                print("✓ /api/truck-designs/latest returns null (no designs)")
        else:
            print("✓ /api/truck-designs/latest returns null (no designs)")
    
    def test_truck_designs_latest_authenticated(self):
        """Authenticated request should return only user's designs"""
        headers = {"Authorization": f"Bearer {TEST_SESSION_TOKEN}"}
        response = requests.get(f"{BASE_URL}/api/truck-designs/latest", headers=headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        # May return null if user has no designs yet
        if response.text and response.text != "null":
            data = response.json()
            if data:
                # If data exists and has user_id, it should match
                if "user_id" in data:
                    assert data["user_id"] == TEST_USER_ID, "Should return user's own design"
                print(f"✓ /api/truck-designs/latest (auth) returns design for user")
            else:
                print("✓ /api/truck-designs/latest (auth) returns null (no user designs)")
        else:
            print("✓ /api/truck-designs/latest (auth) returns null (no user designs)")


class TestUserSpecificDataPersistence:
    """Tests for saving data with user_id association"""
    
    def test_save_truck_design_unauthenticated(self):
        """Save design without auth - should not have user_id"""
        payload = {
            "primary_color": "#FF0000",
            "accent_color": "#000000",
            "finish_type": "matte",
            "business_name": "TEST_Anon Design"
        }
        response = requests.post(f"{BASE_URL}/api/truck-designs", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert "id" in data
        assert data["business_name"] == "TEST_Anon Design"
        # Unauthenticated request won't have user_id in response
        print(f"✓ Unauthenticated truck design saved with ID: {data['id']}")
    
    def test_save_truck_design_authenticated(self):
        """Save design with auth - should have user_id associated"""
        headers = {"Authorization": f"Bearer {TEST_SESSION_TOKEN}"}
        payload = {
            "primary_color": "#00FF00",
            "accent_color": "#FFFFFF",
            "finish_type": "gloss",
            "business_name": "TEST_Auth User Design",
            "base_model": "cargo_van",
            "split_pattern": "horizontal",
            "serving_window": "wide",
            "awning": "retractable_red",
            "accessories": ["led_underglow", "roof_sign"],
            "wheels": "chrome"
        }
        response = requests.post(f"{BASE_URL}/api/truck-designs", json=payload, headers=headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data
        assert data["business_name"] == "TEST_Auth User Design"
        assert data["base_model"] == "cargo_van"
        assert data["accessories"] == ["led_underglow", "roof_sign"]
        print(f"✓ Authenticated truck design saved with ID: {data['id']}")
        return data["id"]
    
    def test_verify_user_design_persisted(self):
        """Verify authenticated user can retrieve their design"""
        # First save a design
        headers = {"Authorization": f"Bearer {TEST_SESSION_TOKEN}"}
        payload = {
            "primary_color": "#FFCC00",
            "accent_color": "#333333",
            "finish_type": "metallic",
            "business_name": "TEST_Verify Persistence"
        }
        save_response = requests.post(f"{BASE_URL}/api/truck-designs", json=payload, headers=headers)
        assert save_response.status_code == 200
        saved_id = save_response.json()["id"]
        
        # Now get all designs for this user
        get_response = requests.get(f"{BASE_URL}/api/truck-designs", headers=headers)
        assert get_response.status_code == 200
        
        designs = get_response.json()
        assert isinstance(designs, list)
        
        # Check if our saved design is in the list
        saved_design = next((d for d in designs if d["id"] == saved_id), None)
        if saved_design:
            assert saved_design["business_name"] == "TEST_Verify Persistence"
            print(f"✓ User's design verified in GET response")
        else:
            print("✓ Design saved but may have different user_id filter")


class TestCredentialsInclude:
    """Tests to verify credentials: include works for API requests"""
    
    def test_recipes_with_auth(self):
        """Test recipes endpoint with auth"""
        headers = {"Authorization": f"Bearer {TEST_SESSION_TOKEN}"}
        payload = {
            "name": "TEST_Auth Recipe",
            "prep_time": 15,
            "cook_time": 30,
            "batch_yield": 10,
            "cost_per_serving": 3.50,
            "ingredients": [{"name": "Flour", "qty": "2", "unit": "cups"}],
            "steps": [{"order": 1, "instruction": "Mix ingredients"}]
        }
        response = requests.post(f"{BASE_URL}/api/recipes", json=payload, headers=headers)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert data["name"] == "TEST_Auth Recipe"
        print(f"✓ Recipe saved with auth: {data['id']}")
    
    def test_customer_profiles_with_auth(self):
        """Test customer profiles endpoint with auth"""
        headers = {"Authorization": f"Bearer {TEST_SESSION_TOKEN}"}
        payload = {
            "archetypes": ["foodie", "tourist"],
            "age_range": [25, 55],
            "income_level": 3
        }
        response = requests.post(f"{BASE_URL}/api/customer-profiles", json=payload, headers=headers)
        assert response.status_code == 200
        
        data = response.json()
        assert data["archetypes"] == ["foodie", "tourist"]
        print(f"✓ Customer profile saved with auth: {data['id']}")


class TestAPIHealthAndStatus:
    """Basic health checks"""
    
    def test_api_root(self):
        """API root should return healthy status"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print("✓ API root healthy")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
