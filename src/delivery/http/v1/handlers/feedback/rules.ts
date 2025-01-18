import {check, header, param, query} from 'express-validator'
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

export const setFeedbackStatusRules = [
  param('id').exists().notEmpty().isString(),
  query('statusId').optional().isString(),
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  validateSchema
];

export const setFeedbackCategoryRules = [
  param('id').exists().notEmpty().isString(),
  query('category').optional().isString(),
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  validateSchema
];

export const deleteFeedbackRules = [
  param('id').exists().notEmpty().isString(),
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  validateSchema
];

export const getManyFeedbacksRules = [
  query('postId').exists().notEmpty().isString(),
  query('statusId').optional().notEmpty().isString(),
  query('categoryId').optional().notEmpty().isString(),
  query('sortBy').optional().notEmpty()
    .isIn(['votes', 'createdAt', 'updatedAt']),
  query('orderBy').optional().notEmpty()
    .isIn(['asc', 'desc']),
  validateSchema,
]