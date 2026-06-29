import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
  },
  insuranceType: {
    type: String,
    required: [true, 'Insurance type is required'],
    enum: {
      values: ['health', 'term', 'motor', 'other'],
      message: 'Invalid insurance type',
    },
  },
  message: {
    type: String,
    default: '',
    maxlength: [1000, 'Message cannot exceed 1000 characters'],
  },
  whatsappConsent: {
    type: Boolean,
    default: true,
  },
  source: {
    type: String,
    default: 'website',
    maxlength: [100, 'Source cannot exceed 100 characters'],
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'closed'],
    default: 'new',
  },
  ipAddress: {
    type: String,
  },
}, {
  timestamps: true,
});

// Index for efficient querying
leadSchema.index({ status: 1, createdAt: -1 });
leadSchema.index({ phone: 1 });
leadSchema.index({ email: 1 });

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
