import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

// seed-orders.mjs
// Run with: node seed-orders.mjs
// Requires: your project's MONGODB_URI in a .env file (adjust the env var name below if yours differs)

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI; // adjust name if your .env uses a different key

// ---- Pakistani-style fake customer data pools ----
const FIRST_NAMES = ['Ahmed', 'Ali', 'Bilal', 'Fatima', 'Hassan', 'Hira', 'Kashif', 'Maria', 'Noor', 'Osman', 'Sana', 'Tariq', 'Usman', 'Zainab', 'Zara', 'Hamza', 'Ayesha', 'Bilquis', 'Faizan', 'Mehak'];
const LAST_NAMES = ['Khan', 'Ahmed', 'Malik', 'Butt', 'Iqbal', 'Raza', 'Siddiqui', 'Hussain', 'Sheikh', 'Chaudhry', 'Baig', 'Qureshi'];
const CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Rawalpindi', 'Multan', 'Peshawar', 'Sialkot'];
const STREETS = ['Mall Road', 'Gulberg', 'DHA Phase 5', 'Model Town', 'Johar Town', 'Bahria Town', 'F-10 Markaz', 'Cantt Area'];

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPhone() {
  const prefix = randomChoice(['0300', '0301', '0321', '0333', '0345', '0312']);
  const rest = Math.floor(1000000 + Math.random() * 8999999);
  return `${prefix}-${rest}`;
}

function randomCustomer() {
  return {
    firstName: randomChoice(FIRST_NAMES),
    lastName: randomChoice(LAST_NAMES),
    phone: randomPhone(),
    address: `House ${Math.floor(Math.random() * 200) + 1}, ${randomChoice(STREETS)}`,
    city: randomChoice(CITIES),
  };
}

function randomDateInMonth(year, month, upToDay = null) {
  // month is 0-indexed (0 = January)
  const daysInMonth = upToDay || new Date(year, month + 1, 0).getDate();
  const day = Math.floor(Math.random() * daysInMonth) + 1;
  const hour = Math.floor(Math.random() * 14) + 8; // 8am - 10pm
  const minute = Math.floor(Math.random() * 60);
  return new Date(year, month, day, hour, minute);
}

// weighted pick: candidates array of {book, weight}
function weightedPick(weighted) {
  const total = weighted.reduce((sum, w) => sum + w.weight, 0);
  let r = Math.random() * total;
  for (const w of weighted) {
    if (r < w.weight) return w.book;
    r -= w.weight;
  }
  return weighted[weighted.length - 1].book;
}

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to database.');

  const db = mongoose.connection.db;
  const booksCollection = db.collection('books');
  const ordersCollection = db.collection('orders');

  const books = await booksCollection.find({}).toArray();
  if (books.length === 0) {
    console.log('No books found — seed your books first.');
    await mongoose.disconnect();
    return;
  }

  // pick 5 top-seller candidates from books with the highest stock (safer against going negative)
  const sortedByStock = [...books].sort((a, b) => (b.stock || 0) - (a.stock || 0));
  const topSellers = sortedByStock.slice(0, 5);
  const topSellerIds = new Set(topSellers.map((b) => b._id.toString()));

  const weightedBooks = books.map((book) => ({
    book,
    weight: topSellerIds.has(book._id.toString()) ? 6 : 1,
  }));

  // month plan: [year, monthIndex(0-based), orderCount, isCurrentMonth]
  const YEAR = 2026;
  const monthPlan = [
    { year: YEAR, month: 3, count: 12, current: false }, // April
    { year: YEAR, month: 4, count: 18, current: false }, // May
    { year: YEAR, month: 5, count: 15, current: false }, // June (dip)
    { year: YEAR, month: 6, count: 25, current: false }, // July
    { year: YEAR, month: 7, count: 35, current: false }, // August
    { year: YEAR, month: 8, count: 20, current: true, upToDay: 21 }, // September, partial
  ];

  function pickStatus(isCurrent) {
    const r = Math.random();
    if (!isCurrent) {
      // completed months: delivered or cancelled only
      return r < 0.85 ? 'delivered' : 'cancelled';
    }
    // current month: mixed
    if (r < 0.30) return 'delivered';
    if (r < 0.50) return 'shipped';
    if (r < 0.80) return 'pending';
    return 'cancelled';
  }

  const allOrders = [];
  const stockConsumed = {}; // bookId string -> total quantity consumed (non-cancelled only)
  let orderCounter = 1;

  for (const monthCfg of monthPlan) {
    for (let i = 0; i < monthCfg.count; i++) {
      const numItems = Math.random() < 0.5 ? 1 : Math.random() < 0.8 ? 2 : 3;
      const chosenBooks = [];
      const usedIds = new Set();
      while (chosenBooks.length < numItems) {
        const b = weightedPick(weightedBooks);
        if (!usedIds.has(b._id.toString())) {
          usedIds.add(b._id.toString());
          chosenBooks.push(b);
        }
        if (usedIds.size >= books.length) break; // safety
      }

      const items = chosenBooks.map((book) => {
        const quantity = Math.floor(Math.random() * 2) + 1; // 1-2 copies per line item
        const wasOnOffer = !!book.onOffer;
        const price = wasOnOffer ? book.offerPrice : book.price;
        return {
          id: book._id.toString(),
          title: book.title,
          price,
          image: book.image || '',
          quantity,
          wasOnOffer,
        };
      });

      const subtotal = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
      const deliveryFee = 150;
      const total = subtotal + deliveryFee;
      const status = pickStatus(monthCfg.current);
      const createdAt = randomDateInMonth(monthCfg.year, monthCfg.month, monthCfg.upToDay);

      if (status !== 'cancelled') {
        for (const it of items) {
          stockConsumed[it.id] = (stockConsumed[it.id] || 0) + it.quantity;
        }
      }

      allOrders.push({
        orderNumber: `ORD-SEED-${Date.now()}-${orderCounter++}`,
        items,
        customer: randomCustomer(),
        subtotal,
        deliveryFee,
        total,
        paymentMethod: 'Cash on Delivery',
        status,
        createdAt,
        updatedAt: createdAt,
      });
    }
  }

  await ordersCollection.insertMany(allOrders);
  console.log(`Inserted ${allOrders.length} seeded orders.`);

  // ---- stock reconciliation report ----
  console.log('\n--- Stock consumed per book (non-cancelled orders only) ---');
  const bookMap = new Map(books.map((b) => [b._id.toString(), b]));
  for (const [bookId, qty] of Object.entries(stockConsumed)) {
    const book = bookMap.get(bookId);
    const currentStock = book?.stock ?? 0;
    const suggestedNewStock = currentStock - qty;
    const warning = suggestedNewStock < 0 ? '  ⚠ WOULD GO NEGATIVE' : '';
    console.log(
      `${book?.title || bookId}: consumed ${qty}, current stock ${currentStock} → suggested new stock ${suggestedNewStock}${warning}`
    );
  }

  await mongoose.disconnect();
  console.log('\nDone.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
