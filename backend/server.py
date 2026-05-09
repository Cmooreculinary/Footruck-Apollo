from fastapi import FastAPI, APIRouter, HTTPException, Request, Response
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import json
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import httpx
import stripe


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Food Truck Launch Pad API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# ==================== AUTH MODELS ====================

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    email: str
    name: str
    picture: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserSession(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ==================== AUTH HELPER ====================

async def get_current_user(request: Request) -> Optional[User]:
    """Get current user from session token (cookie or header)"""
    # Try cookie first
    session_token = request.cookies.get("session_token")
    
    # Fallback to Authorization header
    if not session_token:
        auth_header = request.headers.get("Authorization")
        if auth_header and auth_header.startswith("Bearer "):
            session_token = auth_header[7:]
    
    if not session_token:
        return None
    
    # Find session
    session_doc = await db.user_sessions.find_one(
        {"session_token": session_token},
        {"_id": 0}
    )
    
    if not session_doc:
        return None
    
    # Check expiry
    expires_at = session_doc["expires_at"]
    if isinstance(expires_at, str):
        expires_at = datetime.fromisoformat(expires_at)
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)
    if expires_at < datetime.now(timezone.utc):
        return None
    
    # Get user
    user_doc = await db.users.find_one(
        {"user_id": session_doc["user_id"]},
        {"_id": 0}
    )
    
    if not user_doc:
        return None
    
    return User(**user_doc)


# ==================== STRIPE SUBSCRIPTION MODELS ====================

# Subscription plans - NEVER accept prices from frontend
SUBSCRIPTION_PLANS = {
    "standard": {
        "name": "Standard",
        "first_month_price": 10.00,
        "regular_price": 14.00,
        "stripe_price_id": os.environ.get("FOODTRUCK_STANDARD_PRICE_ID", "price_1TEEq1HAM0vSVVVHrdIhHNWE"),
        "features": ["All 14 Launch Pad modules", "Equipment Showroom", "Recipe Builder with PDF export"]
    },
    "pro": {
        "name": "Pro", 
        "first_month_price": 15.00,
        "regular_price": 20.00,
        "stripe_price_id": os.environ.get("FOODTRUCK_PRO_PRICE_ID", "price_1TEErmHAM0vSVVVHp1OvOsGx"),
        "features": ["Everything in Standard", "Kitchen Builder Pro", "Paint Shop premium wraps", "Priority support"]
    }
}

class SubscriptionRequest(BaseModel):
    plan_id: str
    origin_url: str

class PaymentTransaction(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: Optional[str] = None
    email: Optional[str] = None
    plan_id: str
    amount: float
    currency: str = "usd"
    session_id: str
    payment_status: str = "pending"
    metadata: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserSubscription(BaseModel):
    model_config = ConfigDict(extra="ignore")
    user_id: str
    email: str
    plan_id: str
    status: str = "trial"  # trial, active, cancelled, expired
    trial_started_at: Optional[datetime] = None
    trial_ends_at: Optional[datetime] = None
    subscription_started_at: Optional[datetime] = None
    current_period_end: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ==================== OTHER MODELS ====================

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str


class TruckDesign(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    primary_color: str
    accent_color: str
    finish_type: str
    texture_type: Optional[str] = None  # Legacy field
    business_name: str
    # Truck model & paint
    base_model: Optional[str] = None
    split_pattern: Optional[str] = None
    wrap_id: Optional[str] = None
    wrap_opacity: Optional[float] = None
    # Lettering
    lettering_font: Optional[str] = None
    lettering_color: Optional[str] = None
    lettering_size: Optional[int] = None
    lettering_x: Optional[float] = None
    lettering_y: Optional[float] = None
    lettering_outline: Optional[str] = None
    letter_spacing: Optional[str] = None
    # Accessories
    awning: Optional[str] = None
    awning_color: Optional[str] = None
    lights_color: Optional[str] = None
    signage_illuminated: Optional[bool] = None
    racing_stripe_color: Optional[str] = None
    racing_stripe_width: Optional[str] = None
    accessories: Optional[List[str]] = None
    # Logo
    logo_url: Optional[str] = None
    logo_x: Optional[float] = None
    logo_y: Optional[float] = None
    logo_scale: Optional[float] = None
    logo_rotation: Optional[float] = None
    # Legacy
    serving_window: Optional[str] = None
    wheels: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TruckDesignCreate(BaseModel):
    primary_color: str
    accent_color: str
    finish_type: str
    texture_type: Optional[str] = None
    business_name: str
    base_model: Optional[str] = None
    split_pattern: Optional[str] = None
    wrap_id: Optional[str] = None
    wrap_opacity: Optional[float] = None
    lettering_font: Optional[str] = None
    lettering_color: Optional[str] = None
    lettering_size: Optional[int] = None
    lettering_x: Optional[float] = None
    lettering_y: Optional[float] = None
    lettering_outline: Optional[str] = None
    letter_spacing: Optional[str] = None
    awning: Optional[str] = None
    awning_color: Optional[str] = None
    lights_color: Optional[str] = None
    signage_illuminated: Optional[bool] = None
    racing_stripe_color: Optional[str] = None
    racing_stripe_width: Optional[str] = None
    accessories: Optional[List[str]] = None
    logo_url: Optional[str] = None
    logo_x: Optional[float] = None
    logo_y: Optional[float] = None
    logo_scale: Optional[float] = None
    logo_rotation: Optional[float] = None
    serving_window: Optional[str] = None
    wheels: Optional[str] = None


class Recipe(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    prep_time: int  # minutes
    cook_time: int  # minutes
    batch_yield: int
    cost_per_serving: float
    ingredients: List[Dict[str, Any]]
    steps: List[Dict[str, Any]]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RecipeCreate(BaseModel):
    name: str
    prep_time: int
    cook_time: int
    batch_yield: int
    cost_per_serving: float
    ingredients: List[Dict[str, Any]]
    steps: List[Dict[str, Any]]


class CustomerProfile(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    archetypes: List[str]
    age_range: List[int]
    income_level: int
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class CustomerProfileCreate(BaseModel):
    archetypes: List[str]
    age_range: List[int]
    income_level: int


class SignatureDish(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    narrative: str
    primary_component: str
    x_factor: str
    flavor_profiles: List[str]
    status: str = "draft"  # draft, published
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SignatureDishCreate(BaseModel):
    name: Optional[str] = ""
    narrative: str
    primary_component: str
    x_factor: str
    flavor_profiles: List[str]
    status: str = "draft"


class Assessment(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    progress: int = 0
    answers: Dict[str, Any] = {}
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class AssessmentCreate(BaseModel):
    progress: int
    answers: Dict[str, Any] = {}


class BreakEvenScenario(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    fixed_expenses: float
    avg_menu_price: float
    avg_cost_per_plate: float
    operating_days: int
    avg_customers_per_day: int
    break_even_units: int
    projected_sales: int
    net_profit: float
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BreakEvenScenarioCreate(BaseModel):
    name: str = "Untitled Scenario"
    fixed_expenses: float
    avg_menu_price: float
    avg_cost_per_plate: float
    operating_days: int
    avg_customers_per_day: int
    break_even_units: int
    projected_sales: int
    net_profit: float


class Permit(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str  # federal, health, city, county
    status: str  # pending, in_progress, complete
    due_date: Optional[str] = None
    notes: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PermitCreate(BaseModel):
    name: str
    category: str
    status: str = "pending"
    due_date: Optional[str] = None
    notes: str = ""


class ScaledBatch(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    recipe_name: str
    target_servings: int
    total_batch_cost: float
    cost_per_unit: float
    prep_time_hours: float
    ingredients: List[Dict[str, Any]]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ScaledBatchCreate(BaseModel):
    recipe_name: str
    target_servings: int
    total_batch_cost: float
    cost_per_unit: float
    prep_time_hours: float
    ingredients: List[Dict[str, Any]]


class PayrollPlan(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    location: str
    projected_labor_cost: float
    total_weekly_labor: float
    crew_schedule: List[Dict[str, Any]]
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PayrollPlanCreate(BaseModel):
    location: str
    projected_labor_cost: float
    total_weekly_labor: float
    crew_schedule: List[Dict[str, Any]]


class TrainingProgress(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    module_id: int
    module_title: str
    completed: bool = False
    completed_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TrainingProgressCreate(BaseModel):
    module_id: int
    module_title: str
    completed: bool = False


class SimulationProgress(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    scenario_id: int
    selected_answer: str
    is_correct: bool
    progress_percent: int
    revenue: float = 0
    satisfaction: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SimulationProgressCreate(BaseModel):
    scenario_id: int
    selected_answer: str
    is_correct: bool
    progress_percent: int
    revenue: float = 0
    satisfaction: int = 0


# ==================== HELPER FUNCTIONS ====================

def serialize_doc(doc):
    """Convert datetime to ISO string for MongoDB storage"""
    if isinstance(doc.get('created_at'), datetime):
        doc['created_at'] = doc['created_at'].isoformat()
    if isinstance(doc.get('updated_at'), datetime):
        doc['updated_at'] = doc['updated_at'].isoformat()
    if isinstance(doc.get('timestamp'), datetime):
        doc['timestamp'] = doc['timestamp'].isoformat()
    return doc

def deserialize_doc(doc):
    """Convert ISO string back to datetime"""
    for field in ['created_at', 'updated_at', 'timestamp']:
        if isinstance(doc.get(field), str):
            doc[field] = datetime.fromisoformat(doc[field])
    return doc


# ==================== ROUTES ====================

@api_router.get("/")
async def root():
    return {"message": "Food Truck Launch Pad API v1.0", "status": "healthy"}


# ==================== AUTH ROUTES ====================

@api_router.post("/auth/session")
async def exchange_session(request: Request, response: Response):
    """Exchange session_id from OAuth callback for session_token"""
    body = await request.json()
    session_id = body.get("session_id")
    
    if not session_id:
        raise HTTPException(status_code=400, detail="session_id required")
    
    # Call Emergent Auth to get user data
    async with httpx.AsyncClient() as client:
        try:
            auth_response = await client.get(
                "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
                headers={"X-Session-ID": session_id},
                timeout=10.0
            )
            if auth_response.status_code != 200:
                raise HTTPException(status_code=401, detail="Invalid session_id")
            
            user_data = auth_response.json()
        except Exception as e:
            logging.error(f"Auth error: {e}")
            raise HTTPException(status_code=500, detail="Authentication service error")
    
    # Check if user exists
    existing_user = await db.users.find_one(
        {"email": user_data["email"]},
        {"_id": 0}
    )
    
    if existing_user:
        user_id = existing_user["user_id"]
        # Update user info
        await db.users.update_one(
            {"user_id": user_id},
            {"$set": {
                "name": user_data["name"],
                "picture": user_data.get("picture"),
            }}
        )
    else:
        # Create new user
        user_id = f"user_{uuid.uuid4().hex[:12]}"
        await db.users.insert_one({
            "user_id": user_id,
            "email": user_data["email"],
            "name": user_data["name"],
            "picture": user_data.get("picture"),
            "created_at": datetime.now(timezone.utc).isoformat()
        })
    
    # Create session
    session_token = user_data.get("session_token") or f"sess_{uuid.uuid4().hex}"
    expires_at = datetime.now(timezone.utc) + timedelta(days=7)
    
    await db.user_sessions.insert_one({
        "user_id": user_id,
        "session_token": session_token,
        "expires_at": expires_at.isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    
    # Set httpOnly cookie
    response.set_cookie(
        key="session_token",
        value=session_token,
        httponly=True,
        secure=True,
        samesite="none",
        path="/",
        max_age=7 * 24 * 60 * 60  # 7 days
    )
    
    # Get full user data
    user_doc = await db.users.find_one({"user_id": user_id}, {"_id": 0})
    
    return {"user": user_doc, "session_token": session_token}


@api_router.get("/auth/me")
async def get_current_user_endpoint(request: Request):
    """Get current authenticated user"""
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return user.model_dump()


@api_router.post("/auth/logout")
async def logout(request: Request, response: Response):
    """Logout user and clear session"""
    session_token = request.cookies.get("session_token")
    
    if session_token:
        await db.user_sessions.delete_one({"session_token": session_token})
    
    response.delete_cookie(
        key="session_token",
        path="/",
        secure=True,
        samesite="none"
    )
    
    return {"message": "Logged out successfully"}


# ==================== SUBSCRIPTION ENDPOINTS ====================

@api_router.get("/subscription/plans")
async def get_subscription_plans():
    """Get available subscription plans"""
    return {"plans": SUBSCRIPTION_PLANS}


@api_router.post("/subscription/start-trial")
async def start_trial(request: Request):
    """Start a 24-hour free trial"""
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Login required to start trial")
    
    body = await request.json()
    plan_id = body.get("plan_id")
    
    if plan_id not in SUBSCRIPTION_PLANS:
        raise HTTPException(status_code=400, detail="Invalid plan")
    
    # Check if user already has a subscription or trial
    existing = await db.subscriptions.find_one({"user_id": user.user_id}, {"_id": 0})
    if existing:
        return {
            "message": "Trial already started or subscription exists",
            "subscription": existing
        }
    
    # Create trial subscription
    now = datetime.now(timezone.utc)
    trial_ends = now + timedelta(hours=24)
    
    subscription = {
        "user_id": user.user_id,
        "email": user.email,
        "plan_id": plan_id,
        "status": "trial",
        "trial_started_at": now.isoformat(),
        "trial_ends_at": trial_ends.isoformat(),
        "created_at": now.isoformat(),
        "updated_at": now.isoformat()
    }
    
    await db.subscriptions.insert_one(subscription)
    subscription.pop("_id", None)
    
    return {
        "message": f"24-hour trial started for {SUBSCRIPTION_PLANS[plan_id]['name']} plan",
        "subscription": subscription
    }


@api_router.get("/subscription/status")
async def get_subscription_status(request: Request):
    """Get user's current subscription status"""
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    subscription = await db.subscriptions.find_one(
        {"user_id": user.user_id},
        {"_id": 0}
    )
    
    if not subscription:
        return {"status": "none", "subscription": None}
    
    # Check if trial has expired
    if subscription.get("status") == "trial" and subscription.get("trial_ends_at"):
        trial_ends = subscription["trial_ends_at"]
        if isinstance(trial_ends, str):
            trial_ends = datetime.fromisoformat(trial_ends)
        if trial_ends.tzinfo is None:
            trial_ends = trial_ends.replace(tzinfo=timezone.utc)
        if trial_ends < datetime.now(timezone.utc):
            subscription["status"] = "trial_expired"
            await db.subscriptions.update_one(
                {"user_id": user.user_id},
                {"$set": {"status": "trial_expired", "updated_at": datetime.now(timezone.utc).isoformat()}}
            )
    
    return {"status": subscription.get("status"), "subscription": subscription}


@api_router.post("/subscription/checkout")
async def create_checkout_session(request: Request):
    """Create Stripe checkout session for subscription"""
    
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Login required")
    
    body = await request.json()
    plan_id = body.get("plan_id")
    origin_url = body.get("origin_url")
    
    if plan_id not in SUBSCRIPTION_PLANS:
        raise HTTPException(status_code=400, detail="Invalid plan")
    
    if not origin_url:
        raise HTTPException(status_code=400, detail="Origin URL required")
    
    plan = SUBSCRIPTION_PLANS[plan_id]
    price_id = plan.get("stripe_price_id")
    
    if not price_id:
        raise HTTPException(status_code=500, detail="Price ID not configured for this plan")
    
    # Initialize Stripe
    api_key = os.environ.get("STRIPE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    
    stripe.api_key = api_key
    
    # Create checkout session with subscription mode
    success_url = f"{origin_url}/pricing?session_id={{CHECKOUT_SESSION_ID}}&success=true"
    cancel_url = f"{origin_url}/pricing?cancelled=true"
    
    try:
        session = stripe.checkout.Session.create(
            mode="subscription",
            payment_method_types=["card"],
            line_items=[{
                "price": price_id,
                "quantity": 1
            }],
            success_url=success_url,
            cancel_url=cancel_url,
            customer_email=user.email,
            metadata={
                "user_id": user.user_id,
                "email": user.email,
                "plan_id": plan_id
            },
            subscription_data={
                "metadata": {
                    "user_id": user.user_id,
                    "plan_id": plan_id
                }
            }
        )
        
        # Create payment transaction record
        transaction = {
            "id": str(uuid.uuid4()),
            "user_id": user.user_id,
            "email": user.email,
            "plan_id": plan_id,
            "amount": plan["regular_price"],
            "currency": "usd",
            "session_id": session.id,
            "payment_status": "pending",
            "metadata": {"price_id": price_id},
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.payment_transactions.insert_one(transaction)
        
        return {"url": session.url, "session_id": session.id}
        
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))


@api_router.get("/subscription/checkout/status/{session_id}")
async def get_checkout_status(session_id: str, request: Request):
    """Check payment status and update subscription"""
    from emergentintegrations.payments.stripe.checkout import StripeCheckout
    
    api_key = os.environ.get("STRIPE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Stripe not configured")
    
    host_url = str(request.base_url).rstrip("/")
    webhook_url = f"{host_url}/api/webhook/stripe"
    stripe_checkout = StripeCheckout(api_key=api_key, webhook_url=webhook_url)
    
    try:
        status = await stripe_checkout.get_checkout_status(session_id)
        
        # Find the transaction
        transaction = await db.payment_transactions.find_one(
            {"session_id": session_id},
            {"_id": 0}
        )
        
        if transaction and transaction.get("payment_status") != status.payment_status:
            # Update transaction
            await db.payment_transactions.update_one(
                {"session_id": session_id},
                {"$set": {
                    "payment_status": status.payment_status,
                    "updated_at": datetime.now(timezone.utc).isoformat()
                }}
            )
            
            # If payment successful, activate subscription
            if status.payment_status == "paid" and transaction.get("user_id"):
                now = datetime.now(timezone.utc)
                period_end = now + timedelta(days=30)
                
                await db.subscriptions.update_one(
                    {"user_id": transaction["user_id"]},
                    {"$set": {
                        "status": "active",
                        "subscription_started_at": now.isoformat(),
                        "current_period_end": period_end.isoformat(),
                        "updated_at": now.isoformat()
                    }},
                    upsert=True
                )
        
        return {
            "status": status.status,
            "payment_status": status.payment_status,
            "amount_total": status.amount_total,
            "currency": status.currency
        }
    except Exception as e:
        logging.error(f"Checkout status error: {e}")
        raise HTTPException(status_code=400, detail=str(e))


async def _handle_checkout_completed(data: dict):
    """Process checkout.session.completed event"""
    session_id = data.get("id")
    subscription_id = data.get("subscription")
    metadata = data.get("metadata", {})

    await db.payment_transactions.update_one(
        {"session_id": session_id},
        {"$set": {
            "payment_status": "paid",
            "stripe_subscription_id": subscription_id,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )

    user_id = metadata.get("user_id")
    plan_id = metadata.get("plan_id", "standard")
    if user_id:
        now = datetime.now(timezone.utc)
        period_end = now + timedelta(days=30)
        await db.subscriptions.update_one(
            {"user_id": user_id},
            {"$set": {
                "status": "active",
                "plan_id": plan_id,
                "stripe_subscription_id": subscription_id,
                "subscription_started_at": now.isoformat(),
                "current_period_end": period_end.isoformat(),
                "updated_at": now.isoformat()
            }},
            upsert=True
        )
        logging.info(f"Subscription activated for user {user_id}")


async def _handle_subscription_updated(data: dict):
    """Process customer.subscription.updated event"""
    subscription_id = data.get("id")
    status = data.get("status")
    current_period_end = data.get("current_period_end")

    if not subscription_id:
        return
    update_data = {
        "status": status,
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    if current_period_end:
        update_data["current_period_end"] = datetime.fromtimestamp(current_period_end, timezone.utc).isoformat()
    await db.subscriptions.update_one(
        {"stripe_subscription_id": subscription_id},
        {"$set": update_data}
    )


async def _handle_subscription_cancelled(data: dict):
    """Process subscription deleted/canceled event"""
    subscription_id = data.get("id")
    if subscription_id:
        await db.subscriptions.update_one(
            {"stripe_subscription_id": subscription_id},
            {"$set": {"status": "cancelled", "updated_at": datetime.now(timezone.utc).isoformat()}}
        )


async def _handle_subscription_status_change(data: dict, new_status: str):
    """Process invoice payment success/failure"""
    subscription_id = data.get("subscription")
    if subscription_id:
        await db.subscriptions.update_one(
            {"stripe_subscription_id": subscription_id},
            {"$set": {"status": new_status, "updated_at": datetime.now(timezone.utc).isoformat()}}
        )


_WEBHOOK_HANDLERS = {
    "checkout.session.completed": _handle_checkout_completed,
    "customer.subscription.updated": _handle_subscription_updated,
    "customer.subscription.deleted": _handle_subscription_cancelled,
    "customer.subscription.canceled": _handle_subscription_cancelled,
}


@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhooks for subscriptions"""
    
    api_key = os.environ.get("STRIPE_API_KEY")
    if not api_key:
        return {"status": "error", "message": "Stripe not configured"}
    
    stripe.api_key = api_key
    
    try:
        body = await request.body()
        payload = json.loads(body)
        event_type = payload.get("type", "")
        data = payload.get("data", {}).get("object", {})
        
        logging.info(f"Stripe webhook received: {event_type}")
        
        handler = _WEBHOOK_HANDLERS.get(event_type)
        if handler:
            await handler(data)
        elif event_type == "invoice.payment_succeeded":
            await _handle_subscription_status_change(data, "active")
        elif event_type == "invoice.payment_failed":
            await _handle_subscription_status_change(data, "past_due")
        
        return {"status": "success", "event": event_type}
    except Exception as e:
        logging.error(f"Webhook error: {e}")
        return {"status": "error", "message": str(e)}


@api_router.post("/subscription/cancel")
async def cancel_subscription(request: Request):
    """Cancel user's subscription"""
    user = await get_current_user(request)
    if not user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    result = await db.subscriptions.update_one(
        {"user_id": user.user_id},
        {"$set": {
            "status": "cancelled",
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="No subscription found")
    
    return {"message": "Subscription cancelled", "status": "cancelled"}


# Status endpoints
@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = serialize_doc(status_obj.model_dump())
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    return [deserialize_doc(check) for check in status_checks]


# Truck Design endpoints
@api_router.post("/truck-designs", response_model=TruckDesign)
async def create_truck_design(input: TruckDesignCreate, request: Request):
    design_obj = TruckDesign(**input.model_dump())
    doc = serialize_doc(design_obj.model_dump())
    
    # Associate with user if authenticated
    user = await get_current_user(request)
    if user:
        doc["user_id"] = user.user_id
        # Upsert: update existing design for this user, or insert new
        await db.truck_designs.update_one(
            {"user_id": user.user_id},
            {"$set": doc},
            upsert=True
        )
    else:
        await db.truck_designs.insert_one(doc)
    
    return design_obj

@api_router.get("/truck-designs", response_model=List[TruckDesign])
async def get_truck_designs(request: Request):
    # If authenticated, get user's designs; otherwise get all
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    designs = await db.truck_designs.find(query, {"_id": 0}).to_list(100)
    return [deserialize_doc(d) for d in designs]

@api_router.get("/truck-designs/latest", response_model=Optional[TruckDesign])
async def get_latest_truck_design(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    design = await db.truck_designs.find_one(query, {"_id": 0}, sort=[("created_at", -1)])
    return deserialize_doc(design) if design else None


# Recipe endpoints
@api_router.post("/recipes", response_model=Recipe)
async def create_recipe(input: RecipeCreate, request: Request):
    recipe_obj = Recipe(**input.model_dump())
    doc = serialize_doc(recipe_obj.model_dump())
    user = await get_current_user(request)
    if user:
        doc["user_id"] = user.user_id
    await db.recipes.insert_one(doc)
    return recipe_obj

@api_router.get("/recipes", response_model=List[Recipe])
async def get_recipes(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    recipes = await db.recipes.find(query, {"_id": 0}).to_list(100)
    return [deserialize_doc(r) for r in recipes]


# Customer Profile endpoints
@api_router.post("/customer-profiles", response_model=CustomerProfile)
async def create_customer_profile(input: CustomerProfileCreate, request: Request):
    profile_obj = CustomerProfile(**input.model_dump())
    doc = serialize_doc(profile_obj.model_dump())
    user = await get_current_user(request)
    if user:
        doc["user_id"] = user.user_id
    await db.customer_profiles.insert_one(doc)
    return profile_obj

@api_router.get("/customer-profiles", response_model=List[CustomerProfile])
async def get_customer_profiles(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    profiles = await db.customer_profiles.find(query, {"_id": 0}).to_list(100)
    return [deserialize_doc(p) for p in profiles]

@api_router.get("/customer-profiles/latest", response_model=Optional[CustomerProfile])
async def get_latest_customer_profile(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    profile = await db.customer_profiles.find_one(query, {"_id": 0}, sort=[("created_at", -1)])
    return deserialize_doc(profile) if profile else None


# Signature Dish endpoints
@api_router.post("/dishes", response_model=SignatureDish)
async def create_dish(input: SignatureDishCreate, request: Request):
    dish_obj = SignatureDish(**input.model_dump())
    doc = serialize_doc(dish_obj.model_dump())
    user = await get_current_user(request)
    if user:
        doc["user_id"] = user.user_id
    await db.dishes.insert_one(doc)
    return dish_obj

@api_router.get("/dishes", response_model=List[SignatureDish])
async def get_dishes(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    dishes = await db.dishes.find(query, {"_id": 0}).to_list(100)
    return [deserialize_doc(d) for d in dishes]

@api_router.get("/dishes/latest", response_model=Optional[SignatureDish])
async def get_latest_dish(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    dish = await db.dishes.find_one(query, {"_id": 0}, sort=[("created_at", -1)])
    return deserialize_doc(dish) if dish else None


# Assessment endpoints
@api_router.post("/assessments", response_model=Assessment)
async def create_assessment(input: AssessmentCreate, request: Request):
    assessment_obj = Assessment(**input.model_dump())
    doc = serialize_doc(assessment_obj.model_dump())
    user = await get_current_user(request)
    if user:
        doc["user_id"] = user.user_id
    await db.assessments.insert_one(doc)
    return assessment_obj

@api_router.get("/assessments", response_model=List[Assessment])
async def get_assessments(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    assessments = await db.assessments.find(query, {"_id": 0}).to_list(100)
    return [deserialize_doc(a) for a in assessments]


# Break-Even endpoints
@api_router.post("/break-even", response_model=BreakEvenScenario)
async def create_break_even_scenario(input: BreakEvenScenarioCreate, request: Request):
    scenario_obj = BreakEvenScenario(**input.model_dump())
    doc = serialize_doc(scenario_obj.model_dump())
    user = await get_current_user(request)
    if user:
        doc["user_id"] = user.user_id
    await db.break_even_scenarios.insert_one(doc)
    return scenario_obj

@api_router.get("/break-even", response_model=List[BreakEvenScenario])
async def get_break_even_scenarios(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    scenarios = await db.break_even_scenarios.find(query, {"_id": 0}).to_list(100)
    return [deserialize_doc(s) for s in scenarios]

@api_router.get("/break-even/latest", response_model=Optional[BreakEvenScenario])
async def get_latest_break_even(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    scenario = await db.break_even_scenarios.find_one(query, {"_id": 0}, sort=[("created_at", -1)])
    return deserialize_doc(scenario) if scenario else None


# Permit endpoints
@api_router.post("/permits", response_model=Permit)
async def create_permit(input: PermitCreate, request: Request):
    permit_obj = Permit(**input.model_dump())
    doc = serialize_doc(permit_obj.model_dump())
    user = await get_current_user(request)
    if user:
        doc["user_id"] = user.user_id
    await db.permits.insert_one(doc)
    return permit_obj

@api_router.get("/permits", response_model=List[Permit])
async def get_permits(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    permits = await db.permits.find(query, {"_id": 0}).to_list(100)
    return [deserialize_doc(p) for p in permits]

@api_router.patch("/permits/{permit_id}")
async def update_permit(permit_id: str, status: str, request: Request):
    user = await get_current_user(request)
    query = {"id": permit_id}
    if user:
        query["user_id"] = user.user_id
    result = await db.permits.update_one(
        query,
        {"$set": {"status": status, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Permit not found")
    return {"message": "Permit updated"}


# Scaled Batch endpoints
@api_router.post("/scaled-batches", response_model=ScaledBatch)
async def create_scaled_batch(input: ScaledBatchCreate, request: Request):
    batch_obj = ScaledBatch(**input.model_dump())
    doc = serialize_doc(batch_obj.model_dump())
    user = await get_current_user(request)
    if user:
        doc["user_id"] = user.user_id
    await db.scaled_batches.insert_one(doc)
    return batch_obj

@api_router.get("/scaled-batches", response_model=List[ScaledBatch])
async def get_scaled_batches(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    batches = await db.scaled_batches.find(query, {"_id": 0}).to_list(100)
    return [deserialize_doc(b) for b in batches]

@api_router.get("/scaled-batches/latest", response_model=Optional[ScaledBatch])
async def get_latest_scaled_batch(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    batch = await db.scaled_batches.find_one(query, {"_id": 0}, sort=[("created_at", -1)])
    return deserialize_doc(batch) if batch else None


# Payroll Plan endpoints
@api_router.post("/payroll-plans", response_model=PayrollPlan)
async def create_payroll_plan(input: PayrollPlanCreate, request: Request):
    plan_obj = PayrollPlan(**input.model_dump())
    doc = serialize_doc(plan_obj.model_dump())
    user = await get_current_user(request)
    if user:
        doc["user_id"] = user.user_id
    await db.payroll_plans.insert_one(doc)
    return plan_obj

@api_router.get("/payroll-plans", response_model=List[PayrollPlan])
async def get_payroll_plans(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    plans = await db.payroll_plans.find(query, {"_id": 0}).to_list(100)
    return [deserialize_doc(p) for p in plans]

@api_router.get("/payroll-plans/latest", response_model=Optional[PayrollPlan])
async def get_latest_payroll_plan(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    plan = await db.payroll_plans.find_one(query, {"_id": 0}, sort=[("created_at", -1)])
    return deserialize_doc(plan) if plan else None


# Training Progress endpoints
@api_router.post("/training-progress", response_model=TrainingProgress)
async def create_training_progress(input: TrainingProgressCreate, request: Request):
    progress_obj = TrainingProgress(**input.model_dump())
    if input.completed:
        progress_obj.completed_at = datetime.now(timezone.utc)
    doc = serialize_doc(progress_obj.model_dump())
    user = await get_current_user(request)
    if user:
        doc["user_id"] = user.user_id
    await db.training_progress.insert_one(doc)
    return progress_obj

@api_router.get("/training-progress", response_model=List[TrainingProgress])
async def get_training_progress(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    progress = await db.training_progress.find(query, {"_id": 0}).to_list(100)
    return [deserialize_doc(p) for p in progress]


# Simulation Progress endpoints
@api_router.post("/simulation-progress", response_model=SimulationProgress)
async def create_simulation_progress(input: SimulationProgressCreate, request: Request):
    sim_obj = SimulationProgress(**input.model_dump())
    doc = serialize_doc(sim_obj.model_dump())
    user = await get_current_user(request)
    if user:
        doc["user_id"] = user.user_id
    await db.simulation_progress.insert_one(doc)
    return sim_obj

@api_router.get("/simulation-progress", response_model=List[SimulationProgress])
async def get_simulation_progress(request: Request):
    user = await get_current_user(request)
    query = {"user_id": user.user_id} if user else {}
    progress = await db.simulation_progress.find(query, {"_id": 0}).to_list(100)
    return [deserialize_doc(p) for p in progress]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
