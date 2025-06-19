import mongoose, { Schema } from "mongoose";

const jobApplicationSchema = new Schema(
  {
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    // If user is logged in
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Guest applicant info (if user is not logged in)
    name: {
      type: String,
      required: function () {
        return !this.user;
      },
      trim: true,
    },

    email: {
      type: String,
      required: function () {
        return !this.user;
      },
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email"],
    },

    coverLetter: {
      type: String,
      required: [true, "Cover letter is required"],
      maxlength: 2000,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
