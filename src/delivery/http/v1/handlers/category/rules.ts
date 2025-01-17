import {check, header, param} from 'express-validator'
import {authRequired, validateSchema} from '@/delivery/http/v1/middlewares'

/**
 * @openapi
 * components:
 *   rules:
 *     create-category:
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 */
export const createCategoryRules = [
  check('name').exists().notEmpty().isString(),
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  validateSchema,
];


/**
 * @openapi
 * components:
 *   rules:
 *     update-category:
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 */
export const updateCategoryRules = [
  param('id').exists().notEmpty().isString(),
  check('name').exists().notEmpty().isString(),
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  validateSchema
];

export const deleteCategoryRules = [
  param('id').exists().notEmpty().isString(),
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  validateSchema
]