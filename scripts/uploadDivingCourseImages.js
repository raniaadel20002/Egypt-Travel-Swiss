const https = require('https');
const fs = require('fs');
const path = require('path');

const API_BASE_URL = 'https://touristy.runasp.net';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTk1MDkxMn0.tlSlVDTYaFJlltjqX4_GLNUtYc0E6BBfu9q87NHldBY';

// IMAGE CONFIGURATION
// Map course IDs to their image files
// UPDATE THESE IDs after creating the courses!
const courseImages = {
  // Replace 'COURSE_ID_1' with actual course ID for Discover Scuba Diving
  'COURSE_ID_1': [
    '../public/DivingCourses/18beb5ba1af65cd74f209d6618df941bc4a19eac.jpg',
  ],
  // Replace 'COURSE_ID_2' with actual course ID for PADI Open Water Diver
  'COURSE_ID_2': [
    '../public/DivingCourses/dfc6b17a4bf77886765b45cb670f0e28ea86f6be.jpg',
  ],
  // Replace 'COURSE_ID_3' with actual course ID for PADI Advanced Open Water
  'COURSE_ID_3': [
    '../public/DivingCourses/419d1fbd0b3e0d7a741bbf5103f5a2b26eaa616b.jpg',
  ],
};

function uploadImage(courseId, imagePath) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(__dirname, imagePath);
    
    if (!fs.existsSync(absolutePath)) {
      return reject(new Error(`Image file not found: ${absolutePath}`));
    }

    const fileStream = fs.createReadStream(absolutePath);
    const fileName = path.basename(imagePath);
    const stats = fs.statSync(absolutePath);
    
    const boundary = `----WebKitFormBoundary${Math.random().toString(36).substring(2)}`;
    
    const url = new URL(`/api/DivingCourses/${courseId}/images`, API_BASE_URL);
    
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
      },
      rejectUnauthorized: false
    };

    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            const response = body ? JSON.parse(body) : {};
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

    // Write multipart form data
    req.write(`--${boundary}\r\n`);
    req.write(`Content-Disposition: form-data; name="file"; filename="${fileName}"\r\n`);
    req.write(`Content-Type: image/jpeg\r\n\r\n`);

    fileStream.on('data', (chunk) => {
      req.write(chunk);
    });

    fileStream.on('end', () => {
      req.write(`\r\n--${boundary}--\r\n`);
      req.end();
    });

    fileStream.on('error', reject);
  });
}

async function uploadImagesForCourse(courseId, imagePaths) {
  console.log(`\n=== Uploading images for course: ${courseId} ===`);
  
  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    try {
      console.log(`  Uploading image ${i + 1}/${imagePaths.length}: ${path.basename(imagePath)}`);
      const response = await uploadImage(courseId, imagePath);
      const imageId = response.data?.id || response.id;
      console.log(`  ✓ Image uploaded successfully (ID: ${imageId})`);
    } catch (error) {
      console.error(`  ✗ Failed to upload image: ${error.message}`);
    }
    
    // Wait between uploads
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function main() {
  console.log('========================================');
  console.log('Diving Course Image Upload Process');
  console.log('========================================');
  console.log(`API Base URL: ${API_BASE_URL}`);
  
  // Check if course IDs have been updated
  const courseIds = Object.keys(courseImages);
  const hasPlaceholders = courseIds.some(id => id.startsWith('COURSE_ID_'));
  
  if (hasPlaceholders) {
    console.log('\n⚠️  WARNING: You need to update the course IDs!');
    console.log('\nSteps:');
    console.log('1. Run the addDivingCourses.js script first');
    console.log('2. Note the course IDs returned from the API');
    console.log('3. Edit this file (uploadDivingCourseImages.js)');
    console.log('4. Replace COURSE_ID_1, COURSE_ID_2, COURSE_ID_3 with actual IDs');
    console.log('5. Run this script again\n');
    console.log('Example:');
    console.log('  Change: "COURSE_ID_1": [...]');
    console.log('  To:     "abc123-def456-ghi789": [...]\n');
    return;
  }
  
  console.log(`\nCourses to process: ${courseIds.length}\n`);
  
  for (const courseId of courseIds) {
    const imagePaths = courseImages[courseId];
    await uploadImagesForCourse(courseId, imagePaths);
    
    // Wait between courses
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n========================================');
  console.log('Image Upload Process Complete!');
  console.log('========================================');
  console.log('\nNext Steps:');
  console.log('- Check the diving courses page to see the images');
  console.log('- You can add more images via the admin panel');
}

main().catch(console.error);
