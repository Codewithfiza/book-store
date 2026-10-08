// apply-stock.mjs
// Run with: node apply-stock.mjs
// Applies the reconciled stock numbers from the seed-order.mjs report directly to your books.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI; // match the key name you used in seed-order.mjs

// title -> new stock value (from the reconciliation report, with "the art of being alone" capped at 0)
const STOCK_UPDATES = {
  "The Waste Land": 8,
  "Pride and Prejudice": 20,
  "Elon Musk": 7,
  "The Lost City of Z": 33,
  "A Game of Thrones": 11,
  "Think and Grow Rich": 11,
  "Robinson Crusoe": 13,
  "Milk and Honey": 23,
  "The Sun and Her Flowers": 20,
  "The Power of Now": 13,
  "The Diary of a Young Girl": 12,
  "Gone Girl": 11,
  "The Haunting of Hill House": 10,
  "Man's Search for Meaning": 23,
  "Me Before You": 13,
  "Brave New World": 19,
  "Frankenstein": 21,
  "Life of Pi": 16,
  "The Silk Roads": 8,
  "The Old Man and the Sea": 18,
  "Into the Wild": 15,
  "The Lion, the Witch and the Wardrobe": 15,
  "Steve Jobs": 14,
  "Normal People": 10,
  "Eragon": 17,
  "The Big Sleep": 9,
  "1984": 19,
  "It Ends with Us": 14,
  "Mistborn: The Final Empire": 17,
  "The Shining": 9,
  "The 7 Habits of Highly Effective People": 19,
  "A People's History of the United States": 7,
  "The Midnight Library": 16,
  "Neuromancer": 4,
  "The Hound of the Baskervilles": 22,
  "Leaves of Grass": 16,
  "The Martian": 11,
  "Dune": 14,
  "the art of being alone": 0, // capped from -1
  "To Kill a Mockingbird": 25,
  "The Hobbit": 18,
  "The Great Gatsby": 20,
  "Atomic Habits": 28,
  "Educated": 13,
  "Sapiens": 20,
  "The Guns of August": 4,
  "The Girl with the Dragon Tattoo": 8,
  "It": 9,
  "Beach Read": 15,
  "And Then There Were None": 24,
  "In the Woods": 7,
  "Becoming": 15,
  "off campus": 4,
  "Dracula": 21,
  "Long Walk to Freedom": 11,
  "Ariel": 13,
};

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to database.\n');

  const db = mongoose.connection.db;
  const booksCollection = db.collection('books');

  let updated = 0;
  let notFound = [];

  for (const [title, newStock] of Object.entries(STOCK_UPDATES)) {
    const result = await booksCollection.updateOne(
      { title },
      { $set: { stock: newStock } }
    );

    if (result.matchedCount === 0) {
      notFound.push(title);
    } else {
      console.log(`Updated "${title}" → stock: ${newStock}`);
      updated++;
    }
  }

  console.log(`\nDone. ${updated} books updated.`);
  if (notFound.length > 0) {
    console.log(`\n⚠ Titles not found in database (check for typos/case mismatches):`);
    notFound.forEach((t) => console.log(`  - ${t}`));
  }

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
