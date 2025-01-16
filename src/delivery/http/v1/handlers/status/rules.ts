import {check, header} from 'express-validator'
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