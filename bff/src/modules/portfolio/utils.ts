import Joi from 'joi';
import { Portfolio } from './types';

const id = Joi.alternatives(
  Joi.string(),
).required();

export const validateId = (value: unknown): value is string => {
  const { error } = id.validate(value, { allowUnknown: true });
  return error === undefined;
};
