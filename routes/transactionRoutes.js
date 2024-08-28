import express from 'express';
import { transferFunds, getAllTransactions, getUserTransactions } from '../controllers/transactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/transfer', protect, transferFunds);
router.get('/all', protect, getAllTransactions); // Admin view
router.get('/user', protect, getUserTransactions); // User view

export default router;
