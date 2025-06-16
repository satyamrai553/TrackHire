import mongoose from 'mongoose';


//mongoDB connection logic
const DB_NAME = 'myDatabase'; // Replace with your actual database name

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process with failure
  }
}

export { connectDB };