
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dataDir = path.join(__dirname, '../data/storage');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create test user with hashed password
async function createTestUser() {
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const testUser = {
    name: "John Doe",
    email: "john@example.com",
    password: hashedPassword,
    role: "user",
    createdAt: new Date().toISOString(),
    id: "test-user-12345"
  };

  const usersFile = path.join(dataDir, 'users.json');
  let users = [];

  // Read existing users
  if (fs.existsSync(usersFile)) {
    try {
      const existingData = fs.readFileSync(usersFile, 'utf8');
      users = JSON.parse(existingData);
    } catch (error) {
      console.log('Creating new users file...');
    }
  }

  // Check if test user already exists
  const existingUser = users.find(u => u.email === testUser.email);
  if (!existingUser) {
    users.push(testUser);
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    console.log('✅ Test user created: john@example.com / password123');
  } else {
    console.log('ℹ️  Test user already exists: john@example.com / password123');
  }

  return testUser.id;
}

// Update project data with test user ID
function updateProjectsWithTestUser(userId) {
  const projectsFile = path.join(dataDir, 'projects.json');
  
  if (fs.existsSync(projectsFile)) {
    try {
      const projects = JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
      const updatedProjects = projects.map(project => ({
        ...project,
        userId: userId
      }));
      
      fs.writeFileSync(projectsFile, JSON.stringify(updatedProjects, null, 2));
      console.log('✅ Projects updated with test user ID');
    } catch (error) {
      console.error('Error updating projects:', error);
    }
  }
}

// Update other data files with test user ID
function updateDataWithTestUser(userId) {
  const files = ['invoices.json', 'support_tickets.json', 'client_analytics.json'];
  
  files.forEach(filename => {
    const filePath = path.join(dataDir, filename);
    
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const updatedData = data.map(item => ({
          ...item,
          userId: userId
        }));
        
        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
        console.log(`✅ ${filename} updated with test user ID`);
      } catch (error) {
        console.error(`Error updating ${filename}:`, error);
      }
    }
  });
}

// Main function
async function populateTestData() {
  console.log('🚀 Populating test data...\n');
  
  try {
    const testUserId = await createTestUser();
    updateProjectsWithTestUser(testUserId);
    updateDataWithTestUser(testUserId);
    
    console.log('\n✨ Test data population complete!');
    console.log('\n📋 Test User Credentials:');
    console.log('Email: john@example.com');
    console.log('Password: password123');
    console.log('\n🔗 You can now log in to the dashboard with these credentials.');
    
  } catch (error) {
    console.error('❌ Error populating test data:', error);
    process.exit(1);
  }
}

// Run the script
populateTestData();
