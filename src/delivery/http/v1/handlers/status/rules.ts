import {check, header, param} from 'express-validator'
import {authRequired, validateSchema} from '@/delivery/http/v1/middlewares'

/**
 * @openapi
 * components:
 *   rules:
 *     create-status:
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 */
export const createStatusRules = [
  check('name').exists().notEmpty().isString(),
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  validateSchema
];

/**
 * @openapi
 * components:
 *   rules:
 *     update-status:
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 */
export const updateStatusRules = [
  param('id').exists().notEmpty().isString(),
  check('name').exists().notEmpty().isString(),
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  validateSchema
];