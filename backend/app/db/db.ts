import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log(`MongoDB Connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error('Your Error is: ', error);
        process.exit(1);
    }
};

export default connectDB;