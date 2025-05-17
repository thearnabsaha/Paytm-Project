import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    balence: {
        type: Number,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password should be 8 characters long'],
        minlength: 8,
    }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);