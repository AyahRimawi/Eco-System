import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      console.log('Already connected to MongoDB');
      return;
    }
    const uri = process.env.MONGODB_URI || 'mongodb+srv://bn7bkn:dZj6eiruj3JnznzO@attout.n2ukx.mongodb.net/trees?retryWrites=true&w=majority&appName=attout';

    if (!uri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }

    console.log('Connecting to MongoDB...');
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

export default connectDB;