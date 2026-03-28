import mongoose from 'mongoose';

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            tls: true,
            tlsAllowInvalidCertificates: true,  // fixes SSL handshake issues
        });
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("DB connection failed:", error);
    }
};

export default connectToDb;