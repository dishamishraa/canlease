import Joi from 'joi';
import {
  VALID_BUSINESS_TYPES,
  VALID_TERM_TYPES,
  VALID_CONDITION_TYPES,
  VALID_USER_TYPES,
  CreateApplication,
  CreateProfile,
  AddQuote,
  CreateQuote,
  VALID_LEASE_TYPES,
} from './types';

const CreateApplicationSchema = Joi.object({
  leasePortalId: Joi.string().required(),
  operatingName: Joi.string().required(),
  businessName: Joi.string().required(),
  businessType: Joi.string().valid(...VALID_BUSINESS_TYPES).required(),
  yearsInBusiness: Joi.number().required(),
  contactName: Joi.string().required(),
  contactEmail: Joi.string().required(),
  contactPhone: Joi.string().required(),
  contactWebsite: Joi.string().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  province: Joi.string().required(),
  postalCode: Joi.string().required(),
  term: Joi.string().valid(...VALID_TERM_TYPES).required(),
  applicationAmount: Joi.number().required(),
  asset: Joi.string().required(),
  condition: Joi.string().valid(...VALID_CONDITION_TYPES).required(),
  ageOfAsset: Joi.number().required(),
  businessOwnerName: Joi.string().required(),
  businessOwnerStreet: Joi.string().required(),
  businessOwnerCity: Joi.string().required(),
  bankruptcy: Joi.bool().required(),
  creditCheckConsent: Joi.bool().required(),
  sin: Joi.string().required(),
  dob: Joi.string().required(),
  vendorPortalId: Joi.string().required(),
  quoteId: Joi.string().required(),
  expectedDeliveryDate: Joi.string().required(),
  bankruptcyDetails: Joi.string().required(),
});

const CreateProfileSchema = Joi.object({
  email: Joi.string().required(),
  portalId: Joi.string().required(),

  companyName: Joi.string().required(),
  street: Joi.string().required(),
  province: Joi.string().required(),
  postalCode: Joi.string().required(),
  country: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userType: Joi.string().valid(...VALID_USER_TYPES).required(),
  phone: Joi.string().required(),
  title: Joi.string().allow(''),
  operatingName: Joi.string().required(),
  operatingSinceDate: Joi.string().required(),
  businessSector: Joi.string().required(),
  businessPhone: Joi.string().required(),
  website: Joi.string().allow(''),
});

const AddQuoteSchema = Joi.object({
  quoteId: Joi.string().required(),
});

const CreateQuoteSchema = Joi.object({
  userType: Joi.string().valid(...VALID_USER_TYPES).required(),
  asset: Joi.string().required(),
  applicationAmount: Joi.number().required(),
  leaseType: Joi.string().valid(...VALID_LEASE_TYPES).required(),
  contactName: Joi.string().required(),
  contactEmail: Joi.string().required(),
  contactBusinessName: Joi.string().required(),
  vendorName: Joi.string(),
  vendorEmail: Joi.string(),
  vendorBusinessName: Joi.string(),
});

export const validateCreateApplication = (value: unknown): value is CreateApplication => {
  const { error } = CreateApplicationSchema.validate(value, { allowUnknown: true });
  return error === undefined;
};

export const validateCreateProfile = (value: unknown): value is CreateProfile => {
  const { error } = CreateProfileSchema.validate(value, { allowUnknown: true });
  return error === undefined;
};

export const validateAddQuote = (value: unknown): value is AddQuote => {
  const { error } = AddQuoteSchema.validate(value, { allowUnknown: true });
  return error === undefined;
};

export const validateCreateQuote = (value: unknown): value is CreateQuote => {
  const { error } = CreateQuoteSchema.validate(value, { allowUnknown: true });
  return error === undefined;
};
