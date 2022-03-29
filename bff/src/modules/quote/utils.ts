import Joi from 'joi';
import { SendQuote } from './types';

const SendQuoteSchema = Joi.object({
  companyName: Joi.string().required(),
  submittedBy: Joi.string().required(),
  email: Joi.string().required(),
  quoteId: Joi.string().required(),
});

export const validateSendQuote = (value: unknown): value is SendQuote => {
  const { error } = SendQuoteSchema.validate(value, { allowUnknown: true });
  return error === undefined;
};
