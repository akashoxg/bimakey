/**
 * Validation middleware for lead submissions
 */
export const validateLead = (req, res, next) => {
  const { name, phone, email, insuranceType } = req.body;
  const errors = [];

  // Name validation
  if (!name || typeof name !== 'string') {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  } else if (name.trim().length > 100) {
    errors.push({ field: 'name', message: 'Name cannot exceed 100 characters' });
  }

  // Phone validation (Indian mobile numbers)
  if (!phone || typeof phone !== 'string') {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else if (!/^[6-9]\d{9}$/.test(phone)) {
    errors.push({ field: 'phone', message: 'Enter a valid 10-digit Indian mobile number' });
  }

  // Email validation
  if (!email || typeof email !== 'string') {
    errors.push({ field: 'email', message: 'Email is required' });
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.push({ field: 'email', message: 'Enter a valid email address' });
  }

  // Insurance type validation
  const validTypes = ['health', 'term', 'motor', 'other'];
  if (!insuranceType || !validTypes.includes(insuranceType)) {
    errors.push({ field: 'insuranceType', message: 'Select a valid insurance type' });
  }

  // Message length validation (optional field)
  if (req.body.message && req.body.message.length > 1000) {
    errors.push({ field: 'message', message: 'Message cannot exceed 1000 characters' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors,
    });
  }

  next();
};
