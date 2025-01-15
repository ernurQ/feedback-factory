import {Category} from '@prisma/client'

export interface ICategory extends Category {}

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - post_id
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *           description: Name of the category
 *           example: "Technology"
 *         post_id:
 *           type: string
 *           description: The ID of the post associated with this category
 *         post:
 *           $ref: '#/components/schemas/Post'
 *           description: Post object associated with the category
 */
