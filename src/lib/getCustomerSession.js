import dbConnect from './mongodb';
import CustomerSession from '@/models/CustomerSession';

export async function getCustomerSessionFromRequest(request) {
  await dbConnect();

  const sessionId = request.cookies.get('customerSession')?.value;
  if (!sessionId) return null;

  const session = await CustomerSession.findOne({
    sessionId,
    expiresAt: { $gt: new Date() },
  });
  return session; // null if not found/expired, otherwise has { customerId, ... }
}