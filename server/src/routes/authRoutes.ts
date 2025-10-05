import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { wrap } from '../utils/wrap.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, wrap(getMe));

export default router;
