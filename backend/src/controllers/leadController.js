import Lead from '../models/Lead.js';
import { sendLeadNotification, sendClaimNotification } from '../utils/emailService.js';
import { sendWhatsAppNotification } from '../utils/whatsappService.js';

const createLead = async (req, res, next) => {
  try {
    const { name, phone, email, insuranceType, message, whatsappConsent, source } = req.body;

    // Capture IP for rate limiting tracking
    const ipAddress = req.ip || req.connection.remoteAddress;

    let lead;
    try {
      lead = await Lead.create({
        name,
        phone,
        email,
        insuranceType,
        message,
        whatsappConsent,
        source,
        ipAddress,
      });
    } catch (dbError) {
      console.warn("Database storage failed (using fallback memory logging):", dbError.message);
      lead = {
        _id: `temp_${Date.now()}`,
        name,
        phone,
        email,
        insuranceType: insuranceType || 'general',
        message,
        whatsappConsent,
        source,
      };
    }

    // Send email notification to admin asynchronously
    sendLeadNotification(lead).catch(err => console.error('Failed to send email notification:', err));

    // Send WhatsApp notification if consented
    if (whatsappConsent !== false) {
      sendWhatsAppNotification(lead).catch(err => console.error('Failed to send WhatsApp notification:', err));
    }

    res.status(201).json({
      success: true,
      message: 'Consultation booked successfully! We\'ll contact you within 24 hours.',
      data: {
        id: lead._id,
        name: lead.name,
        phone: lead.phone,
        insuranceType: lead.insuranceType,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Submit claim form - sends email notification
const submitClaimForm = async (req, res, next) => {
  try {
    const { claimType, name, phone, email, ...otherFields } = req.body;

    // Validate required fields
    if (!name || !phone || !email || !claimType) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, email, and claim type are required.',
      });
    }

    // Create a lead record for this claim form
    let lead;
    try {
      lead = await Lead.create({
        name,
        phone,
        email,
        insuranceType: claimType,
        claimType,
        source: 'claim-assistance',
        ipAddress: req.ip || req.connection.remoteAddress,
        ...otherFields,
      });
    } catch (dbError) {
      console.warn("Claim DB storage failed (using fallback memory logging):", dbError.message);
      lead = {
        _id: `temp_claim_${Date.now()}`,
        name,
        phone,
        email,
        claimType,
      };
    }

    // Send formatted claim notification email to Jitendrapoc@gmail.com
    sendClaimNotification(req.body).catch(err => 
      console.error('Failed to send claim notification email:', err)
    );

    res.status(201).json({
      success: true,
      message: 'Your claim assistance request has been submitted. We\'ll contact you within 30 minutes!',
      data: {
        id: lead._id,
        name: lead.name,
        phone: lead.phone,
        claimType: lead.claimType,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getLeads = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const query = {};
    if (status) {
      query.status = status;
    }

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Lead.countDocuments(query);

    res.status(200).json({
      success: true,
      count: leads.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

const updateLeadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Lead not found',
      });
    }

    res.status(200).json({
      success: true,
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

export {
  createLead,
  submitClaimForm,
  getLeads,
  updateLeadStatus,
};
