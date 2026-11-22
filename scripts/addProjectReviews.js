const axios = require("axios");

const BASE_URL = "https://touristy.runasp.net";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTk2MDk1M30.YLJzDW3qy8_5Ob5gpxEhAhK9h2f5sie0TCDa2iPgnTo";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

const projectReviews = [
  {
    firstName: "Sophie",
    lastName: "Martin",
    email: "sophie.martin@email.fr",
    phone: "+33 6 12 34 56 78",
    comment: "Outstanding travel experience! The Egypt Travel Swiss team coordinated everything perfectly from our Red Sea diving adventures to the historical tours in Luxor. Every detail was handled with precision and care. The local guides were knowledgeable and the accommodations exceeded our expectations. Highly recommend for anyone wanting an authentic Egyptian experience.",
    rate: 5,
  },
  {
    firstName: "Marco",
    lastName: "Rossi",
    email: "m.rossi@email.it",
    phone: "+39 340 123 4567",
    comment: "We had an incredible 10-day journey through Egypt with this company. From the moment we landed in Cairo until our departure from Hurghada, everything was seamless. The Nile cruise was spectacular, the diving in the Red Sea was world-class, and our guide Ahmed was simply fantastic. Professional service at every step. Grazie mille!",
    rate: 5,
  },
  {
    firstName: "Elena",
    lastName: "Popescu",
    email: "elena.popescu@email.ro",
    phone: "+40 722 123 456",
    comment: "Exceptional service and unforgettable memories! Our family trip to Egypt was perfectly organized. The kids loved the camel ride near the pyramids, I enjoyed the spa at our Red Sea resort, and my husband was thrilled with the diving courses. The multilingual support made everything so easy. Worth every penny!",
    rate: 5,
  },
  {
    firstName: "Thomas",
    lastName: "Mueller",
    email: "t.mueller@email.de",
    phone: "+49 151 23456789",
    comment: "Very good organization overall. The trip itinerary was well-balanced between adventure and relaxation. Our coordinator was responsive and helpful throughout. The only minor issue was a slight delay with our airport transfer, but it was quickly resolved. The Red Sea diving sites are absolutely stunning. Would book again.",
    rate: 4,
  },
  {
    firstName: "Anastasia",
    lastName: "Sokolova",
    email: "a.sokolova@email.ru",
    phone: "+7 916 123 4567",
    comment: "Beautiful experience discovering Egypt! The desert safari was thrilling, the temples in Luxor were breathtaking, and snorkeling in the Red Sea was magical. Our guide spoke perfect Russian which made the cultural explanations so much richer. The hotels were comfortable and well-located. Egypt Travel Swiss made our dream vacation a reality!",
    rate: 5,
  },
];

async function createReview(review, index) {
  try {
    console.log(`\n[${index + 1}/5] Creating review from ${review.firstName} ${review.lastName}...`);
    console.log(`  Email: ${review.email}`);
    console.log(`  Rating: ${review.rate}/5`);
    
    const response = await api.post("/api/ReviewsProject", review);

    console.log(`  Response status: ${response.status}`);
    
    if (response.data?.success || response.data?.Success) {
      console.log(`✓ Review created successfully (ID: ${response.data?.data?.id || response.data?.Data?.id || 'N/A'})`);
      return response.data;
    } else {
      console.log(`✗ Failed: ${response.data?.message || response.data?.Message || 'Unknown error'}`);
      return null;
    }
  } catch (error) {
    console.error(`✗ Error creating review from ${review.firstName} ${review.lastName}:`);
    if (error.response) {
      console.error(`  Status: ${error.response.status}`);
      console.error(`  Data:`, JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error(`  No response received from server`);
      console.error(`  Request:`, error.request);
    } else {
      console.error(`  Error:`, error.message);
    }
    throw error;
  }
}

async function main() {
  console.log("=".repeat(70));
  console.log("ADD PROJECT REVIEWS SCRIPT");
  console.log("=".repeat(70));
  console.log(`\nAdding ${projectReviews.length} project reviews to the backend...`);

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < projectReviews.length; i++) {
    const result = await createReview(projectReviews[i], i);
    if (result) {
      successCount++;
    } else {
      failCount++;
    }
    // Small delay to avoid rate limiting
    if (i < projectReviews.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  console.log("\n" + "=".repeat(70));
  console.log("SUMMARY");
  console.log("=".repeat(70));
  console.log(`Total reviews: ${projectReviews.length}`);
  console.log(`✓ Successfully created: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log("\nProject reviews have been added to the backend.");
  console.log("You can now test the reviews display on your website.");
}

main().catch((error) => {
  console.error("\nFatal error:", error.message);
  process.exit(1);
});
