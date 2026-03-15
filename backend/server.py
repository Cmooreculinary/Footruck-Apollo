from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone


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


# ==================== MODELS ====================

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
    texture_type: str
    business_name: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class TruckDesignCreate(BaseModel):
    primary_color: str
    accent_color: str
    finish_type: str
    texture_type: str
    business_name: str


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
async def create_truck_design(input: TruckDesignCreate):
    design_obj = TruckDesign(**input.model_dump())
    doc = serialize_doc(design_obj.model_dump())
    await db.truck_designs.insert_one(doc)
    return design_obj

@api_router.get("/truck-designs", response_model=List[TruckDesign])
async def get_truck_designs():
    designs = await db.truck_designs.find({}, {"_id": 0}).to_list(100)
    return [deserialize_doc(d) for d in designs]

@api_router.get("/truck-designs/latest", response_model=Optional[TruckDesign])
async def get_latest_truck_design():
    design = await db.truck_designs.find_one({}, {"_id": 0}, sort=[("created_at", -1)])
    return deserialize_doc(design) if design else None


# Recipe endpoints
@api_router.post("/recipes", response_model=Recipe)
async def create_recipe(input: RecipeCreate):
    recipe_obj = Recipe(**input.model_dump())
    doc = serialize_doc(recipe_obj.model_dump())
    await db.recipes.insert_one(doc)
    return recipe_obj

@api_router.get("/recipes", response_model=List[Recipe])
async def get_recipes():
    recipes = await db.recipes.find({}, {"_id": 0}).to_list(100)
    return [deserialize_doc(r) for r in recipes]


# Customer Profile endpoints
@api_router.post("/customer-profiles", response_model=CustomerProfile)
async def create_customer_profile(input: CustomerProfileCreate):
    profile_obj = CustomerProfile(**input.model_dump())
    doc = serialize_doc(profile_obj.model_dump())
    await db.customer_profiles.insert_one(doc)
    return profile_obj

@api_router.get("/customer-profiles", response_model=List[CustomerProfile])
async def get_customer_profiles():
    profiles = await db.customer_profiles.find({}, {"_id": 0}).to_list(100)
    return [deserialize_doc(p) for p in profiles]


# Signature Dish endpoints
@api_router.post("/dishes", response_model=SignatureDish)
async def create_dish(input: SignatureDishCreate):
    dish_obj = SignatureDish(**input.model_dump())
    doc = serialize_doc(dish_obj.model_dump())
    await db.dishes.insert_one(doc)
    return dish_obj

@api_router.get("/dishes", response_model=List[SignatureDish])
async def get_dishes():
    dishes = await db.dishes.find({}, {"_id": 0}).to_list(100)
    return [deserialize_doc(d) for d in dishes]


# Assessment endpoints
@api_router.post("/assessments", response_model=Assessment)
async def create_assessment(input: AssessmentCreate):
    assessment_obj = Assessment(**input.model_dump())
    doc = serialize_doc(assessment_obj.model_dump())
    await db.assessments.insert_one(doc)
    return assessment_obj

@api_router.get("/assessments", response_model=List[Assessment])
async def get_assessments():
    assessments = await db.assessments.find({}, {"_id": 0}).to_list(100)
    return [deserialize_doc(a) for a in assessments]


# Break-Even endpoints
@api_router.post("/break-even", response_model=BreakEvenScenario)
async def create_break_even_scenario(input: BreakEvenScenarioCreate):
    scenario_obj = BreakEvenScenario(**input.model_dump())
    doc = serialize_doc(scenario_obj.model_dump())
    await db.break_even_scenarios.insert_one(doc)
    return scenario_obj

@api_router.get("/break-even", response_model=List[BreakEvenScenario])
async def get_break_even_scenarios():
    scenarios = await db.break_even_scenarios.find({}, {"_id": 0}).to_list(100)
    return [deserialize_doc(s) for s in scenarios]


# Permit endpoints
@api_router.post("/permits", response_model=Permit)
async def create_permit(input: PermitCreate):
    permit_obj = Permit(**input.model_dump())
    doc = serialize_doc(permit_obj.model_dump())
    await db.permits.insert_one(doc)
    return permit_obj

@api_router.get("/permits", response_model=List[Permit])
async def get_permits():
    permits = await db.permits.find({}, {"_id": 0}).to_list(100)
    return [deserialize_doc(p) for p in permits]

@api_router.patch("/permits/{permit_id}")
async def update_permit(permit_id: str, status: str):
    result = await db.permits.update_one(
        {"id": permit_id},
        {"$set": {"status": status, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Permit not found")
    return {"message": "Permit updated"}


# Scaled Batch endpoints
@api_router.post("/scaled-batches", response_model=ScaledBatch)
async def create_scaled_batch(input: ScaledBatchCreate):
    batch_obj = ScaledBatch(**input.model_dump())
    doc = serialize_doc(batch_obj.model_dump())
    await db.scaled_batches.insert_one(doc)
    return batch_obj

@api_router.get("/scaled-batches", response_model=List[ScaledBatch])
async def get_scaled_batches():
    batches = await db.scaled_batches.find({}, {"_id": 0}).to_list(100)
    return [deserialize_doc(b) for b in batches]


# Payroll Plan endpoints
@api_router.post("/payroll-plans", response_model=PayrollPlan)
async def create_payroll_plan(input: PayrollPlanCreate):
    plan_obj = PayrollPlan(**input.model_dump())
    doc = serialize_doc(plan_obj.model_dump())
    await db.payroll_plans.insert_one(doc)
    return plan_obj

@api_router.get("/payroll-plans", response_model=List[PayrollPlan])
async def get_payroll_plans():
    plans = await db.payroll_plans.find({}, {"_id": 0}).to_list(100)
    return [deserialize_doc(p) for p in plans]


# Training Progress endpoints
@api_router.post("/training-progress", response_model=TrainingProgress)
async def create_training_progress(input: TrainingProgressCreate):
    progress_obj = TrainingProgress(**input.model_dump())
    if input.completed:
        progress_obj.completed_at = datetime.now(timezone.utc)
    doc = serialize_doc(progress_obj.model_dump())
    await db.training_progress.insert_one(doc)
    return progress_obj

@api_router.get("/training-progress", response_model=List[TrainingProgress])
async def get_training_progress():
    progress = await db.training_progress.find({}, {"_id": 0}).to_list(100)
    return [deserialize_doc(p) for p in progress]


# Simulation Progress endpoints
@api_router.post("/simulation-progress", response_model=SimulationProgress)
async def create_simulation_progress(input: SimulationProgressCreate):
    sim_obj = SimulationProgress(**input.model_dump())
    doc = serialize_doc(sim_obj.model_dump())
    await db.simulation_progress.insert_one(doc)
    return sim_obj

@api_router.get("/simulation-progress", response_model=List[SimulationProgress])
async def get_simulation_progress():
    progress = await db.simulation_progress.find({}, {"_id": 0}).to_list(100)
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
