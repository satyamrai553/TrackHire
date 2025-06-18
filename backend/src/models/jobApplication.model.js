import mongoose, { Schema } from "mongoose";

const jobApplicationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected", "Accepted"],
      default: "Applied",
    },

    appliedDate: {
      type: Date,
      required: [true, "Applied date is required"],
    },

    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    resumeLink: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          return !v || /^https?:\/\/.+/.test(v);
        },
        message: "Please enter a valid URL (starting with http or https)",
      },
    },
  },
  {
    timestamps: true,
  }
);

export const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);
