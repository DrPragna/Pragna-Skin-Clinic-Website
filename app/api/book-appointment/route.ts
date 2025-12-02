import { NextRequest, NextResponse } from 'next/server';

// Types
interface BookingData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  concerns?: string;
  timestamp: string;
  source?: string;
}

// Google Sheets Integration
async function appendToGoogleSheet(data: BookingData): Promise<boolean> {
  const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
  
  if (!GOOGLE_SCRIPT_URL) {
    console.warn('Google Script URL not configured - skipping sheet logging');
    return false;
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets error: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error('Failed to append to Google Sheet:', error);
    return false;
  }
}

// Email Notification (using Resend or fallback to a simple webhook)
async function sendEmailNotification(data: BookingData): Promise<boolean> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'yenigantisai@gmail.com';

  // If Resend is configured, use it
  if (RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Pragna Skin Clinic <bookings@pragnaskinclinic.com>',
          to: [NOTIFICATION_EMAIL],
          subject: `🗓️ New Appointment Request - ${data.name}`,
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="background: linear-gradient(135deg, #722B2B 0%, #8B3A3A 100%); padding: 30px; border-radius: 12px 12px 0 0;">
                <h1 style="color: #FFF8F0; margin: 0; font-size: 24px;">New Appointment Request</h1>
              </div>
              <div style="background: #FFF8F0; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #E8DDD5;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E8DDD5; color: #666; width: 120px;">Name</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E8DDD5; color: #1a1a1a; font-weight: 500;">${data.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E8DDD5; color: #666;">Email</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E8DDD5; color: #1a1a1a;">${data.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E8DDD5; color: #666;">Phone</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E8DDD5; color: #1a1a1a;">${data.countryCode} ${data.phone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #666; vertical-align: top;">Concerns</td>
                    <td style="padding: 12px 0; color: #1a1a1a;">${data.concerns || 'Not specified'}</td>
                  </tr>
                </table>
                <div style="margin-top: 24px; padding: 16px; background: #F5EDE8; border-radius: 8px;">
                  <p style="margin: 0; color: #666; font-size: 13px;">
                    📅 Submitted: ${new Date(data.timestamp).toLocaleString('en-IN', { 
                      dateStyle: 'full', 
                      timeStyle: 'short',
                      timeZone: 'Asia/Kolkata'
                    })}
                  </p>
                </div>
                <a href="https://wa.me/${data.countryCode.replace('+', '')}${data.phone}" 
                   style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #25D366; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
                  💬 Reply on WhatsApp
                </a>
              </div>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend error: ${error}`);
      }

      return true;
    } catch (error) {
      console.error('Failed to send email via Resend:', error);
      return false;
    }
  }

  // Fallback: Log that email wasn't sent
  console.warn('Email service not configured - skipping email notification');
  return false;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, countryCode, phone, concerns, source } = body;
    
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare booking data
    const bookingData: BookingData = {
      name: name.trim(),
      email: email.trim(),
      countryCode: countryCode || '+91',
      phone: phone.trim(),
      concerns: concerns?.trim() || '',
      timestamp: new Date().toISOString(),
      source: source || 'website',
    };

    // Execute both operations in parallel
    const [sheetResult, emailResult] = await Promise.all([
      appendToGoogleSheet(bookingData),
      sendEmailNotification(bookingData),
    ]);

    // Generate WhatsApp link for client-side redirect
    const whatsappNumber = process.env.WHATSAPP_NUMBER || '919380551547';
    const whatsappMessage = encodeURIComponent(
      `🗓️ *New Appointment Request*\n\n` +
      `*Name:* ${bookingData.name}\n` +
      `*Phone:* ${bookingData.countryCode} ${bookingData.phone}\n` +
      `*Email:* ${bookingData.email}\n` +
      `*Concerns:* ${bookingData.concerns || 'Not specified'}\n\n` +
      `_Sent from Pragna Skin Clinic website_`
    );
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    return NextResponse.json({
      success: true,
      message: 'Booking request received',
      whatsappLink,
      services: {
        googleSheets: sheetResult,
        email: emailResult,
      },
    });

  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process booking request' },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    service: 'booking-api',
    timestamp: new Date().toISOString(),
  });
}

