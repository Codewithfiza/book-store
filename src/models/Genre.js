import mongoose from "mongoose";


const GenreSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Genre name is required'],
        trim: true,
        unique: true,
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    image: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default : '',
    },
}, 
{timestamps: true}
);


export default mongoose.models.Genre || mongoose.model('Genre', GenreSchema);