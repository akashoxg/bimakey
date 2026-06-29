import Lead from '../models/Lead.js';
import { sendLeadNotification } from '../utils/emailService.js';
import { sendWhatsAppNotification } from '../utils/whatsappService.js';

const createLead = async (req, res, next) => {
  try {
    const { name, phone, email, insuranceType, message, whatsappConsent, source } = req.body;

    // Capture IP for rate limiting tracking
    const ipAddress = req.ip || req.connection.remoteAddress;

    const lead = await Lead.create({
      name,
      phone,
      email,
      insuranceType,
      message,
      whatsappConsent,
      source,
      ipAddress,
    });

    // Send email notification to admin asynchronously
    sendLeadNotification(lead).catch(err => console.error('Failed to send email notification:', err));

    // Send WhatsApp notification if consented
    if (whatsappConsent) {
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
  getLeads,
  updateLeadStatus,
};
