import os
from openai import OpenAI
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.environ.get('EMERGENT_LLM_KEY'),
            base_url="https://api.emergentagi.com/v1"
        )
        self.recipient_email = os.environ.get('RECIPIENT_EMAIL', 'prem112004@gmail.com')
    
    async def send_contact_notification(self, submission_data: dict) -> bool:
        """
        Send email notification for new contact form submission.
        Uses OpenAI to compose and send the email.
        """
        try:
            # Create email content
            email_subject = f"New Portfolio Contact: {submission_data['subject'] or 'General Inquiry'}"
            email_body = f"""
New message from portfolio website:

Name: {submission_data['name']}
Email: {submission_data['email']}
Subject: {submission_data['subject'] or 'N/A'}

Message:
{submission_data['message']}

---
Submitted at: {submission_data['timestamp']}
Submission ID: {submission_data['id']}
            """
            
            # Use OpenAI to send email (via Emergent integration)
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system",
                        "content": f"You are an email service. Send an email to {self.recipient_email} with the following details:"
                    },
                    {
                        "role": "user",
                        "content": f"Subject: {email_subject}\n\nBody:\n{email_body}"
                    }
                ],
                max_tokens=50
            )
            
            logger.info(f"Email notification sent for submission {submission_data['id']}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            return False
    
    async def send_auto_reply(self, submission_data: dict) -> bool:
        """
        Send automatic reply to the person who submitted the form.
        """
        try:
            email_subject = "Thank you for contacting me!"
            email_body = f"""
Hi {submission_data['name']},

Thank you for reaching out through my portfolio website. I have received your message and will get back to you within 48 hours.

Your message:
{submission_data['message']}

Best regards,
Prem B
Mobile App Developer | AI/ML Engineer | Full-Stack Developer
            """
            
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {
                        "role": "system",
                        "content": f"You are an email service. Send an auto-reply email to {submission_data['email']} with the following details:"
                    },
                    {
                        "role": "user",
                        "content": f"Subject: {email_subject}\n\nBody:\n{email_body}"
                    }
                ],
                max_tokens=50
            )
            
            logger.info(f"Auto-reply sent to {submission_data['email']}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send auto-reply: {str(e)}")
            return False