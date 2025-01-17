import {Feedback} from '@prisma/client'

export interface IFeedback extends Feedback {}

/**
 * @openapi
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - created_at
 *         - updatedAt
 *         - postId
 *         - authorId
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date
 *         updatedAt:
 *           type: string
 *           format: date
 *         postId:
 *           type: string
 *         post:
 *           $ref: '#/components/schemas/Post'
 *         authorId:
 *           type: string
 *         author:
 *           $ref: '#/components/schemas/User'
 *         statusId:
 *           type: string
 *         status:
 *           $ref: '#/components/schemas/Status'
 *         categoryId:
 *           type: string
 *         category:
 *           $ref: '#/components/schemas/Category'
 */


