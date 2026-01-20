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
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error('[Google Sheets] HTTP error:', response.status, response.statusText);
      throw new Error(`Google Sheets error: ${response.status}`);
    }

    const result = await response.text();
    console.log('[Google Sheets] Response:', result.substring(0, 200)); // Log first 200 chars
    return true;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('[Google Sheets] Request timeout after 8 seconds');
    } else {
      console.error('[Google Sheets] Failed to append:', error);
    }
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

    // Try to save to Google Sheets (with timeout protection)
    let sheetSuccess = false;
    try {
      console.log('[Booking API] Attempting to save to Google Sheets...', {
        name: bookingData.name,
        timestamp: bookingData.timestamp
      });
      sheetSuccess = await appendToGoogleSheet(bookingData);
      console.log('[Booking API] Google Sheets save result:', sheetSuccess);
    } catch (err) {
      console.error('[Booking API] Google Sheets save failed:', err);
      // Don't fail the whole request - WhatsApp is the primary action
    }

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

