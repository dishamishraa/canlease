import Joi from 'joi';
import { CreateQuote, VALID_USER_TYPES, SendQuote } from './types';

const CreateQuoteSchema = Joi.object({
  userType: Joi.string().valid(...VALID_USER_TYPES).required(),
  asset: Joi.string().required(),
  applicationAmount: Joi.number().required(),
  leaseType: Joi.string().required(),
  contactName: Joi.string().required(),
  contactEmail: Joi.string().required(),
  contactBusinessName: Joi.string().required(),
  vendorName: Joi.string(),
  vendorEmail: Joi.string(),
  vendorBusinessName: Joi.string(),
});

const SendQuoteSchema = Joi.object({
  email: Joi.string().required(),
  actionUrl: Joi.string().required(),
});

const quoteId = Joi.alternatives(
  Joi.string(),
  Joi.number(),
).required();

export const validateCreateQuote = (value: unknown): value is CreateQuote => {
  const { error } = CreateQuoteSchema.validate(value, { allowUnknown: true });
  return error === undefined;
};

export const validateSendQuote = (value: unknown): value is SendQuote => {
  const { error } = SendQuoteSchema.validate(value, { allowUnknown: true });
  return error === undefined;
};

export const validateGetQuote = (value: unknown): value is number | string => {
  const { error } = quoteId.validate(value, { allowUnknown: true });
  return error === undefined;
};
