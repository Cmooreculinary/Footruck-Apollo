"""
Backend API tests for Food Truck Launch Pad persistence endpoints.
Tests cover all new CRUD operations for:
- Customer Profiles
- Assessments  
- Scaled Batches
- Payroll Plans
- Training Progress
- Simulation Progress
- Permits
"""

import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://design-studio-614.preview.emergentagent.com')

pytestmark = pytest.mark.skipif(
    os.environ.get("RUN_REMOTE_API_TESTS") != "1",
    reason="Remote API integration tests are opt-in; set RUN_REMOTE_API_TESTS=1 to run them.",
)


class TestHealthCheck:
    """Basic API health check"""
    
    def test_api_root(self):
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "Food Truck Launch Pad API" in data["message"]
        print("✓ API root endpoint healthy")


class TestCustomerProfiles:
    """Customer Profile CRUD tests - Target Customer Profiling page"""
    
    def test_create_customer_profile(self):
        """Test Save Profile button saves archetypes, age range, and income level"""
        payload = {
            "archetypes": ["corporate", "student"],
            "age_range": [24, 45],
            "income_level": 2
        }
        response = requests.post(f"{BASE_URL}/api/customer-profiles", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data, "Response should contain ID"
        assert data["archetypes"] == payload["archetypes"]
        assert data["age_range"] == payload["age_range"]
        assert data["income_level"] == payload["income_level"]
        print(f"✓ Customer profile created with ID: {data['id']}")
    
    def test_get_customer_profiles(self):
        """Verify customer profiles can be retrieved"""
        response = requests.get(f"{BASE_URL}/api/customer-profiles")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} customer profiles")


class TestAssessments:
    """Assessment CRUD tests - Dream Kitchen page"""
    
    def test_create_assessment(self):
        """Test Begin Assessment button saves assessment progress"""
        payload = {
            "progress": 10,
            "answers": {}
        }
        response = requests.post(f"{BASE_URL}/api/assessments", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data
        assert data["progress"] == 10
        assert data["answers"] == {}
        print(f"✓ Assessment created with ID: {data['id']}")
    
    def test_create_assessment_with_answers(self):
        """Test saving assessment with answers"""
        payload = {
            "progress": 50,
            "answers": {"q1": "yes", "q2": "restaurant"}
        }
        response = requests.post(f"{BASE_URL}/api/assessments", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["progress"] == 50
        assert data["answers"]["q1"] == "yes"
        print("✓ Assessment with answers created")
    
    def test_get_assessments(self):
        """Verify assessments can be retrieved"""
        response = requests.get(f"{BASE_URL}/api/assessments")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} assessments")


class TestScaledBatches:
    """Scaled Batch CRUD tests - Scaling & Prep Calculator page"""
    
    def test_create_scaled_batch(self):
        """Test Export to Inventory button saves scaled batch data"""
        payload = {
            "recipe_name": "TEST_Signature Braised Short Ribs",
            "target_servings": 120,
            "total_batch_cost": 842.12,
            "cost_per_unit": 7.02,
            "prep_time_hours": 6.5,
            "ingredients": [
                {"name": "Beef Short Rib", "unit": "kg", "original": "10.0", "target": "48.0"},
                {"name": "Red Wine", "unit": "L", "original": "2.5", "target": "12.0"}
            ]
        }
        response = requests.post(f"{BASE_URL}/api/scaled-batches", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data
        assert data["recipe_name"] == payload["recipe_name"]
        assert data["target_servings"] == 120
        assert data["total_batch_cost"] == 842.12
        assert data["cost_per_unit"] == 7.02
        assert len(data["ingredients"]) == 2
        print(f"✓ Scaled batch created with ID: {data['id']}")
    
    def test_get_scaled_batches(self):
        """Verify scaled batches can be retrieved"""
        response = requests.get(f"{BASE_URL}/api/scaled-batches")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} scaled batches")


class TestPayrollPlans:
    """Payroll Plan CRUD tests - Payroll Planning page"""
    
    def test_create_payroll_plan(self):
        """Test Save Plan button saves payroll configuration"""
        payload = {
            "location": "California (San Francisco)",
            "projected_labor_cost": 4250.00,
            "total_weekly_labor": 5825.50,
            "crew_schedule": [
                {"initials": "MA", "name": "Marco A.", "shifts": ["08:00", "08:00", "OFF"], "total": "44:00"},
                {"initials": "SL", "name": "Sarah L.", "shifts": ["OFF", "06:00", "06:00"], "total": "36:00"}
            ]
        }
        response = requests.post(f"{BASE_URL}/api/payroll-plans", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data
        assert data["location"] == payload["location"]
        assert data["projected_labor_cost"] == 4250.00
        assert data["total_weekly_labor"] == 5825.50
        assert len(data["crew_schedule"]) == 2
        print(f"✓ Payroll plan created with ID: {data['id']}")
    
    def test_get_payroll_plans(self):
        """Verify payroll plans can be retrieved"""
        response = requests.get(f"{BASE_URL}/api/payroll-plans")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} payroll plans")


class TestTrainingProgress:
    """Training Progress CRUD tests - Crew Quarters Training page"""
    
    def test_create_training_progress(self):
        """Test Mark as Trained button saves training completion"""
        payload = {
            "module_id": 1,
            "module_title": "TEST_HACCP Temperature Controls",
            "completed": True
        }
        response = requests.post(f"{BASE_URL}/api/training-progress", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data
        assert data["module_id"] == 1
        assert data["module_title"] == payload["module_title"]
        assert data["completed"] == True
        print(f"✓ Training progress created with ID: {data['id']}")
    
    def test_create_training_not_completed(self):
        """Test saving training progress as not completed"""
        payload = {
            "module_id": 2,
            "module_title": "TEST_Sanitization Protocol",
            "completed": False
        }
        response = requests.post(f"{BASE_URL}/api/training-progress", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["completed"] == False
        print("✓ Training progress (incomplete) created")
    
    def test_get_training_progress(self):
        """Verify training progress can be retrieved"""
        response = requests.get(f"{BASE_URL}/api/training-progress")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} training progress records")


class TestSimulationProgress:
    """Simulation Progress CRUD tests - Day One Simulator page"""
    
    def test_create_simulation_progress(self):
        """Test answer selection saves simulation progress and updates metrics"""
        payload = {
            "scenario_id": 1,
            "selected_answer": "B",
            "is_correct": True,
            "progress_percent": 35,
            "revenue": 1570.50,
            "satisfaction": 93
        }
        response = requests.post(f"{BASE_URL}/api/simulation-progress", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data
        assert data["scenario_id"] == 1
        assert data["selected_answer"] == "B"
        assert data["is_correct"] == True
        assert data["progress_percent"] == 35
        assert data["revenue"] == 1570.50
        assert data["satisfaction"] == 93
        print(f"✓ Simulation progress created with ID: {data['id']}")
    
    def test_create_simulation_wrong_answer(self):
        """Test saving incorrect answer"""
        payload = {
            "scenario_id": 2,
            "selected_answer": "A",
            "is_correct": False,
            "progress_percent": 50,
            "revenue": 1420.50,
            "satisfaction": 85
        }
        response = requests.post(f"{BASE_URL}/api/simulation-progress", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["is_correct"] == False
        print("✓ Simulation progress (incorrect answer) created")
    
    def test_get_simulation_progress(self):
        """Verify simulation progress can be retrieved"""
        response = requests.get(f"{BASE_URL}/api/simulation-progress")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} simulation progress records")


class TestPermits:
    """Permit CRUD tests - Paper Trail Permits page"""
    
    def test_create_permit_new(self):
        """Test New Permit button saves permit data"""
        payload = {
            "name": "TEST_New Permit Application",
            "category": "health",
            "status": "pending",
            "due_date": None,
            "notes": ""
        }
        response = requests.post(f"{BASE_URL}/api/permits", json=payload)
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert "id" in data
        assert data["name"] == payload["name"]
        assert data["category"] == "health"
        assert data["status"] == "pending"
        print(f"✓ Permit created with ID: {data['id']}")
        return data["id"]
    
    def test_create_permit_schedule_inspection(self):
        """Test Schedule Inspection button saves permit data"""
        payload = {
            "name": "TEST_Pre-opening Inspection",
            "category": "health",
            "status": "in_progress",
            "due_date": "2025-02-15",
            "notes": "Inspection scheduled"
        }
        response = requests.post(f"{BASE_URL}/api/permits", json=payload)
        assert response.status_code == 200
        
        data = response.json()
        assert data["status"] == "in_progress"
        assert data["due_date"] == "2025-02-15"
        print("✓ Permit with inspection scheduled created")
    
    def test_get_permits(self):
        """Verify permits can be retrieved"""
        response = requests.get(f"{BASE_URL}/api/permits")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} permits")


class TestExistingEndpoints:
    """Test pre-existing endpoints that were already implemented"""
    
    def test_create_truck_design(self):
        """Test Truck Design Studio - Save Design button"""
        payload = {
            "primary_color": "#FF5722",
            "accent_color": "#FFC107",
            "finish_type": "gloss",
            "texture_type": "solid",
            "business_name": "TEST_Tasty Trucks"
        }
        response = requests.post(f"{BASE_URL}/api/truck-designs", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["business_name"] == "TEST_Tasty Trucks"
        print(f"✓ Truck design created with ID: {data['id']}")
    
    def test_create_recipe(self):
        """Test Recipe Builder - Save Recipe button"""
        payload = {
            "name": "TEST_Signature Tacos",
            "prep_time": 30,
            "cook_time": 15,
            "batch_yield": 20,
            "cost_per_serving": 2.50,
            "ingredients": [{"name": "Tortillas", "qty": "20", "unit": "pieces"}],
            "steps": [{"order": 1, "instruction": "Warm tortillas"}]
        }
        response = requests.post(f"{BASE_URL}/api/recipes", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["name"] == "TEST_Signature Tacos"
        print(f"✓ Recipe created with ID: {data['id']}")
    
    def test_create_break_even_scenario(self):
        """Test Break-Even Analyzer - Save Scenario button"""
        payload = {
            "name": "TEST_Growth Scenario",
            "fixed_expenses": 3500.00,
            "avg_menu_price": 12.50,
            "avg_cost_per_plate": 4.00,
            "operating_days": 25,
            "avg_customers_per_day": 75,
            "break_even_units": 412,
            "projected_sales": 1875,
            "net_profit": 12468.75
        }
        response = requests.post(f"{BASE_URL}/api/break-even", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["name"] == "TEST_Growth Scenario"
        print(f"✓ Break-even scenario created with ID: {data['id']}")
    
    def test_create_signature_dish(self):
        """Test Signature Dish Developer - Save Draft/Publish buttons"""
        payload = {
            "name": "TEST_Gourmet Burger",
            "narrative": "A culinary masterpiece",
            "primary_component": "beef",
            "x_factor": "truffle aioli",
            "flavor_profiles": ["savory", "umami"],
            "status": "draft"
        }
        response = requests.post(f"{BASE_URL}/api/dishes", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "id" in data
        assert data["status"] == "draft"
        print(f"✓ Signature dish created with ID: {data['id']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
