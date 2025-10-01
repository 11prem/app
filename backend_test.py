#!/usr/bin/env python3
"""
Backend API Testing for Portfolio Website
Tests all backend endpoints and MongoDB integration
"""

import requests
import json
import os
import sys
from datetime import datetime
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / 'frontend' / '.env')
load_dotenv(ROOT_DIR / 'backend' / '.env')

# Get backend URL from frontend environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("❌ REACT_APP_BACKEND_URL not found in environment")
    sys.exit(1)

API_BASE_URL = f"{BACKEND_URL}/api"
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'portfolio_db')

print(f"🔗 Testing Backend API at: {API_BASE_URL}")
print(f"🗄️  MongoDB URL: {MONGO_URL}")
print(f"📊 Database: {DB_NAME}")
print("=" * 60)

class BackendTester:
    def __init__(self):
        self.results = {
            'total_tests': 0,
            'passed': 0,
            'failed': 0,
            'errors': []
        }
        
        # MongoDB connection
        try:
            self.mongo_client = MongoClient(MONGO_URL)
            self.db = self.mongo_client[DB_NAME]
            print("✅ MongoDB connection established")
        except Exception as e:
            print(f"❌ MongoDB connection failed: {e}")
            self.mongo_client = None
            self.db = None

    def log_test(self, test_name, success, message="", error_details=""):
        """Log test results"""
        self.results['total_tests'] += 1
        if success:
            self.results['passed'] += 1
            print(f"✅ {test_name}: {message}")
        else:
            self.results['failed'] += 1
            print(f"❌ {test_name}: {message}")
            if error_details:
                print(f"   Error: {error_details}")
                self.results['errors'].append(f"{test_name}: {error_details}")

    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        print("\n🧪 Testing GET /api/ endpoint...")
        try:
            response = requests.get(f"{API_BASE_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Hello World':
                    self.log_test("GET /api/", True, "Returns correct Hello World message")
                else:
                    self.log_test("GET /api/", False, f"Unexpected response: {data}")
            else:
                self.log_test("GET /api/", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("GET /api/", False, "Request failed", str(e))
        except Exception as e:
            self.log_test("GET /api/", False, "Unexpected error", str(e))

    def test_contact_form_valid(self):
        """Test POST /api/contact with valid data"""
        print("\n🧪 Testing POST /api/contact with valid data...")
        
        test_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "subject": "Portfolio Inquiry",
            "message": "This is a test message with more than 10 characters to meet validation requirements."
        }
        
        try:
            response = requests.post(
                f"{API_BASE_URL}/contact",
                json=test_data,
                headers={'Content-Type': 'application/json'},
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                expected_response = {
                    "success": True,
                    "message": "Thanks — I'll respond within 48 hours."
                }
                
                if data == expected_response:
                    self.log_test("POST /api/contact (valid)", True, "Returns correct success response")
                    
                    # Verify MongoDB storage
                    if self.db is not None:
                        self.verify_contact_submission_storage(test_data)
                else:
                    self.log_test("POST /api/contact (valid)", False, f"Unexpected response: {data}")
            else:
                self.log_test("POST /api/contact (valid)", False, f"HTTP {response.status_code}: {response.text}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("POST /api/contact (valid)", False, "Request failed", str(e))
        except Exception as e:
            self.log_test("POST /api/contact (valid)", False, "Unexpected error", str(e))

    def verify_contact_submission_storage(self, test_data):
        """Verify that contact submission was stored in MongoDB"""
        print("\n🧪 Verifying MongoDB storage...")
        
        try:
            # Find the most recent submission with matching email
            submission = self.db.contact_submissions.find_one(
                {"email": test_data["email"]},
                sort=[("timestamp", -1)]
            )
            
            if submission:
                # Check required fields
                required_fields = ['id', 'name', 'email', 'subject', 'message', 'timestamp', 'status']
                missing_fields = [field for field in required_fields if field not in submission]
                
                if not missing_fields:
                    # Verify data matches
                    if (submission['name'] == test_data['name'] and 
                        submission['email'] == test_data['email'] and
                        submission['subject'] == test_data['subject'] and
                        submission['message'] == test_data['message']):
                        
                        self.log_test("MongoDB Storage", True, f"Contact submission stored correctly with ID: {submission['id']}")
                        print(f"   📝 Status: {submission.get('status', 'N/A')}")
                        print(f"   🕐 Timestamp: {submission.get('timestamp', 'N/A')}")
                    else:
                        self.log_test("MongoDB Storage", False, "Stored data doesn't match submitted data")
                else:
                    self.log_test("MongoDB Storage", False, f"Missing required fields: {missing_fields}")
            else:
                self.log_test("MongoDB Storage", False, "No matching submission found in database")
                
        except Exception as e:
            self.log_test("MongoDB Storage", False, "Database verification failed", str(e))

    def test_contact_form_validation_errors(self):
        """Test POST /api/contact validation errors"""
        print("\n🧪 Testing POST /api/contact validation errors...")
        
        # Test cases for validation errors
        test_cases = [
            {
                "name": "Missing Name",
                "data": {
                    "email": "test@example.com",
                    "subject": "Test",
                    "message": "This is a test message with more than 10 characters."
                },
                "expected_status": 422
            },
            {
                "name": "Invalid Email",
                "data": {
                    "name": "Test User",
                    "email": "invalid-email",
                    "subject": "Test",
                    "message": "This is a test message with more than 10 characters."
                },
                "expected_status": 422
            },
            {
                "name": "Short Message",
                "data": {
                    "name": "Test User",
                    "email": "test@example.com",
                    "subject": "Test",
                    "message": "Short"
                },
                "expected_status": 422
            },
            {
                "name": "Empty Name",
                "data": {
                    "name": "",
                    "email": "test@example.com",
                    "subject": "Test",
                    "message": "This is a test message with more than 10 characters."
                },
                "expected_status": 422
            }
        ]
        
        for test_case in test_cases:
            try:
                response = requests.post(
                    f"{API_BASE_URL}/contact",
                    json=test_case["data"],
                    headers={'Content-Type': 'application/json'},
                    timeout=10
                )
                
                if response.status_code == test_case["expected_status"]:
                    self.log_test(f"Validation: {test_case['name']}", True, f"Correctly returned HTTP {response.status_code}")
                else:
                    self.log_test(f"Validation: {test_case['name']}", False, 
                                f"Expected HTTP {test_case['expected_status']}, got {response.status_code}")
                    
            except requests.exceptions.RequestException as e:
                self.log_test(f"Validation: {test_case['name']}", False, "Request failed", str(e))
            except Exception as e:
                self.log_test(f"Validation: {test_case['name']}", False, "Unexpected error", str(e))

    def test_mongodb_collections(self):
        """Test MongoDB collections structure"""
        print("\n🧪 Testing MongoDB collections...")
        
        if self.db is None:
            self.log_test("MongoDB Collections", False, "No database connection available")
            return
            
        try:
            # Check if contact_submissions collection exists
            collections = self.db.list_collection_names()
            
            if 'contact_submissions' in collections:
                self.log_test("MongoDB Collections", True, "contact_submissions collection exists")
                
                # Check collection structure by examining a document
                sample_doc = self.db.contact_submissions.find_one()
                if sample_doc:
                    print(f"   📋 Sample document fields: {list(sample_doc.keys())}")
                else:
                    print("   📋 Collection is empty")
            else:
                self.log_test("MongoDB Collections", False, "contact_submissions collection not found")
                print(f"   Available collections: {collections}")
                
        except Exception as e:
            self.log_test("MongoDB Collections", False, "Collection check failed", str(e))

    def run_all_tests(self):
        """Run all backend tests"""
        print("🚀 Starting Backend API Tests")
        print("=" * 60)
        
        # Test all endpoints
        self.test_root_endpoint()
        self.test_contact_form_valid()
        self.test_contact_form_validation_errors()
        self.test_mongodb_collections()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.results['total_tests']}")
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        
        if self.results['errors']:
            print("\n🚨 ERRORS ENCOUNTERED:")
            for error in self.results['errors']:
                print(f"   • {error}")
        
        # Close MongoDB connection
        if self.mongo_client:
            self.mongo_client.close()
            
        return self.results['failed'] == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed!")
        sys.exit(0)
    else:
        print("\n💥 Some tests failed!")
        sys.exit(1)