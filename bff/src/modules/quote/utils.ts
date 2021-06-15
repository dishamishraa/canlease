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
  vendorName: Joi.string().required(),
  vendorEmail: Joi.string().required(),
  vendorBusinessName: Joi.string().required(),
});

const SendQuoteSchema = Joi.object({
  vendorBusinessName: Joi.string().required(),
  from: Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
  }),
  template_id: Joi.string().required(),
  personalizations: Joi.array().items(Joi.object({
    to: Joi.array().items(Joi.object({
      email: Joi.string().required(),
      name: Joi.string().required(),
    })),
    subject: Joi.string().required(),
  })),
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
