  import mongoose, { Schema } from "mongoose";

  const jobSchema = new Schema({
    companyName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship', 'contract', 'freelance'],
      default: 'full-time',
    },
    location: {
      type: String,
      required: true,
    },
    applicationLink: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",   
      required: true,
    },
  }, {
    timestamps: true,
  });

  export const Job = mongoose.model("Job", jobSchema);
