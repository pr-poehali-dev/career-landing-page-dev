import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки кандидата на почту HR-отдела."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    email = body.get("email", "").strip()

    if not name or not email:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Укажите имя и email"}),
        }

    smtp_password = os.environ.get("SMTP_PASSWORD", "")
    smtp_from = "hr_241@mail.ru"
    smtp_to = "hr_241@mail.ru"

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка от кандидата: {name}"
    msg["From"] = smtp_from
    msg["To"] = smtp_to

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: #f97316; padding: 20px 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">Цифроград — новая заявка</h1>
      </div>
      <div style="background: #fff; border: 1px solid #e5e7eb; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
        <p style="color: #374151; font-size: 16px; margin: 0 0 16px;">Кандидат хочет работать в «Цифрограде»!</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 120px;">Имя:</td>
            <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: bold;">{name}</td>
          </tr>
          <tr style="border-top: 1px solid #f3f4f6;">
            <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Email:</td>
            <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:{email}" style="color: #f97316;">{email}</a></td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #fff7ed; border-radius: 8px; border-left: 4px solid #f97316;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">Свяжитесь с кандидатом как можно скорее!</p>
        </div>
      </div>
    </div>
    """

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL("smtp.mail.ru", 465) as server:
        server.login(smtp_from, smtp_password)
        server.sendmail(smtp_from, smtp_to, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"success": True}),
    }
