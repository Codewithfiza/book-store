import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: 100,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: 400,
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);