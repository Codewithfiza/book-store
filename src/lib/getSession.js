import dbConnect from './mongodb';
import Session from '@/models/Session';

export async function getSessionFromRequest(request) {
  await dbConnect();

  const sessionId = request.cookies.get('sessionId')?.value;
  if (!sessionId) return null;

  const session = await Session.findOne({ sessionId, expiresAt: { $gt: new Date() } });
  return session; // null if not found/expired, otherwise has { userId, role, ... }
}