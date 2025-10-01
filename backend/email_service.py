import os
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.gmail_sender = os.environ.get('GMAIL_SENDER', 'prem112004@gmail.com')
        self.gmail_app_password = os.environ.get('GMAIL_APP_PASSWORD', '')
        self.recipient_email = os.environ.get('RECIPIENT_EMAIL', 'prem112004@gmail.com')
        self.smtp_server = 'smtp.gmail.com'
        self.smtp_port = 465
    
    def _send_email(self, to_email: str, subject: str, body_text: str, body_html: str = None) -> bool:
        """
        Internal method to send email via Gmail SMTP with proper headers for primary inbox delivery.
        """
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = f"Prem B Portfolio <{self.gmail_sender}>"
            msg['To'] = to_email
            msg['Reply-To'] = self.gmail_sender
            
            # Add headers to ensure primary inbox delivery
            msg['X-Priority'] = '1'
            msg['Importance'] = 'high'
            msg['X-MSMail-Priority'] = 'High'
            
            # Add text and HTML parts
            part1 = MIMEText(body_text, 'plain')
            msg.attach(part1)
            
            if body_html:
                part2 = MIMEText(body_html, 'html')
                msg.attach(part2)
            
            # Send email via Gmail SMTP
            with smtplib.SMTP_SSL(self.smtp_server, self.smtp_port) as server:
                server.login(self.gmail_sender, self.gmail_app_password)
                server.send_message(msg)
            
            logger.info(f"Email sent successfully to {to_email}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email to {to_email}: {str(e)}")
            return False
    
    async def send_contact_notification(self, submission_data: dict) -> bool:
        """
        Send email notification for new contact form submission to portfolio owner.
        """
        try:
            subject = f"🔔 New Portfolio Contact: {submission_data['subject'] or 'General Inquiry'}"
            
            # Plain text version
            body_text = f"""
New Contact Form Submission

Name: {submission_data['name']}
Email: {submission_data['email']}
Subject: {submission_data['subject'] or 'N/A'}

Message:
{submission_data['message']}

---
Submitted: {submission_data['timestamp']}
Submission ID: {submission_data['id']}

Reply directly to this email to respond to {submission_data['name']}.
"""
            
            # HTML version for better formatting
            body_html = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #0891b2; color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
        .content {{ background: #f8f9fa; padding: 20px; border: 1px solid #ddd; }}
        .field {{ margin-bottom: 15px; }}
        .label {{ font-weight: bold; color: #0891b2; }}
        .message-box {{ background: white; padding: 15px; border-left: 4px solid #0891b2; margin: 15px 0; }}
        .footer {{ background: #e2e8f0; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin: 0;">🔔 New Portfolio Contact</h2>
        </div>
        <div class="content">
            <div class="field">
                <span class="label">From:</span> {submission_data['name']}
            </div>
            <div class="field">
                <span class="label">Email:</span> <a href="mailto:{submission_data['email']}">{submission_data['email']}</a>
            </div>
            <div class="field">
                <span class="label">Subject:</span> {submission_data['subject'] or 'General Inquiry'}
            </div>
            <div class="message-box">
                <div class="label">Message:</div>
                <p>{submission_data['message']}</p>
            </div>
            <div class="field" style="font-size: 12px; color: #666;">
                <span class="label">Submitted:</span> {submission_data['timestamp']}<br>
                <span class="label">ID:</span> {submission_data['id']}
            </div>
        </div>
        <div class="footer">
            Reply directly to this email to respond to {submission_data['name']}.
        </div>
    </div>
</body>
</html>
"""
            
            # Send to portfolio owner with reply-to set to submitter's email
            msg = MIMEMultipart('alternative')
            msg['Subject'] = subject
            msg['From'] = f"Portfolio Contact Form <{self.gmail_sender}>"
            msg['To'] = self.recipient_email
            msg['Reply-To'] = submission_data['email']  # Allow direct reply to submitter
            
            # Priority headers for primary inbox
            msg['X-Priority'] = '1'
            msg['Importance'] = 'high'
            
            part1 = MIMEText(body_text, 'plain')
            part2 = MIMEText(body_html, 'html')
            msg.attach(part1)
            msg.attach(part2)
            
            with smtplib.SMTP_SSL(self.smtp_server, self.smtp_port) as server:
                server.login(self.gmail_sender, self.gmail_app_password)
                server.send_message(msg)
            
            logger.info(f"Contact notification sent for submission {submission_data['id']}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send contact notification: {str(e)}")
            return False
    
    async def send_auto_reply(self, submission_data: dict) -> bool:
        """
        Send automatic confirmation reply to the person who submitted the form.
        """
        try:
            subject = "Thank you for contacting me - Prem B"
            
            # Plain text version
            body_text = f"""
Hi {submission_data['name']},

Thank you for reaching out through my portfolio website. I have received your message and will get back to you within 48 hours.

Your message:
"{submission_data['message']}"

Best regards,
Prem B
Mobile App Developer | AI/ML Engineer | Full-Stack Developer

Email: prem112004@gmail.com
Phone: +91 8056187431
LinkedIn: linkedin.com/in/premb2004
GitHub: github.com/11prem
"""
            
            # HTML version
            body_html = f"""
<!DOCTYPE html>
<html>
<head>
    <style>
        body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
        .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
        .header {{ background: #0891b2; color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }}
        .content {{ background: #f8f9fa; padding: 25px; border: 1px solid #ddd; }}
        .message-box {{ background: white; padding: 15px; border-left: 4px solid #0891b2; margin: 20px 0; font-style: italic; }}
        .footer {{ background: #e2e8f0; padding: 20px; border-radius: 0 0 8px 8px; }}
        .signature {{ margin-top: 20px; }}
        .contact-links {{ margin-top: 15px; }}
        .contact-links a {{ color: #0891b2; text-decoration: none; margin-right: 15px; }}
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 style="margin: 0;">Thank You for Reaching Out!</h2>
        </div>
        <div class="content">
            <p>Hi {submission_data['name']},</p>
            <p>Thank you for contacting me through my portfolio website. I have received your message and will respond within <strong>48 hours</strong>.</p>
            
            <div class="message-box">
                <strong>Your message:</strong>
                <p>{submission_data['message']}</p>
            </div>
            
            <div class="signature">
                <p><strong>Best regards,</strong><br>
                Prem B<br>
                <em>Mobile App Developer | AI/ML Engineer | Full-Stack Developer</em></p>
            </div>
        </div>
        <div class="footer">
            <div class="contact-links">
                <a href="mailto:prem112004@gmail.com">📧 Email</a>
                <a href="tel:+918056187431">📱 +91 8056187431</a>
                <a href="http://linkedin.com/in/premb2004">💼 LinkedIn</a>
                <a href="https://github.com/11prem">💻 GitHub</a>
            </div>
        </div>
    </div>
</body>
</html>
"""
            
            success = self._send_email(
                to_email=submission_data['email'],
                subject=subject,
                body_text=body_text,
                body_html=body_html
            )
            
            if success:
                logger.info(f"Auto-reply sent to {submission_data['email']}")
            return success
            
        except Exception as e:
            logger.error(f"Failed to send auto-reply: {str(e)}")
            return False