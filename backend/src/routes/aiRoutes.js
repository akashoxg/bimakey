import express from 'express';
import { chatWithAI, getAIHealth } from '../controllers/aiController.js';

const router = express.Router();

// AI Chat endpoint - powered by GLM-5.1
router.post('/chat', chatWithAI);

// AI Health check
router.get('/health', getAIHealth);

export default router;
