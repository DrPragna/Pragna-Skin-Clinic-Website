// Branch display names
const BRANCH_NAMES = {
  'punjagutta': 'Punjagutta',
  'kokapet': 'Kokapet'
};

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
      sheet.setColumnWidth(1, 180); // Timestamp
      sheet.setColumnWidth(2, 150); // Name
      sheet.setColumnWidth(3, 140); // Phone
      sheet.setColumnWidth(4, 200); // Email
      sheet.setColumnWidth(5, 100); // Branch
      sheet.setColumnWidth(6, 250); // Concerns
      sheet.setColumnWidth(7, 100); // Source
      sheet.setColumnWidth(8, 120); // Status
    }
    
    // Format timestamp for Indian timezone
    const timestamp = data.timestamp 
      ? new Date(data.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    
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

