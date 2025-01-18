import {header, param} from 'express-validator'
import {authRequired, validateSchema} from '@/delivery/http/v1/middlewares'

export const upvoteRules = [
  param('feedbackId').exists().notEmpty().isString(),
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  validateSchema
];
