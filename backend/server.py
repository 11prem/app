from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

from models import ContactSubmission, ContactSubmissionCreate, ContactSubmissionResponse
from email_service import EmailService

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Email service
email_service = EmailService()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(submission: ContactSubmissionCreate):
    """
    Handle contact form submission.
    Stores submission in MongoDB and sends email notification.
    """
    try:
        # Create contact submission object
        contact_obj = ContactSubmission(**submission.dict())
        
        # Store in MongoDB
        await db.contact_submissions.insert_one(contact_obj.dict())
        logger.info(f"Contact submission stored: {contact_obj.id}")
        
        # Send email notifications
        email_sent = await email_service.send_contact_notification(contact_obj.dict())
        
        # Send auto-reply to submitter
        await email_service.send_auto_reply(contact_obj.dict())
        
        # Update status in database
        if email_sent:
            await db.contact_submissions.update_one(
                {"id": contact_obj.id},
                {"$set": {"status": "sent"}}
            )
        else:
            await db.contact_submissions.update_one(
                {"id": contact_obj.id},
                {"$set": {"status": "failed"}}
            )
        
        return ContactSubmissionResponse(
            success=True,
            message="Thanks — I'll respond within 48 hours."
        )
        
    except Exception as e:
        logger.error(f"Error processing contact form: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Message failed to send. Try again."
        )

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
