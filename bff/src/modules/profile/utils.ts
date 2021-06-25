import Joi from 'joi';
import { VALID_USER_TYPES } from '../quote/types';
import { CreateProfile,  AddQuote } from './types';

const id = Joi.alternatives(
    Joi.string(),
    Joi.number(),
).required();

const CreateProfileSchema = Joi.object({
    companyName: Joi.string().required(),
    street: Joi.string().required(),
    province: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    portalId: Joi.string().required(),
    userType: Joi.string().valid(...VALID_USER_TYPES).required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    title: Joi.string().required(),
    operatingName: Joi.string().required(),
    operatingSinceDate: Joi.string().required(),
    businessSector: Joi.string().required(),
    businessPhone: Joi.string().required(),
    website: Joi.string().required()
});

const AddQuoteSchema = Joi.object({
    quoteId: id,
    portalId: id
});

export const validateCreateProfile = (value: unknown): value is CreateProfile => {
  const { error } = CreateProfileSchema.validate(value, { allowUnknown: true });
  return error === undefined;
};

export const validateAddQuote = (value: unknown): value is AddQuote => {
    const { error } = AddQuoteSchema.validate(value, { allowUnknown: true });
    return error === undefined;
}

export const validateId = (value: unknown): value is number | string => {
    const { error } = id.validate(value, { allowUnknown: true });
    return error === undefined;
};
  