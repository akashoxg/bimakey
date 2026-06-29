import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Shield, FileText, Car, Heart, FileCheck, Building, CheckCircle, Loader2, AlertCircle, Clock, ArrowLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/shared/Breadcrumb';
import { BRAND, getWhatsAppUrl } from '../utils/constants';
import { submitClaimForm } from '../utils/api';

// Callback Time Options
const callbackTimeOptions = [
  { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM - 4 PM)' },
  { value: 'evening', label: 'Evening (4 PM - 7 PM)' },
  { value: 'anytime', label: 'Anytime (9 AM - 7 PM)' },
];

// Claim Types with their icons and colors
const claimTypes = [
  {
    value: 'health-claim',
    label: 'Health Insurance Claim',
    icon: Heart,
    description: 'Cashless or reimbursement claims for medical treatments',
    color: 'teal',
  },
  {
    value: 'motor-claim',
    label: 'Motor Insurance Claim',
    icon: Car,
    description: 'Accident damage, theft, or third-party claims',
    color: 'blue',
  },
  {
    value: 'life-claim',
    label: 'Life Insurance Claim',
    icon: Shield,
    description: 'Death claim or maturity benefits',
    color: 'navy',
  },
  {
    value: 'policy-issue',
    label: 'Policy Related Issue',
    icon: FileText,
    description: 'Policy cancellation, modification, or document requests',
    color: 'amber',
  },
  {
    value: 'renewal-help',
    label: 'Renewal Assistance',
    icon: Building,
    description: 'Help with policy renewal or porting',
    color: 'green',
  },
  {
    value: 'other',
    label: 'Other Query',
    icon: FileCheck,
    description: 'Any other insurance-related assistance',
    color: 'gray',
  },
];

// Common fields for all forms
const commonFields = (errors, register) => (
  <>
    {/* Name */}
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-brand-navy mb-1.5">
        Full Name <span className="text-brand-red">*</span>
      </label>
      <input
        id="name"
        type="text"
        placeholder="Your full name…"
        autoComplete="name"
        {...register('name')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.name ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm`}
      />
      {errors.name && <p className="text-xs text-brand-red mt-1">{errors.name.message}</p>}
    </div>

    {/* Phone */}
    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-brand-navy mb-1.5">
        Phone Number <span className="text-brand-red">*</span>
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-brand-text-secondary font-data">
          +91
        </span>
        <input
          id="phone"
          type="tel"
          placeholder="98765 43210…"
          inputMode="numeric"
          autoComplete="tel"
          {...register('phone')}
          className={`flex-1 px-4 py-3 rounded-r-xl border ${
            errors.phone ? 'border-brand-red' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm`}
        />
      </div>
      {errors.phone && <p className="text-xs text-brand-red mt-1">{errors.phone.message}</p>}
    </div>

    {/* Email */}
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-brand-navy mb-1.5">
        Email Address <span className="text-brand-red">*</span>
      </label>
      <input
        id="email"
        type="email"
        placeholder="you@email.com…"
        autoComplete="email"
        {...register('email')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.email ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm`}
      />
      {errors.email && <p className="text-xs text-brand-red mt-1">{errors.email.message}</p>}
    </div>

    {/* Policy Details Row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="insurerName" className="block text-sm font-medium text-brand-navy mb-1.5">
          Insurance Company <span className="text-brand-text-secondary">(optional)</span>
        </label>
        <input
          id="insurerName"
          type="text"
          placeholder="e.g., HDFC Ergo, ICICI Lombard…"
          {...register('insurerName')}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm"
        />
      </div>

      <div>
        <label htmlFor="policyNumber" className="block text-sm font-medium text-brand-navy mb-1.5">
          Policy Number <span className="text-brand-text-secondary">(optional)</span>
        </label>
        <input
          id="policyNumber"
          type="text"
          placeholder="e.g., HDFC/123456…"
          {...register('policyNumber')}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm"
        />
      </div>
    </div>

    {/* Callback Time */}
    <div>
      <label htmlFor="callbackTime" className="block text-sm font-medium text-brand-navy mb-1.5">
        Preferred Callback Time <span className="text-brand-red">*</span>
      </label>
      <select
        id="callbackTime"
        {...register('callbackTime')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.callbackTime ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
      >
        <option value="">Select preferred time…</option>
        {callbackTimeOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {errors.callbackTime && <p className="text-xs text-brand-red mt-1">{errors.callbackTime.message}</p>}
    </div>

    {/* Message */}
    <div>
      <label htmlFor="message" className="block text-sm font-medium text-brand-navy mb-1.5">
        Additional Details <span className="text-brand-text-secondary">(optional)</span>
      </label>
      <textarea
        id="message"
        rows={3}
        placeholder="Any additional information you'd like to share…"
        {...register('message')}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm resize-none"
      />
    </div>
  </>
);

// Form Components for each claim type
const HealthClaimForm = ({ errors, register, claimStatusOptions }) => (
  <>
    {commonFields(errors, register)}
    
    {/* Claim Status */}
    <div>
      <label htmlFor="claimStatus" className="block text-sm font-medium text-brand-navy mb-1.5">
        Claim Status <span className="text-brand-red">*</span>
      </label>
      <select
        id="claimStatus"
        {...register('claimStatus')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.claimStatus ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
      >
        <option value="">Select claim status…</option>
        {claimStatusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {errors.claimStatus && <p className="text-xs text-brand-red mt-1">{errors.claimStatus.message}</p>}
    </div>

    {/* Claim Type */}
    <div>
      <label htmlFor="healthClaimType" className="block text-sm font-medium text-brand-navy mb-1.5">
        Claim Type <span className="text-brand-red">*</span>
      </label>
      <select
        id="healthClaimType"
        {...register('healthClaimType')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.healthClaimType ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
      >
        <option value="">Select claim type…</option>
        <option value="cashless">Cashless Treatment</option>
        <option value="reimbursement">Reimbursement Claim</option>
      </select>
      {errors.healthClaimType && <p className="text-xs text-brand-red mt-1">{errors.healthClaimType.message}</p>}
    </div>

    {/* Hospital Name */}
    <div>
      <label htmlFor="hospitalName" className="block text-sm font-medium text-brand-navy mb-1.5">
        Hospital Name <span className="text-brand-red">*</span>
      </label>
      <input
        id="hospitalName"
        type="text"
        placeholder="Name of the hospital…"
        {...register('hospitalName')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.hospitalName ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm`}
      />
      {errors.hospitalName && <p className="text-xs text-brand-red mt-1">{errors.hospitalName.message}</p>}
    </div>

    {/* Treatment Type and Amount */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="treatmentType" className="block text-sm font-medium text-brand-navy mb-1.5">
          Treatment Type <span className="text-brand-red">*</span>
        </label>
        <input
          id="treatmentType"
          type="text"
          placeholder="e.g., Surgery, Chemotherapy…"
          {...register('treatmentType')}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.treatmentType ? 'border-brand-red' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm`}
        />
        {errors.treatmentType && <p className="text-xs text-brand-red mt-1">{errors.treatmentType.message}</p>}
      </div>

      <div>
        <label htmlFor="estimatedAmount" className="block text-sm font-medium text-brand-navy mb-1.5">
          Estimated Amount (₹)
        </label>
        <input
          id="estimatedAmount"
          type="text"
          placeholder="e.g., 150000"
          {...register('estimatedAmount')}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm"
        />
      </div>
    </div>

    {/* Admission Date */}
    <div>
      <label htmlFor="admissionDate" className="block text-sm font-medium text-brand-navy mb-1.5">
        Admission Date / Treatment Start Date
      </label>
      <input
        id="admissionDate"
        type="date"
        {...register('admissionDate')}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm"
      />
    </div>
  </>
);

const MotorClaimForm = ({ errors, register, claimStatusOptions }) => (
  <>
    {commonFields(errors, register)}
    
    {/* Claim Status */}
    <div>
      <label htmlFor="claimStatus" className="block text-sm font-medium text-brand-navy mb-1.5">
        Claim Status <span className="text-brand-red">*</span>
      </label>
      <select
        id="claimStatus"
        {...register('claimStatus')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.claimStatus ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
      >
        <option value="">Select claim status…</option>
        {claimStatusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {errors.claimStatus && <p className="text-xs text-brand-red mt-1">{errors.claimStatus.message}</p>}
    </div>

    {/* Vehicle Number */}
    <div>
      <label htmlFor="vehicleNumber" className="block text-sm font-medium text-brand-navy mb-1.5">
        Vehicle Number <span className="text-brand-red">*</span>
      </label>
      <input
        id="vehicleNumber"
        type="text"
        placeholder="e.g., DL 01 AB 1234"
        {...register('vehicleNumber')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.vehicleNumber ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm uppercase`}
      />
      {errors.vehicleNumber && <p className="text-xs text-brand-red mt-1">{errors.vehicleNumber.message}</p>}
    </div>

    {/* Claim Type */}
    <div>
      <label htmlFor="motorClaimType" className="block text-sm font-medium text-brand-navy mb-1.5">
        Claim Type <span className="text-brand-red">*</span>
      </label>
      <select
        id="motorClaimType"
        {...register('motorClaimType')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.motorClaimType ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
      >
        <option value="">Select claim type…</option>
        <option value="own-damage">Own Damage (OD)</option>
        <option value="third-party">Third Party Liability</option>
        <option value="theft">Theft/Total Loss</option>
        <option value="windshield">Windshield Damage</option>
      </select>
      {errors.motorClaimType && <p className="text-xs text-brand-red mt-1">{errors.motorClaimType.message}</p>}
    </div>

    {/* Accident Date and Location */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="accidentDate" className="block text-sm font-medium text-brand-navy mb-1.5">
          Date of Incident <span className="text-brand-red">*</span>
        </label>
        <input
          id="accidentDate"
          type="date"
          {...register('accidentDate')}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.accidentDate ? 'border-brand-red' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm`}
        />
        {errors.accidentDate && <p className="text-xs text-brand-red mt-1">{errors.accidentDate.message}</p>}
      </div>

      <div>
        <label htmlFor="accidentLocation" className="block text-sm font-medium text-brand-navy mb-1.5">
          Location of Incident
        </label>
        <input
          id="accidentLocation"
          type="text"
          placeholder="Where did it happen?"
          {...register('accidentLocation')}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm"
        />
      </div>
    </div>

    {/* FIR Details */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="firRegistered" className="block text-sm font-medium text-brand-navy mb-1.5">
          Police FIR Registered? <span className="text-brand-red">*</span>
        </label>
        <select
          id="firRegistered"
          {...register('firRegistered')}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.firRegistered ? 'border-brand-red' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
        >
          <option value="">Select…</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="na">Not Applicable</option>
        </select>
        {errors.firRegistered && <p className="text-xs text-brand-red mt-1">{errors.firRegistered.message}</p>}
      </div>

      <div>
        <label htmlFor="firNumber" className="block text-sm font-medium text-brand-navy mb-1.5">
          FIR Number
        </label>
        <input
          id="firNumber"
          type="text"
          placeholder="Police Station & FIR No."
          {...register('firNumber')}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm"
        />
      </div>
    </div>

    {/* Damage Description */}
    <div>
      <label htmlFor="damageDescription" className="block text-sm font-medium text-brand-navy mb-1.5">
        Brief Description of Damage
      </label>
      <textarea
        id="damageDescription"
        rows={3}
        placeholder="Describe what happened and the damage caused…"
        {...register('damageDescription')}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm resize-none"
      />
    </div>
  </>
);

const LifeClaimForm = ({ errors, register }) => (
  <>
    {/* Policy Holder Name */}
    <div>
      <label htmlFor="policyHolderName" className="block text-sm font-medium text-brand-navy mb-1.5">
        Policy Holder Name <span className="text-brand-red">*</span>
      </label>
      <input
        id="policyHolderName"
        type="text"
        placeholder="Full name of the policy holder…"
        {...register('policyHolderName')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.policyHolderName ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm`}
      />
      {errors.policyHolderName && <p className="text-xs text-brand-red mt-1">{errors.policyHolderName.message}</p>}
    </div>

    {commonFields(errors, register)}
    
    {/* Claim Type */}
    <div>
      <label htmlFor="lifeClaimType" className="block text-sm font-medium text-brand-navy mb-1.5">
        Claim Type <span className="text-brand-red">*</span>
      </label>
      <select
        id="lifeClaimType"
        {...register('lifeClaimType')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.lifeClaimType ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
      >
        <option value="">Select claim type…</option>
        <option value="death">Death Claim</option>
        <option value="maturity">Maturity Benefit</option>
        <option value="surrender">Surrender Value</option>
        <option value="survival">Survival Benefit</option>
      </select>
      {errors.lifeClaimType && <p className="text-xs text-brand-red mt-1">{errors.lifeClaimType.message}</p>}
    </div>

    {/* Date of Incident */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label htmlFor="incidentDate" className="block text-sm font-medium text-brand-navy mb-1.5">
          Date of Incident <span className="text-brand-red">*</span>
        </label>
        <input
          id="incidentDate"
          type="date"
          {...register('incidentDate')}
          className={`w-full px-4 py-3 rounded-xl border ${
            errors.incidentDate ? 'border-brand-red' : 'border-gray-200'
          } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm`}
        />
        {errors.incidentDate && <p className="text-xs text-brand-red mt-1">{errors.incidentDate.message}</p>}
      </div>

      <div>
        <label htmlFor="causeOfDeath" className="block text-sm font-medium text-brand-navy mb-1.5">
          Cause / Reason
        </label>
        <input
          id="causeOfDeath"
          type="text"
          placeholder="Brief cause…"
          {...register('causeOfDeath')}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm"
        />
      </div>
    </div>

    {/* Nominee Details */}
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <h4 className="font-semibold text-brand-navy mb-3 text-sm">Nominee Details</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="nomineeName" className="block text-sm font-medium text-brand-navy mb-1.5">
            Nominee Name <span className="text-brand-red">*</span>
          </label>
          <input
            id="nomineeName"
            type="text"
            placeholder="Nominee's full name"
            {...register('nomineeName')}
            className={`w-full px-3 py-2.5 rounded-lg border ${
              errors.nomineeName ? 'border-brand-red' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm`}
          />
          {errors.nomineeName && <p className="text-xs text-brand-red mt-1">{errors.nomineeName.message}</p>}
        </div>

        <div>
          <label htmlFor="nomineeRelationship" className="block text-sm font-medium text-brand-navy mb-1.5">
            Relationship <span className="text-brand-red">*</span>
          </label>
          <select
            id="nomineeRelationship"
            {...register('nomineeRelationship')}
            className={`w-full px-3 py-2.5 rounded-lg border ${
              errors.nomineeRelationship ? 'border-brand-red' : 'border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
          >
            <option value="">Select…</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="parent">Parent</option>
            <option value="sibling">Sibling</option>
            <option value="other">Other</option>
          </select>
          {errors.nomineeRelationship && <p className="text-xs text-brand-red mt-1">{errors.nomineeRelationship.message}</p>}
        </div>

        <div>
          <label htmlFor="nomineePhone" className="block text-sm font-medium text-brand-navy mb-1.5">
            Nominee Phone
          </label>
          <input
            id="nomineePhone"
            type="tel"
            placeholder="Nominee's phone"
            {...register('nomineePhone')}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm"
          />
        </div>
      </div>
    </div>
  </>
);

const PolicyIssueForm = ({ errors, register }) => (
  <>
    {commonFields(errors, register)}
    
    {/* Issue Type */}
    <div>
      <label htmlFor="issueType" className="block text-sm font-medium text-brand-navy mb-1.5">
        Issue Type <span className="text-brand-red">*</span>
      </label>
      <select
        id="issueType"
        {...register('issueType')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.issueType ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
      >
        <option value="">Select issue type…</option>
        <option value="cancellation">Policy Cancellation</option>
        <option value="modification">Policy Modification</option>
        <option value="document-request">Document Request</option>
        <option value="name-correction">Name Correction</option>
        <option value="address-change">Address Change</option>
        <option value="nominee-change">Nominee Change</option>
        <option value="other">Other</option>
      </select>
      {errors.issueType && <p className="text-xs text-brand-red mt-1">{errors.issueType.message}</p>}
    </div>

    {/* Description */}
    <div>
      <label htmlFor="issueDescription" className="block text-sm font-medium text-brand-navy mb-1.5">
        Describe Your Issue <span className="text-brand-red">*</span>
      </label>
      <textarea
        id="issueDescription"
        rows={4}
        placeholder="Please describe the issue in detail and what you'd like us to help with…"
        {...register('issueDescription')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.issueDescription ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm resize-none`}
      />
      {errors.issueDescription && <p className="text-xs text-brand-red mt-1">{errors.issueDescription.message}</p>}
    </div>
  </>
);

const RenewalForm = ({ errors, register }) => (
  <>
    {commonFields(errors, register)}
    
    {/* Current Expiry Date */}
    <div>
      <label htmlFor="expiryDate" className="block text-sm font-medium text-brand-navy mb-1.5">
        Policy Expiry Date
      </label>
      <input
        id="expiryDate"
        type="date"
        {...register('expiryDate')}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm"
      />
    </div>

    {/* Renewal Reason */}
    <div>
      <label htmlFor="renewalReason" className="block text-sm font-medium text-brand-navy mb-1.5">
        How Can We Help? <span className="text-brand-red">*</span>
      </label>
      <select
        id="renewalReason"
        {...register('renewalReason')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.renewalReason ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
      >
        <option value="">Select reason…</option>
        <option value="renewal">Policy Renewal Assistance</option>
        <option value="porting">Port to New Plan</option>
        <option value="upgrade">Upgrade Coverage</option>
        <option value="compare">Compare Other Plans</option>
        <option value="other">Other</option>
      </select>
      {errors.renewalReason && <p className="text-xs text-brand-red mt-1">{errors.renewalReason.message}</p>}
    </div>

    {/* Additional Info */}
    <div>
      <label htmlFor="additionalInfo" className="block text-sm font-medium text-brand-navy mb-1.5">
        Additional Information
      </label>
      <textarea
        id="additionalInfo"
        rows={3}
        placeholder="Any specific requirements or questions about your renewal…"
        {...register('additionalInfo')}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm resize-none"
      />
    </div>
  </>
);

const OtherQueryForm = ({ errors, register }) => (
  <>
    {commonFields(errors, register)}
    
    {/* Insurance Type */}
    <div>
      <label htmlFor="insuranceType" className="block text-sm font-medium text-brand-navy mb-1.5">
        Insurance Type
      </label>
      <select
        id="insuranceType"
        {...register('insuranceType')}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white"
      >
        <option value="">Select type…</option>
        <option value="health">Health Insurance</option>
        <option value="term">Term Life Insurance</option>
        <option value="motor">Motor Insurance</option>
        <option value="other">Other</option>
      </select>
    </div>

    {/* Query Type */}
    <div>
      <label htmlFor="queryType" className="block text-sm font-medium text-brand-navy mb-1.5">
        Query Type <span className="text-brand-red">*</span>
      </label>
      <select
        id="queryType"
        {...register('queryType')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.queryType ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
      >
        <option value="">Select query type…</option>
        <option value="information">General Information</option>
        <option value="comparison">Plan Comparison</option>
        <option value="recommendation">Plan Recommendation</option>
        <option value="pricing">Premium/Pricing Query</option>
        <option value="coverage">Coverage Query</option>
        <option value="other">Other</option>
      </select>
      {errors.queryType && <p className="text-xs text-brand-red mt-1">{errors.queryType.message}</p>}
    </div>

    {/* Query Description */}
    <div>
      <label htmlFor="queryDescription" className="block text-sm font-medium text-brand-navy mb-1.5">
        Your Query <span className="text-brand-red">*</span>
      </label>
      <textarea
        id="queryDescription"
        rows={4}
        placeholder="Please describe your question or concern in detail…"
        {...register('queryDescription')}
        className={`w-full px-4 py-3 rounded-xl border ${
          errors.queryDescription ? 'border-brand-red' : 'border-gray-200'
        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm resize-none`}
      />
      {errors.queryDescription && <p className="text-xs text-brand-red mt-1">{errors.queryDescription.message}</p>}
    </div>
  </>
);

// Schemas for each form type
const schemas = {
  'health-claim': z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
    email: z.string().email('Enter a valid email address'),
    insurerName: z.string().optional(),
    policyNumber: z.string().optional(),
    callbackTime: z.string().min(1, 'Please select preferred callback time'),
    message: z.string().optional(),
    claimStatus: z.string().min(1, 'Please select claim status'),
    healthClaimType: z.string().min(1, 'Please select claim type'),
    hospitalName: z.string().min(1, 'Hospital name is required'),
    treatmentType: z.string().min(1, 'Treatment type is required'),
    estimatedAmount: z.string().optional(),
    admissionDate: z.string().optional(),
  }),
  'motor-claim': z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
    email: z.string().email('Enter a valid email address'),
    insurerName: z.string().optional(),
    policyNumber: z.string().optional(),
    callbackTime: z.string().min(1, 'Please select preferred callback time'),
    message: z.string().optional(),
    claimStatus: z.string().min(1, 'Please select claim status'),
    vehicleNumber: z.string().min(1, 'Vehicle number is required'),
    motorClaimType: z.string().min(1, 'Please select claim type'),
    accidentDate: z.string().min(1, 'Date of incident is required'),
    accidentLocation: z.string().optional(),
    firRegistered: z.string().min(1, 'Please select FIR status'),
    firNumber: z.string().optional(),
    damageDescription: z.string().optional(),
  }),
  'life-claim': z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
    email: z.string().email('Enter a valid email address'),
    insurerName: z.string().optional(),
    policyNumber: z.string().optional(),
    callbackTime: z.string().min(1, 'Please select preferred callback time'),
    message: z.string().optional(),
    policyHolderName: z.string().min(1, 'Policy holder name is required'),
    lifeClaimType: z.string().min(1, 'Please select claim type'),
    incidentDate: z.string().min(1, 'Date of incident is required'),
    causeOfDeath: z.string().optional(),
    nomineeName: z.string().min(1, 'Nominee name is required'),
    nomineeRelationship: z.string().min(1, 'Relationship is required'),
    nomineePhone: z.string().optional(),
  }),
  'policy-issue': z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
    email: z.string().email('Enter a valid email address'),
    insurerName: z.string().optional(),
    policyNumber: z.string().optional(),
    callbackTime: z.string().min(1, 'Please select preferred callback time'),
    message: z.string().optional(),
    issueType: z.string().min(1, 'Please select issue type'),
    issueDescription: z.string().min(1, 'Please describe your issue'),
  }),
  'renewal-help': z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
    email: z.string().email('Enter a valid email address'),
    insurerName: z.string().optional(),
    policyNumber: z.string().optional(),
    callbackTime: z.string().min(1, 'Please select preferred callback time'),
    message: z.string().optional(),
    expiryDate: z.string().optional(),
    renewalReason: z.string().min(1, 'Please select how we can help'),
    additionalInfo: z.string().optional(),
  }),
  'other': z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
    email: z.string().email('Enter a valid email address'),
    insurerName: z.string().optional(),
    policyNumber: z.string().optional(),
    callbackTime: z.string().min(1, 'Please select preferred callback time'),
    message: z.string().optional(),
    insuranceType: z.string().optional(),
    queryType: z.string().min(1, 'Please select query type'),
    queryDescription: z.string().min(1, 'Please describe your query'),
  }),
};

// Claim status options
const claimStatusOptions = [
  { value: 'not-started', label: 'Not Started Yet' },
  { value: 'in-progress', label: 'Claim In Progress' },
  { value: 'rejected', label: 'Claim Rejected' },
  { value: 'query', label: 'Just Have a Query' },
];

const ClaimAssistance = () => {
  const [selectedClaimType, setSelectedClaimType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemas[selectedClaimType?.value] || schemas['other']),
    defaultValues: {
      name: '', phone: '', email: '', insurerName: '', policyNumber: '',
      callbackTime: '', message: '', claimStatus: '', healthClaimType: '',
      hospitalName: '', treatmentType: '', estimatedAmount: '', admissionDate: '',
      vehicleNumber: '', motorClaimType: '', accidentDate: '', accidentLocation: '',
      firRegistered: '', firNumber: '', damageDescription: '',
      policyHolderName: '', lifeClaimType: '', incidentDate: '', causeOfDeath: '',
      nomineeName: '', nomineeRelationship: '', nomineePhone: '',
      issueType: '', issueDescription: '',
      expiryDate: '', renewalReason: '', additionalInfo: '',
      insuranceType: '', queryType: '', queryDescription: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setIsError(false);
    
    const result = await submitClaimForm({ ...data, claimType: selectedClaimType.value });
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      toast.success('Request submitted! We\'ll contact you soon.');
    } else {
      setFallbackUrl(result.fallbackUrl);
      setIsError(true);
      toast.error('Server unavailable. Please connect via WhatsApp.');
    }
  };

  const handleClaimTypeSelect = (type) => {
    setSelectedClaimType(type);
    reset();
    setIsSuccess(false);
    setIsError(false);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsError(false);
    setSelectedClaimType(null);
    reset();
  };

  const handleBack = () => {
    setSelectedClaimType(null);
    reset();
  };

  // Render form based on selected claim type
  const renderForm = () => {
    switch (selectedClaimType?.value) {
      case 'health-claim':
        return <HealthClaimForm errors={errors} register={register} claimStatusOptions={claimStatusOptions} />;
      case 'motor-claim':
        return <MotorClaimForm errors={errors} register={register} claimStatusOptions={claimStatusOptions} />;
      case 'life-claim':
        return <LifeClaimForm errors={errors} register={register} />;
      case 'policy-issue':
        return <PolicyIssueForm errors={errors} register={register} />;
      case 'renewal-help':
        return <RenewalForm errors={errors} register={register} />;
      case 'other':
        return <OtherQueryForm errors={errors} register={register} />;
      default:
        return null;
    }
  };

  const getFormTitle = () => {
    switch (selectedClaimType?.value) {
      case 'health-claim':
        return 'Health Insurance Claim Assistance';
      case 'motor-claim':
        return 'Motor Insurance Claim Assistance';
      case 'life-claim':
        return 'Life Insurance Claim Assistance';
      case 'policy-issue':
        return 'Policy Related Issue';
      case 'renewal-help':
        return 'Renewal Assistance';
      case 'other':
        return 'Other Query';
      default:
        return 'Claim Assistance';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-brand-teal-light/30 to-transparent">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Claim Assistance', href: '/claim-assistance' }]} />
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-4">
              Claim Assistance
            </h1>
            <p className="text-xl text-brand-text-secondary leading-relaxed">
              Need help with an insurance claim? Our experts will guide you through the process, help with documentation, and ensure you get the support you deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Claim Types Selection */}
      {!selectedClaimType && !isSuccess && !isError && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-container mx-auto px-4 md:px-8">
            <h2 className="font-display font-bold text-2xl text-brand-navy mb-8 text-center">
              What type of assistance do you need?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {claimTypes.map((type) => (
                <motion.button
                  key={type.value}
                  type="button"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleClaimTypeSelect(type)}
                  className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                    type.color === 'teal' ? 'border-brand-teal/20 bg-brand-teal-light/20 hover:border-brand-teal hover:bg-brand-teal-light/30' :
                    type.color === 'blue' ? 'border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100' :
                    type.color === 'navy' ? 'border-brand-navy/20 bg-brand-navy/5 hover:border-brand-navy hover:bg-brand-navy/10' :
                    type.color === 'amber' ? 'border-amber-200 bg-amber-50 hover:border-amber-400 hover:bg-amber-100' :
                    type.color === 'green' ? 'border-green-200 bg-green-50 hover:border-green-400 hover:bg-green-100' :
                    'border-gray-200 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    type.color === 'teal' ? 'bg-brand-teal/20' :
                    type.color === 'blue' ? 'bg-blue-100' :
                    type.color === 'navy' ? 'bg-brand-navy/10' :
                    type.color === 'amber' ? 'bg-amber-100' :
                    type.color === 'green' ? 'bg-green-100' :
                    'bg-gray-100'
                  }`}>
                    <type.icon className={`w-6 h-6 ${
                      type.color === 'teal' ? 'text-brand-teal' :
                      type.color === 'blue' ? 'text-blue-600' :
                      type.color === 'navy' ? 'text-brand-navy' :
                      type.color === 'amber' ? 'text-amber-600' :
                      type.color === 'green' ? 'text-green-600' :
                      'text-gray-600'
                    }`} aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-navy mb-2">{type.label}</h3>
                  <p className="text-sm text-brand-text-secondary leading-relaxed">{type.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Quick WhatsApp Option */}
            <div className="mt-12 text-center max-w-2xl mx-auto">
              <p className="text-brand-text-secondary mb-4">Need instant help?</p>
              <a
                href={getWhatsAppUrl('contact')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp Now
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Specific Forms */}
      {selectedClaimType && !isSuccess && !isError && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="max-w-2xl mx-auto">
              {/* Back Button */}
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 text-brand-teal hover:text-brand-teal-hover mb-6 font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to assistance types
              </button>

              {/* Selected Type Header */}
              <div className={`rounded-2xl p-6 mb-8 flex items-center justify-between ${
                selectedClaimType.color === 'teal' ? 'bg-brand-teal-light/30' :
                selectedClaimType.color === 'blue' ? 'bg-blue-50' :
                selectedClaimType.color === 'navy' ? 'bg-brand-navy/5' :
                selectedClaimType.color === 'amber' ? 'bg-amber-50' :
                selectedClaimType.color === 'green' ? 'bg-green-50' :
                'bg-gray-50'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedClaimType.color === 'teal' ? 'bg-brand-teal/20' :
                    selectedClaimType.color === 'blue' ? 'bg-blue-100' :
                    selectedClaimType.color === 'navy' ? 'bg-brand-navy/10' :
                    selectedClaimType.color === 'amber' ? 'bg-amber-100' :
                    selectedClaimType.color === 'green' ? 'bg-green-100' :
                    'bg-gray-100'
                  }`}>
                    {selectedClaimType && <selectedClaimType.icon className={`w-6 h-6 ${
                      selectedClaimType.color === 'teal' ? 'text-brand-teal' :
                      selectedClaimType.color === 'blue' ? 'text-blue-600' :
                      selectedClaimType.color === 'navy' ? 'text-brand-navy' :
                      selectedClaimType.color === 'amber' ? 'text-amber-600' :
                      selectedClaimType.color === 'green' ? 'text-green-600' :
                      'text-gray-600'
                    }`} />}
                  </div>
                  <div>
                    <p className="text-sm text-brand-text-secondary">Selected Assistance</p>
                    <p className="font-display font-bold text-brand-navy">{selectedClaimType?.label}</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl text-brand-navy">{getFormTitle()}</h2>
                    <p className="text-sm text-brand-text-secondary">Fill in the details and we'll call you soon</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {renderForm()}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-teal text-white font-semibold rounded-xl hover:bg-brand-teal-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Phone className="w-4 h-4" />
                        Request Callback
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Success State */}
      {isSuccess && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="max-w-lg mx-auto text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-brand-teal-light rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-brand-teal" />
              </motion.div>
              <h2 className="font-display font-bold text-3xl text-brand-navy mb-4">
                Request Submitted Successfully!
              </h2>
              <p className="text-brand-text-secondary text-lg mb-2">
                Thank you for reaching out to {BRAND.name}.
              </p>
              <p className="text-brand-text-secondary mb-8">
                Our claim expert will call you within 30 minutes during business hours. You can also reach us directly on WhatsApp for instant help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getWhatsAppUrl('contact')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 border-2 border-brand-border text-brand-navy rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {isError && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="max-w-lg mx-auto text-center py-12">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="font-display font-bold text-3xl text-brand-navy mb-4">
                Server Temporarily Offline
              </h2>
              <p className="text-brand-text-secondary text-lg mb-8">
                Don't worry! Reach us on WhatsApp for instant claim assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={fallbackUrl || getWhatsAppUrl('contact')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Continue on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 border-2 border-brand-border text-brand-navy rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      {!selectedClaimType && !isSuccess && !isError && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: 'Quick Response',
                  description: 'Get callback within 30 minutes during business hours',
                },
                {
                  icon: Shield,
                  title: 'Expert Guidance',
                  description: 'Our team includes former claims managers from top insurers',
                },
                {
                  icon: Heart,
                  title: 'Lifelong Support',
                  description: 'Claims support is free, forever — even after policy ends',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="text-center p-6 bg-white rounded-2xl shadow-soft border border-gray-100"
                >
                  <div className="w-14 h-14 bg-brand-teal-light rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-brand-teal" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default ClaimAssistance;
