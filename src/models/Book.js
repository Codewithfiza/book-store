import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'reviewer name is required'],
        trim: true,
    },
    rating: {
        type: Number,
        required: true,
        min:1,
        max: 5,
    },
    comment: {
        type: String,
        required: [true, 'comment is required'],
        trim: true,
    },
},
{timestamps: true}
);



const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, 'autor is required'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "price is required"],
        min: 0,
    },
    image: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    slug:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
 stock: {
  type: Number,
  required: [true, 'stock is required'],
  min: [0, 'stock cannot be negative'],
  default: 20,
  validate: { validator: Number.isInteger, message: 'stock must be a whole number' },
},
onOffer: {
    type: Boolean,
    default: false,
},
offerPrice: {
    type: Number,
    min: 0,
    validate: {
        validator: function(value) {
            if (!this.onOffer) return true; // no offerPrice needed if not on offer
            return value != null && value < this.price;
        },
        message: 'offerPrice must be set and less than the regular price when onOffer is true',
    },
},
    genre:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: [true, 'Genre is required'],
    },
    reviews: [ReviewSchema],

},
{timestamps: true}

)

export default mongoose.models.Book || mongoose.model('Book', BookSchema);