const https = require('https');

const API_BASE_URL = 'https://touristy.runasp.net';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTk1MDkxMn0.tlSlVDTYaFJlltjqX4_GLNUtYc0E6BBfu9q87NHldBY';

function makeRequest(method, endpoint) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint, API_BASE_URL);
    const options = {
      method: method,
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Accept': 'application/json',
      },
      rejectUnauthorized: false
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const response = body ? JSON.parse(body) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(response);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('========================================');
  console.log('Fetching Existing Hotels');
  console.log('========================================\n');
  
  try {
    const response = await makeRequest('GET', '/api/Hotels');
    const hotels = response.data || response.Data || response;
    
    console.log(`Found ${hotels.length} hotels:\n`);
    
    hotels.forEach((hotel, index) => {
      console.log(`${index + 1}. ID: ${hotel.id}`);
      console.log(`   Name: ${hotel.name}`);
      console.log(`   Location: ${hotel.location || 'N/A'}`);
      console.log(`   Rate: ${hotel.rate} stars`);
      console.log(`   Facilities: ${hotel.facilities?.length || 0}`);
      console.log(`   Description: ${hotel.description ? hotel.description.substring(0, 60) + '...' : 'N/A'}`);
      console.log('');
    });
    
    console.log('\n========================================');
    console.log('Hotel details saved to console');
    console.log('========================================');
    
  } catch (error) {
    console.error('Error fetching hotels:', error.message);
  }
}

main();
