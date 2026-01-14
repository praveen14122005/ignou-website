const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(process.cwd(), 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize users file if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
}

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@ignouwithus.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const name = process.env.ADMIN_NAME || 'Admin User';

  // Read existing users
  let users = [];
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    users = JSON.parse(data);
  } catch (error) {
    users = [];
  }

  // Check if admin already exists
  const existingAdmin = users.find(u => u.email === email);
  if (existingAdmin) {
    console.log('Admin user already exists!');
    return;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin user
  const admin = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    email,
    name,
    password: hashedPassword,
    role: 'admin',
    createdAt: new Date().toISOString(),
    purchasedPDFs: [],
  };

  users.push(admin);
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  console.log('Admin user created successfully!');
  console.log(`Email: ${email}`);
  console.log(`Password: ${password}`);
  console.log('\n⚠️  Please change the default password after first login!');
}

createAdmin().catch(console.error);
