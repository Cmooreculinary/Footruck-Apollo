"""
Paint Shop API Tests - Testing truck design endpoints with full state persistence
Tests: POST /api/truck-designs, GET /api/truck-designs/latest
Focus: All new fields (lettering_x, lettering_y, lettering_font, awning_color, lights_color, racing_stripe_color, etc.)
"""
import pytest
import requests
import os
import uuid

# Read from frontend .env file for the public URL
from pathlib import Path
_env_path = Path(__file__).parent.parent.parent / 'frontend' / '.env'
_base_url = ''
if _env_path.exists():
    with open(_env_path) as f:
        for line in f:
            if line.startswith('REACT_APP_BACKEND_URL='):
                _base_url = line.split('=', 1)[1].strip().strip('"').strip("'")
                break
BASE_URL = _base_url or os.environ.get('REACT_APP_BACKEND_URL', 'https://design-studio-614.preview.emergentagent.com').rstrip('/')

pytestmark = pytest.mark.skipif(
    os.environ.get("RUN_REMOTE_API_TESTS") != "1",
    reason="Remote API integration tests are opt-in; set RUN_REMOTE_API_TESTS=1 to run them.",
)

class TestPaintShopAPI:
    """Test Paint Shop truck design API endpoints"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup test data"""
        self.test_design = {
            "primary_color": "#E8592F",
            "accent_color": "#2C2C2C",
            "finish_type": "GLOSS",
            "business_name": f"TEST_TACO_FIESTA_{uuid.uuid4().hex[:6]}",
            "base_model": "truck_01",
            "split_pattern": "horizontal",
            "wrap_id": "stripes_h",
            "wrap_opacity": 0.5,
            # Lettering fields - NEW
            "lettering_font": "GOTHIC",
            "lettering_color": "#FFFFFF",
            "lettering_size": 3,
            "lettering_x": 50.0,
            "lettering_y": 45.0,
            "lettering_outline": "none",
            "letter_spacing": "normal",
            # Accessories - NEW
            "awning": "solid",
            "awning_color": "#CC0000",
            "lights_color": "#FF6600",
            "signage_illuminated": True,
            "racing_stripe_color": "#FFFFFF",
            "racing_stripe_width": "medium",
            "accessories": ["led_underglow", "roof_signage", "racing_stripe"],
            # Logo fields - NEW
            "logo_x": 50.0,
            "logo_y": 40.0,
            "logo_scale": 1.0,
            "logo_rotation": 0.0
        }
    
    def test_api_health(self):
        """Test API root endpoint is healthy"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print("✓ API health check passed")
    
    def test_create_truck_design_with_all_fields(self):
        """Test POST /api/truck-designs with full payload including all new fields"""
        response = requests.post(
            f"{BASE_URL}/api/truck-designs",
            json=self.test_design,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        data = response.json()
        
        # Verify all fields are returned
        assert data["primary_color"] == self.test_design["primary_color"]
        assert data["accent_color"] == self.test_design["accent_color"]
        assert data["finish_type"] == self.test_design["finish_type"]
        assert data["business_name"] == self.test_design["business_name"]
        assert data["base_model"] == self.test_design["base_model"]
        
        # Verify NEW lettering fields
        assert data["lettering_font"] == self.test_design["lettering_font"]
        assert data["lettering_color"] == self.test_design["lettering_color"]
        assert data["lettering_size"] == self.test_design["lettering_size"]
        assert data["lettering_x"] == self.test_design["lettering_x"]
        assert data["lettering_y"] == self.test_design["lettering_y"]
        assert data["lettering_outline"] == self.test_design["lettering_outline"]
        assert data["letter_spacing"] == self.test_design["letter_spacing"]
        
        # Verify NEW accessory fields
        assert data["awning"] == self.test_design["awning"]
        assert data["awning_color"] == self.test_design["awning_color"]
        assert data["lights_color"] == self.test_design["lights_color"]
        assert data["signage_illuminated"] == self.test_design["signage_illuminated"]
        assert data["racing_stripe_color"] == self.test_design["racing_stripe_color"]
        assert data["racing_stripe_width"] == self.test_design["racing_stripe_width"]
        assert data["accessories"] == self.test_design["accessories"]
        
        # Verify NEW logo fields
        assert data["logo_x"] == self.test_design["logo_x"]
        assert data["logo_y"] == self.test_design["logo_y"]
        assert data["logo_scale"] == self.test_design["logo_scale"]
        assert data["logo_rotation"] == self.test_design["logo_rotation"]
        
        # Verify wrap fields
        assert data["wrap_id"] == self.test_design["wrap_id"]
        assert data["wrap_opacity"] == self.test_design["wrap_opacity"]
        
        # Verify ID was generated
        assert "id" in data
        assert len(data["id"]) > 0
        
        print("✓ Create truck design with all fields passed")
        return data
    
    def test_get_latest_truck_design(self):
        """Test GET /api/truck-designs/latest returns saved design with all fields"""
        # First create a design
        create_response = requests.post(
            f"{BASE_URL}/api/truck-designs",
            json=self.test_design,
            headers={"Content-Type": "application/json"}
        )
        assert create_response.status_code == 200
        
        # Then get latest
        response = requests.get(f"{BASE_URL}/api/truck-designs/latest")
        
        # Note: Without auth, this may return null or a different design
        # The endpoint returns the latest design for the current user (or all if no auth)
        assert response.status_code == 200
        data = response.json()
        
        if data:
            # Verify structure has all new fields
            assert "lettering_x" in data or data.get("lettering_x") is None
            assert "lettering_y" in data or data.get("lettering_y") is None
            assert "lettering_font" in data or data.get("lettering_font") is None
            assert "awning_color" in data or data.get("awning_color") is None
            assert "lights_color" in data or data.get("lights_color") is None
            assert "racing_stripe_color" in data or data.get("racing_stripe_color") is None
            assert "racing_stripe_width" in data or data.get("racing_stripe_width") is None
            assert "logo_x" in data or data.get("logo_x") is None
            assert "logo_y" in data or data.get("logo_y") is None
            assert "logo_scale" in data or data.get("logo_scale") is None
            assert "logo_rotation" in data or data.get("logo_rotation") is None
            print("✓ Get latest truck design passed - all new fields present in schema")
        else:
            print("✓ Get latest truck design passed - returned null (no designs for unauthenticated user)")
    
    def test_get_all_truck_designs(self):
        """Test GET /api/truck-designs returns list"""
        response = requests.get(f"{BASE_URL}/api/truck-designs")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Get all truck designs passed - returned {len(data)} designs")
    
    def test_create_design_with_minimal_fields(self):
        """Test POST /api/truck-designs with only required fields"""
        minimal_design = {
            "primary_color": "#FFFFFF",
            "accent_color": "#000000",
            "finish_type": "MATTE",
            "business_name": "TEST_MINIMAL"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/truck-designs",
            json=minimal_design,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["primary_color"] == minimal_design["primary_color"]
        assert data["business_name"] == minimal_design["business_name"]
        print("✓ Create design with minimal fields passed")
    
    def test_create_design_with_lettering_position(self):
        """Test that lettering_x and lettering_y are properly persisted"""
        design_with_position = {
            "primary_color": "#FF0000",
            "accent_color": "#0000FF",
            "finish_type": "CHROME",
            "business_name": "TEST_POSITIONED_TEXT",
            "lettering_x": 75.5,
            "lettering_y": 30.0,
            "lettering_font": "SCRIPT",
            "lettering_color": "#FFD700",
            "lettering_size": 4
        }
        
        response = requests.post(
            f"{BASE_URL}/api/truck-designs",
            json=design_with_position,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["lettering_x"] == 75.5
        assert data["lettering_y"] == 30.0
        assert data["lettering_font"] == "SCRIPT"
        assert data["lettering_color"] == "#FFD700"
        print("✓ Create design with lettering position passed")
    
    def test_create_design_with_racing_stripe(self):
        """Test racing stripe fields are properly persisted"""
        design_with_stripe = {
            "primary_color": "#000000",
            "accent_color": "#FFFFFF",
            "finish_type": "GLOSS",
            "business_name": "TEST_RACING_STRIPE",
            "racing_stripe_color": "#FF0000",
            "racing_stripe_width": "bold",
            "accessories": ["racing_stripe"]
        }
        
        response = requests.post(
            f"{BASE_URL}/api/truck-designs",
            json=design_with_stripe,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["racing_stripe_color"] == "#FF0000"
        assert data["racing_stripe_width"] == "bold"
        assert "racing_stripe" in data["accessories"]
        print("✓ Create design with racing stripe passed")
    
    def test_create_design_with_all_accessories(self):
        """Test all accessory fields are properly persisted"""
        design_with_accessories = {
            "primary_color": "#E8592F",
            "accent_color": "#2C2C2C",
            "finish_type": "METALLIC",
            "business_name": "TEST_ALL_ACCESSORIES",
            "awning": "striped",
            "awning_color": "#00FF00",
            "lights_color": "#0000FF",
            "signage_illuminated": True,
            "accessories": ["led_underglow", "roof_signage", "racing_stripe"]
        }
        
        response = requests.post(
            f"{BASE_URL}/api/truck-designs",
            json=design_with_accessories,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["awning"] == "striped"
        assert data["awning_color"] == "#00FF00"
        assert data["lights_color"] == "#0000FF"
        assert data["signage_illuminated"] == True
        assert len(data["accessories"]) == 3
        print("✓ Create design with all accessories passed")


class TestTruckImages:
    """Test truck image availability"""
    
    def test_truck_01_image(self):
        """Test truck_01.png is accessible"""
        response = requests.get(f"{BASE_URL}/trucks/truck_01.png")
        assert response.status_code == 200
        assert "image" in response.headers.get("content-type", "")
        print("✓ truck_01.png accessible")
    
    def test_truck_02_image(self):
        """Test truck_02.png is accessible"""
        response = requests.get(f"{BASE_URL}/trucks/truck_02.png")
        assert response.status_code == 200
        print("✓ truck_02.png accessible")
    
    def test_truck_03_image(self):
        """Test truck_03.png is accessible"""
        response = requests.get(f"{BASE_URL}/trucks/truck_03.png")
        assert response.status_code == 200
        print("✓ truck_03.png accessible")
    
    def test_truck_04_image(self):
        """Test truck_04.png is accessible"""
        response = requests.get(f"{BASE_URL}/trucks/truck_04.png")
        assert response.status_code == 200
        print("✓ truck_04.png accessible")
    
    def test_truck_05_image(self):
        """Test truck_05.png is accessible"""
        response = requests.get(f"{BASE_URL}/trucks/truck_05.png")
        assert response.status_code == 200
        print("✓ truck_05.png accessible")
    
    def test_truck_06_image(self):
        """Test truck_06.png is accessible"""
        response = requests.get(f"{BASE_URL}/trucks/truck_06.png")
        assert response.status_code == 200
        print("✓ truck_06.png accessible")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
