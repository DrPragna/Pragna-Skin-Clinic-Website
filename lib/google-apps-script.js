/**
 * Google Apps Script for Pragna Skin Clinic Bookings
 * 
 * SETUP INSTRUCTIONS:
 * 
 * 1. Go to Google Sheets and create a new spreadsheet
 *    - Name it "Pragna Skin Clinic - Bookings"
 *    - Add headers in Row 1: Timestamp | Name | Email | Country Code | Phone | Concerns | Source
 * 
 * 2. Go to Extensions > Apps Script
 * 
 * 3. Delete any existing code and paste this entire script
 * 
 * 4. Click "Deploy" > "New deployment"
 *    - Select type: "Web app"
 *    - Description: "Booking Form Handler"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy"
 * 
 * 5. Copy the Web App URL (looks like: https://script.google.com/macros/s/xxx/exec)
 * 
 * 6. Add this URL to your .env.local file as GOOGLE_SCRIPT_URL
 * 
 * That's it! Your form submissions will now appear in the Google Sheet.
 */

// Main handler for POST requests
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet and sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Bookings');
    
    // Create the sheet if it doesn't exist
    if (!sheet) {
      sheet = ss.insertSheet('Bookings');
      // Add headers
      sheet.getRange(1, 1, 1, 7).setValues([[
        'Timestamp',
        'Name', 
        'Email',
        'Country Code',
        'Phone',
        'Concerns',
        'Source'
      ]]);
      // Format header row
      sheet.getRange(1, 1, 1, 7)
        .setBackground('#722B2B')
        .setFontColor('#FFFFFF')
        .setFontWeight('bold');
      // Freeze header row
      sheet.setFrozenRows(1);
    }
    
    // Format timestamp for Indian timezone
    const timestamp = data.timestamp 
      ? new Date(data.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
    // Append the new row
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.email || '',
      data.countryCode || '+91',
      data.phone || '',
      data.concerns || '',
      data.source || 'website'
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handler for GET requests (for testing)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'ok', 
      message: 'Pragna Skin Clinic Booking API is running',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function - run this to verify the script works
function testAppend() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        countryCode: '+91',
        phone: '9876543210',
        concerns: 'This is a test booking',
        timestamp: new Date().toISOString(),
        source: 'test'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

