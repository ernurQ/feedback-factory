import {check, header, param} from 'express-validator'
import {authRequired, validateSchema} from '@/delivery/http/v1/middlewares'

/**
 * @openapi
 * components:
 *   rules:
 *      create-feedback:
 *          required:
 *             - title
 *             - description
 *          properties:
 *             title:
 *                type: string
 *             description:
 *                type: string
 */
export const createFeedbackRules = [
  check('title').exists().notEmpty().isString(),
  check('description').optional().isString(),
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  validateSchema
];


/**
 * @openapi
 * components:
 *   rules:
 *     update-feedback:
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 */
export const updateFeedbackRules = [
  param('id').exists().notEmpty().isString(),
  check('title').optional().isString(),
  check('description').optional().isString(),
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  validateSchema
];