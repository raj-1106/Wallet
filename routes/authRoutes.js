import express from 'express';
import { registerUser, loginUser, verifyUserEmail } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify/:id', verifyUserEmail);

export default router;
