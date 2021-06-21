import Joi from 'joi';
import {
  CreateApplication, VALID_BUSINESS_TYPES, VALID_CONDITION_TYPES, VALID_TERM_TYPES,
} from './types';

const CreateQuoteSchema = Joi.object({
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

export const validateCreateApplication = (value: unknown): value is CreateApplication => {
  const { error } = CreateQuoteSchema.validate(value, { allowUnknown: true });
  return error === undefined;
};
