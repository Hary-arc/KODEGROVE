import express from 'express';
import { createSubscriber, listSubscribers } from '../controllers/subscriberController.js';
const router = express.Router();
router.post('/', createSubscriber);
router.get('/', listSubscribers);
export default router;
