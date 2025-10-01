from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime
import uuid

class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"  # pending, sent, failed

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    subject: Optional[str] = None
    message: str = Field(..., min_length=10)

class ContactSubmissionResponse(BaseModel):
    success: bool
    message: str