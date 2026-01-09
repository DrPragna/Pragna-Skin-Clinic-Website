// Branch display names
const BRANCH_NAMES = {
  'punjagutta': 'Punjagutta',
  'kokapet': 'Kokapet'
};

// Helper function to get ordinal suffix (st, nd, rd, th)
function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

// Format timestamp as "January 9th, 2026, 6:40 PM"
function formatTimestamp(dateObj) {
  const date = new Date(dateObj);
  
  // Convert to Asia/Kolkata timezone using Utilities
  const timeZone = 'Asia/Kolkata';
  const formatted = Utilities.formatDate(date, timeZone, 'MMMM d, yyyy, h:mm a');
  
  // Extract parts and add ordinal suffix
  const parts = formatted.split(', ');
  const monthDay = parts[0].split(' ');
  const month = monthDay[0];
  const day = parseInt(monthDay[1]);
  const year = parts[1];
  const time = parts[2];
  
  return month + ' ' + day + getOrdinalSuffix(day) + ', ' + year + ', ' + time;
}

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
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Timestamp',
        'Name', 
        'Phone',
        'Email',
        'Branch',
        'Concerns',
        'Source',
        'Status'
      ]]);
      // Format header row
      sheet.getRange(1, 1, 1, 8)
        .setBackground('#722B2B')
        .setFontColor('#FFFFFF')
        .setFontWeight('bold');
      // Freeze header row
      sheet.setFrozenRows(1);
      // Set column widths
      sheet.setColumnWidth(1, 250); // Timestamp (wider for new format)
      sheet.setColumnWidth(2, 150); // Name
      sheet.setColumnWidth(3, 140); // Phone
      sheet.setColumnWidth(4, 200); // Email
      sheet.setColumnWidth(5, 100); // Branch
      sheet.setColumnWidth(6, 250); // Concerns
      sheet.setColumnWidth(7, 100); // Source
      sheet.setColumnWidth(8, 120); // Status
    }
    
    // Format timestamp as "January 9th, 2026, 6:40:30 PM"
    const dateObj = data.timestamp ? new Date(data.timestamp) : new Date();
    const timestamp = formatTimestamp(dateObj);
    
    // Format phone with country code (prefix with ' to prevent formula interpretation)
    const fullPhone = "'" + (data.countryCode || '+91') + ' ' + (data.phone || '');
    
    // Get branch display name
    const branchDisplay = BRANCH_NAMES[data.branch] || data.branch || 'Not specified';
    
    // Append the new row
    sheet.appendRow([
      timestamp,
      data.name || '',
      fullPhone,
      data.email || '',
      branchDisplay,
      data.concerns || '',
      'Website',
      'New' // Default status for team to update
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
        branch: 'punjagutta',
        concerns: 'This is a test booking',
        timestamp: new Date().toISOString(),
        source: 'test'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

