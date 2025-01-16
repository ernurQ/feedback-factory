import {check, header, param} from 'express-validator'
import {authRequired, validateSchema} from '../../middlewares'

/**
 * @openapi
 * components:
 *   rules:
 *      create-post:
 *          required:
 *             - title
 *             - description
 *          properties:
 *             title:
 *                type: string
 *             description:
 *                type: string
 */
export const createRules = [
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
 *      get-post:
 *          required:
 *             - id
 *          properties:
 *             id:
 *                type: string
 *                description: Unique identifier of the post
 */
export const getPostRules = [
  param('id').exists().notEmpty().isString(),
  validateSchema,
];


/**
 * @openapi
 * components:
 *   rules:
 *      update-post:
 *          properties:
 *             title:
 *                type: string
 *                required: false
 *             description:
 *                type: string
 *                required: false
 */
export const updatePostRules = [
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  check('title').optional().isString(),
  check('description').optional().isString(),
  validateSchema
]

/**
 * @openapi
 * components:
 *   rules:
 *      delete-post:
 *        required:
 *          - id
 *        properties:
 *          id:
 *            type: string
 *            description: Unique identifier of the post
 */
export const deletePostRules = [
  header('authorization').exists().notEmpty().isString(),
  authRequired(),
  param('id').exists().notEmpty().isString(),
  validateSchema
]