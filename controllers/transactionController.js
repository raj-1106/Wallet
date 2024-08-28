import Transaction from '../models/transactionModel.js';
import User from '../models/userModel.js';
import { sendTransactionEmail } from '../utils/sendEmail.js';

// Transfer Funds
export const transferFunds = async (req, res) => {
  const { receiverEmail, amount } = req.body;

  try {
    const sender = await User.findById(req.user.id);
    const receiver = await User.findOne({ email: receiverEmail });

    if (!receiver) {
      return res.status(404).json({ message: 'Receiver not found' });
    }

    if (sender.balance < amount) {
      sendTransactionEmail(sender.email, 'failed', amount);
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const transaction = await Transaction.create({
      sender: sender._id,
      receiver: receiver._id,
      amount,
    });

    sendTransactionEmail(sender.email, 'success', amount);
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Transactions (Admin View)
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate('sender receiver', 'name email');
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get User Transactions
export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ $or: [{ sender: req.user.id }, { receiver: req.user.id }] });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
