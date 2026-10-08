import mongoose from "mongoose";


const FeaturedBookSchema = new mongoose.Schema({
     book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "Book reference is required"],
      unique: true, // a book can only be featured once
    },
     order: {
      type: Number,
      required: true,
      default: 0,
    },
}, {timestamps: true});


export default mongoose.models.FeaturedBook ||
  mongoose.model("FeaturedBook", FeaturedBookSchema);