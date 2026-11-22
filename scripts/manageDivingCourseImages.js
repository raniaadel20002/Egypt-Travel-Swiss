const https = require('https');
const fs = require('fs');
const path = require('path');

const API_BASE_URL = 'https://touristy.runasp.net';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlckFkbWluIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2E0NzY2MzExQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL21vYmlsZXBob25lIjoiMDEwNjMwODQ1OTQiLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc5NTk1MDkxMn0.tlSlVDTYaFJlltjqX4_GLNUtYc0E6BBfu9q87NHldBY';

// Map course names to image files
const courseImageMap = {
  'Discover Scuba Diving': [
    '../public/DivingCourses/18beb5ba1af65cd74f209d6618df941bc4a19eac.jpg',
  ],
  'PADI Open Water Diver': [
    '../public/DivingCourses/dfc6b17a4bf77886765b45cb670f0e28ea86f6be.jpg',
  ],
  'PADI Advanced Open Water Diver': [
    '../public/DivingCourses/419d1fbd0b3e0d7a741bbf5103f5a2b26eaa616b.jpg',
  ],
};

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

function uploadImage(courseId, imagePath) {
  return new Promise((resolve, reject) => {
    const absolutePath = path.resolve(__dirname, imagePath);
    
    if (!fs.existsSync(absolutePath)) {
      return reject(new Error(`Image file not found: ${absolutePath}`));
    }

    const fileStream = fs.createReadStream(absolutePath);
    const fileName = path.basename(imagePath);
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

async function fetchDivingCourses() {
  console.log('Fetching diving courses from API...\n');
  
  try {
    const response = await makeRequest('GET', '/api/DivingCourses?pageSize=100');
    const courses = response.data?.data || response.Data || [];
    return courses;
  } catch (error) {
    console.error('Failed to fetch diving courses:', error.message);
    return [];
  }
}

async function uploadImagesForCourse(courseId, courseName, imagePaths) {
  console.log(`\n=== Uploading images for: ${courseName} (ID: ${courseId}) ===`);
  
  for (let i = 0; i < imagePaths.length; i++) {
    const imagePath = imagePaths[i];
    try {
      console.log(`  [${i + 1}/${imagePaths.length}] Uploading: ${path.basename(imagePath)}`);
      const response = await uploadImage(courseId, imagePath);
      const imageId = response.data?.id || response.id;
      console.log(`  ✓ Success (Image ID: ${imageId})`);
    } catch (error) {
      console.error(`  ✗ Failed: ${error.message}`);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function main() {
  console.log('========================================');
  console.log('Diving Course Image Management');
  console.log('========================================');
  console.log(`API Base URL: ${API_BASE_URL}\n`);
  
  // Fetch all courses
  const courses = await fetchDivingCourses();
  
  if (courses.length === 0) {
    console.log('⚠️  No diving courses found!');
    console.log('\nMake sure you run addDivingCourses.js first to create the courses.');
    return;
  }
  
  console.log(`Found ${courses.length} diving courses:\n`);
  courses.forEach((course, idx) => {
    console.log(`  ${idx + 1}. ${course.name} (ID: ${course.id})`);
  });
  
  console.log('\n========================================');
  console.log('Starting Image Upload Process');
  console.log('========================================\n');
  
  let uploadCount = 0;
  
  // Match courses by name and upload images
  for (const [courseName, imagePaths] of Object.entries(courseImageMap)) {
    const course = courses.find(c => c.name.includes(courseName) || courseName.includes(c.name));
    
    if (course) {
      await uploadImagesForCourse(course.id, course.name, imagePaths);
      uploadCount++;
    } else {
      console.log(`\n⚠️  Course not found: "${courseName}"`);
      console.log('   Available courses:');
      courses.forEach(c => console.log(`   - ${c.name}`));
    }
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n========================================');
  console.log('Image Upload Complete!');
  console.log('========================================');
  console.log(`\nSummary:`);
  console.log(`- Courses processed: ${uploadCount}/${Object.keys(courseImageMap).length}`);
  console.log(`- Total images uploaded: ${uploadCount * 1} (1 per course)`);
  console.log('\nNext Steps:');
  console.log('- Visit /[locale]/diving-courses to see your courses');
  console.log('- Add more images via the admin panel if needed');
}

main().catch(console.error);
