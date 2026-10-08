import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    role:{
        type: String,
        enum:  ['admin', 'viewer'],
        required: true,
    },
    expiresAt:{
        type:Date,
        required: true,
        expires: 0, // This will automatically delete the document when the date is reached
    }

},{timestamps: true});

export default mongoose.models.Session || mongoose.model('Session', SessionSchema);  