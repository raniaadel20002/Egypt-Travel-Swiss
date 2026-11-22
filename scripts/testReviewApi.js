const axios = require("axios");

const BASE_URL = "https://touristy.runasp.net";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTk2MDk1M30.YLJzDW3qy8_5Ob5gpxEhAhK9h2f5sie0TCDa2iPgnTo";

async function test() {
  console.log("Testing API connection...");
  console.log("Base URL:", BASE_URL);
  console.log("Token:", TOKEN.substring(0, 20) + "...");
  
  try {
    const review = {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      phone: "+1234567890",
      comment: "This is a test review to verify the API connection.",
      rate: 5,
    };
    
    console.log("\nSending POST request to /api/ReviewsProject");
    console.log("Payload:", JSON.stringify(review, null, 2));
    
    const response = await axios.post(`${BASE_URL}/api/ReviewsProject`, review, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      timeout: 30000,
    });
    
    console.log("\n✓ SUCCESS!");
    console.log("Status:", response.status);
    console.log("Response:", JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error("\n✗ ERROR!");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error("No response received");
      console.error("Request config:", error.config);
    } else {
      console.error("Error:", error.message);
    }
    console.error("\nFull error:", error);
  }
}

test();
