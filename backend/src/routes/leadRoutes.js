import express from 'express';
import { createLead, getLeads, updateLeadStatus } from '../controllers/leadController.js';
import { validateLead } from '../middleware/validate.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.route('/')
  .post(validateLead, createLead);

// Protected routes (admin)
router.use('/admin', authMiddleware);
router.route('/admin/leads')
  .get(getLeads);
router.patch('/admin/leads/:id/status', updateLeadStatus);

export default router;
