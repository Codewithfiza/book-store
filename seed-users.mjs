import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to database.\n');

  const db = mongoose.connection.db;
  const usersCollection = db.collection('users');

  const accounts = [
    {
      email: process.env.ADMIN_SEED_EMAIL,
      password: process.env.ADMIN_SEED_PASSWORD,
      role: 'admin',
    },
    {
      email: process.env.VIEWER_SEED_EMAIL,
      password: process.env.VIEWER_SEED_PASSWORD,
      role: 'viewer',
    },
  ];

  for (const account of accounts) {
    if (!account.email || !account.password) {
      console.log(`Skipping ${account.role} — missing email or password in .env.local`);
      continue;
    }

    const existing = await usersCollection.findOne({ email: account.email });
    if (existing) {
      console.log(`User already exists: ${account.email} (${account.role}) — skipped`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(account.password, 10);

    await usersCollection.insertOne({
      email: account.email,
      password: hashedPassword,
      role: account.role,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log(`Created ${account.role} account: ${account.email}`);
  }

  await mongoose.disconnect();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});