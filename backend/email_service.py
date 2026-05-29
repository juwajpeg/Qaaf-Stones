"""Email service — Resend integration for ق stones.

Sends admin notification emails on every RFQ and Contact form submission.
Non-blocking: failures are logged but never break the API response.
"""

import os
import asyncio
import logging
from typing import Optional

import resend

logger = logging.getLogger(__name__)

RESEND_API_KEY = os.environ.get("RESEND_API_KEY")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL")

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY
    logger.info("Resend configured. Sender=%s Admin=%s", SENDER_EMAIL, ADMIN_EMAIL)
else:
    logger.warning("RESEND_API_KEY not set — emails will not be sent.")


def _row(label: str, value: Optional[str]) -> str:
    if not value:
        return ""
    return (
        f'<tr>'
        f'<td style="padding:10px 14px;border-bottom:1px solid #2E2A28;color:#A8A19F;'
        f'font-family:\'IBM Plex Mono\',monospace;font-size:11px;letter-spacing:0.18em;'
        f'text-transform:uppercase;width:38%;vertical-align:top">{label}</td>'
        f'<td style="padding:10px 14px;border-bottom:1px solid #2E2A28;color:#F4F1EB;'
        f'font-family:Georgia,serif;font-size:15px;vertical-align:top">{value}</td>'
        f'</tr>'
    )


def _wrap(title: str, eyebrow: str, body_rows: str, message: Optional[str] = None) -> str:
    msg_block = ""
    if message:
        msg_block = (
            f'<div style="padding:18px;background:#141212;border:1px solid #2E2A28;'
            f'margin-top:24px"><p style="margin:0 0 8px;color:#A8A19F;'
            f'font-family:\'IBM Plex Mono\',monospace;font-size:10px;letter-spacing:0.22em;'
            f'text-transform:uppercase">// Message</p>'
            f'<p style="margin:0;color:#F4F1EB;font-family:Georgia,serif;font-size:16px;'
            f'line-height:1.6;white-space:pre-wrap">{message}</p></div>'
        )
    return f"""\
<!doctype html>
<html><body style="margin:0;padding:0;background:#0A0909">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#0A0909">
<tr><td align="center" style="padding:40px 20px">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640"
         style="max-width:640px;width:100%;background:#0A0909;border:1px solid #2E2A28">
    <tr><td style="padding:32px 32px 12px">
      <div style="font-family:Georgia,serif;font-size:32px;color:#E07A5F">ق <span style="color:#F4F1EB">stones</span></div>
      <div style="margin-top:6px;font-family:'IBM Plex Mono',monospace;font-size:10px;
                  letter-spacing:0.22em;text-transform:uppercase;color:#A8A19F">{eyebrow}</div>
    </td></tr>
    <tr><td style="padding:8px 32px 0">
      <h1 style="margin:0;font-family:Georgia,serif;font-weight:300;font-size:28px;
                 line-height:1.15;color:#F4F1EB">{title}</h1>
    </td></tr>
    <tr><td style="padding:24px 32px 8px">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
             style="border-top:1px solid #2E2A28">
        {body_rows}
      </table>
      {msg_block}
    </td></tr>
    <tr><td style="padding:24px 32px 32px;border-top:1px solid #2E2A28;margin-top:24px">
      <p style="margin:0;font-family:'IBM Plex Mono',monospace;font-size:10px;
                letter-spacing:0.22em;text-transform:uppercase;color:#A8A19F">
        ق stones · Khewra · Pakistan · Submitted via qaafstones.com
      </p>
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>
"""


def _build_rfq_html(rfq: dict) -> str:
    rows = (
        _row("Company", rfq.get("company_name"))
        + _row("Contact", rfq.get("contact_name"))
        + _row("Email", rfq.get("email"))
        + _row("Phone", rfq.get("phone"))
        + _row("Country", rfq.get("country"))
        + _row("Product", rfq.get("product"))
        + _row("Grade", rfq.get("grade"))
        + _row("Quantity", rfq.get("quantity_mt"))
        + _row("Packaging", rfq.get("packaging"))
        + _row("Destination port", rfq.get("destination_port"))
        + _row("Incoterms", rfq.get("incoterms"))
        + _row("Target price", rfq.get("target_price"))
    )
    title = f"RFQ from {rfq.get('company_name', 'a buyer')} — {rfq.get('country', '')}"
    return _wrap(title, f"// New RFQ · {rfq.get('id', '')[:8]}", rows, rfq.get("message"))


def _build_rfq_text(rfq: dict) -> str:
    fields = [
        ("Company", rfq.get("company_name")),
        ("Contact", rfq.get("contact_name")),
        ("Email", rfq.get("email")),
        ("Phone", rfq.get("phone")),
        ("Country", rfq.get("country")),
        ("Product", rfq.get("product")),
        ("Grade", rfq.get("grade")),
        ("Quantity", rfq.get("quantity_mt")),
        ("Packaging", rfq.get("packaging")),
        ("Destination port", rfq.get("destination_port")),
        ("Incoterms", rfq.get("incoterms")),
        ("Target price", rfq.get("target_price")),
    ]
    lines = [f"New RFQ — ق stones", "=" * 40]
    for k, v in fields:
        if v:
            lines.append(f"{k}: {v}")
    if rfq.get("message"):
        lines.append("")
        lines.append("Message:")
        lines.append(rfq["message"])
    return "\n".join(lines)


def _build_contact_html(contact: dict) -> str:
    rows = (
        _row("Name", contact.get("name"))
        + _row("Email", contact.get("email"))
        + _row("Company", contact.get("company"))
        + _row("Subject", contact.get("subject"))
    )
    title = f"Message from {contact.get('name', 'a visitor')}"
    return _wrap(title, f"// Contact form · {contact.get('id', '')[:8]}", rows, contact.get("message"))


def _build_contact_text(contact: dict) -> str:
    lines = [f"New contact message — ق stones", "=" * 40]
    for k in ("name", "email", "company", "subject"):
        if contact.get(k):
            lines.append(f"{k.title()}: {contact[k]}")
    lines.append("")
    lines.append("Message:")
    lines.append(contact.get("message", ""))
    return "\n".join(lines)


async def _send(params: dict) -> None:
    """Send via Resend in a thread; never raise."""
    if not RESEND_API_KEY or not ADMIN_EMAIL:
        logger.warning("Email skipped — RESEND_API_KEY or ADMIN_EMAIL missing.")
        return
    try:
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Resend email sent id=%s to=%s", result.get("id"), params.get("to"))
    except Exception as e:  # noqa: BLE001
        logger.error("Resend email failed: %s", e)


async def send_rfq_notification(rfq: dict) -> None:
    params = {
        "from": f"ق stones <{SENDER_EMAIL}>",
        "to": [ADMIN_EMAIL],
        "reply_to": rfq.get("email") or ADMIN_EMAIL,
        "subject": f"[RFQ] {rfq.get('company_name', 'New enquiry')} — {rfq.get('product', '')} ({rfq.get('country', '')})",
        "html": _build_rfq_html(rfq),
        "text": _build_rfq_text(rfq),
    }
    await _send(params)


async def send_contact_notification(contact: dict) -> None:
    params = {
        "from": f"ق stones <{SENDER_EMAIL}>",
        "to": [ADMIN_EMAIL],
        "reply_to": contact.get("email") or ADMIN_EMAIL,
        "subject": f"[Contact] {contact.get('subject') or contact.get('name', 'New message')}",
        "html": _build_contact_html(contact),
        "text": _build_contact_text(contact),
    }
    await _send(params)
