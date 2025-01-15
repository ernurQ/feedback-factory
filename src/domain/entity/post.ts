import {Post} from '@prisma/client'

export interface IPost extends Post {}

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - author_id
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *           description: Title of the post
 *           example: "My First Post"
 *         description:
 *           type: string
 *           nullable: true
 *           description: A brief description or content of the post
 *           example: "This is a description of my first post."
 *         author_id:
 *           type: string
 *           description: The ID of the author who created the post
 *           example: "a1b2c3d4-e5f6-7890-1122-334455667788"
 *         author:
 *           $ref: '#/components/schemas/User'
 *           description: Author object representing the creator of the post
 *         categories:
 *           type: array
 *           description: List of categories associated with the post
 *           items:
 *             $ref: '#/components/schemas/Category'
 *         statuses:
 *           type: array
 *           description: List of statuses associated with the post
 *           items:
 *             $ref: '#/components/schemas/Status'
 */
