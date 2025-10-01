# Portfolio Website - Frontend & Backend Integration Contracts

## Overview
This document outlines the integration contracts between the frontend React application and the FastAPI backend for Prem B's portfolio website.

## Current Status
- ✅ Frontend: Complete with mock data
- ⏳ Backend: Needs implementation for contact form
- 📦 Mock Data: Located in `/app/frontend/src/utils/mock.js`

## API Endpoints to Implement

### 1. Contact Form Submission

**Endpoint:** `POST /api/contact`

**Purpose:** Handle contact form submissions and send email notifications

**Request Body:**
```json
{
  "name": "string (required, min 1 char)",
  "email": "string (required, valid email format)",
  "subject": "string (optional)",
  "message": "string (required, min 10 chars)"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Thanks — I'll respond within 48 hours."
}
```

**Response (Error - 400/500):**
```json
{
  "success": false,
  "message": "Message failed to send. Try again."
}
```

**Validation Rules:**
- Name: Required, non-empty string
- Email: Required, valid email format
- Subject: Optional string
- Message: Required, minimum 10 characters

**Backend Implementation Requirements:**
1. Store contact form submission in MongoDB (collection: `contact_submissions`)
2. Send email notification to `prem112004@gmail.com` using Emergent LLM integration
3. Include timestamp and submission ID
4. Handle errors gracefully with appropriate status codes

**MongoDB Schema:**
```python
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    status: str = "pending"  # pending, sent, failed
```

## Frontend Integration Points

### Contact Form Component
**File:** `/app/frontend/src/sections/Contact.jsx`

**Current Mock Implementation:**
```javascript
// Line: contactFormMock.submit(formData)
// Location: /app/frontend/src/utils/mock.js
```

**Replace With:**
```javascript
// In Contact.jsx handleSubmit function
const response = await axios.post(`${API}/contact`, formData);
```

**Required Changes:**
1. Import axios and API constant from backend URL
2. Replace `contactFormMock.submit()` with actual API call
3. Keep existing error handling and toast notifications
4. Remove mock import after integration

## Environment Variables

**Backend (.env):**
```
EMERGENT_LLM_KEY=sk-emergent-e629b5fEf82E3Cc2cB
RECIPIENT_EMAIL=prem112004@gmail.com
```

## Integration Checklist

- [ ] Create `/api/contact` endpoint in backend
- [ ] Implement MongoDB storage for contact submissions
- [ ] Configure email sending using Emergent LLM integration
- [ ] Add validation for form fields
- [ ] Test error handling scenarios
- [ ] Update frontend Contact.jsx to use real API
- [ ] Remove mock.js contact form mock (keep other data)
- [ ] Test end-to-end contact form submission
- [ ] Verify email delivery

## Email Template

**Subject:** New Contact Form Submission from Portfolio

**Body:**
```
New message from portfolio website:

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
Submitted at: {timestamp}
Submission ID: {id}
```

## Notes
- All other data (projects, skills, experience, education) remains static on frontend
- Resume URL is hardcoded to customer assets URL
- No authentication required for contact form
- Rate limiting recommended for production (not MVP requirement)
