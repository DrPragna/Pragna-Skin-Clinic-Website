import { NextRequest, NextResponse } from 'next/server';

// Types
interface BookingData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  branch: string;
  concerns?: string;
  timestamp: string;
  source?: string;
}

// Branch display names
const BRANCH_NAMES: Record<string, string> = {
  punjagutta: "Punjagutta",
  kokapet: "Kokapet",
};

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, countryCode, phone, branch, concerns, source } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Prepare booking data
    const bookingData: BookingData = {
      name: name.trim(),
      email: email?.trim() || '',
      countryCode: countryCode || '+91',
      phone: phone.trim(),
      branch: branch || '',
      concerns: concerns?.trim() || '',
      timestamp: new Date().toISOString(),
      source: source || 'website',
    };

    // Fire and forget - save to Google Sheets in background (don't wait)
    appendToGoogleSheet(bookingData).catch(err => {
      console.error('Background sheet append failed:', err);
    });

    // Generate WhatsApp link immediately
    const whatsappNumber = process.env.WHATSAPP_NUMBER || '918886531111';
    const branchDisplay = bookingData.branch ? BRANCH_NAMES[bookingData.branch] || bookingData.branch : 'Not specified';
    const whatsappMessage = encodeURIComponent(
      `Hi, I would like to book a consultation.\n\n` +
      `Name: ${bookingData.name}\n` +
      `Phone: ${bookingData.countryCode} ${bookingData.phone}\n` +
      `Branch: ${branchDisplay}\n` +
      (bookingData.concerns ? `Concerns: ${bookingData.concerns}\n` : '') +
      `\nSent from website`
    );
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    // Return immediately - user sees success instantly
    return NextResponse.json({
      success: true,
      message: 'Booking request received',
      whatsappLink,
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

