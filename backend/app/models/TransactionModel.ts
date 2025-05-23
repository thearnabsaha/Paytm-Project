import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

export const Transaction = mongoose.model('Transaction', TransactionSchema);