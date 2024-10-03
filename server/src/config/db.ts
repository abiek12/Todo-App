import mongoose from 'mongoose';

const connectDB = async () => {
  try {    
    await mongoose.connect(process.env.MONGO_URI!)
    console.log('MongoDB connected...');
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
