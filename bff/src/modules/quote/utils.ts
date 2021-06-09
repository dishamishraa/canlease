import Joi from 'joi';
import { CreateQuote, VALID_USER_TYPES } from './types';

const CreateQuoteSchema = Joi.object({
  userType: Joi.string().valid(...VALID_USER_TYPES).required(),
  asset: Joi.string().required(),
  applicationAmount: Joi.number().required(),
  leaseType: Joi.string().required(),
  contactName: Joi.string().required(),
  contactEmail: Joi.string().required(),
  contactBusinessName: Joi.string().required(),
  vendorName: Joi.string().required(),
  vendorEmail: Joi.string().required(),
  vendorBusinessName: Joi.string().required(),
  // quoteOptions:Joi.array().items(Joi.object({
  //     monthlyAmount: Joi.number().required(),
  //     term: Joi.string().required(),
  //     financeRate: Joi.number().required(),
  //     purchaseOptionDate: Joi.string().required(),
  // })),
});

export const validateCreateQuote = (value: unknown): value is CreateQuote => {
  const { error } = CreateQuoteSchema.validate(value, { allowUnknown: true });
  return error === undefined;
};
