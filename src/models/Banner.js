import mongoose from "mongoose";


const BannerSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
     subtitle: {
      type: String,
      default: '',
    },
     discountPercent: {
      type: Number,
      required: [true, 'Discount percent is required'],
      min: 0,
      max: 100,
    },
    imageDesktop: {
      type: String,
      default: '',
    },
    imageMobile: {
      type: String,
      default: '',
    },
     endDate: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  
}, {timestamps: true});

export default mongoose.models.Banner || mongoose.model('Banner', BannerSchema);