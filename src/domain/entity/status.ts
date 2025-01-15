import {Status} from '@prisma/client'

export interface IStatus extends Status {}

/**
 * @openapi
 * components:
 *   schemas:
 *     Status:
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
 *           description: Name of the status
 *           example: "Published"
 *         post_id:
 *           type: string
 *           description: The ID of the post associated with this status
 *         post:
 *           $ref: '#/components/schemas/Post'
 *           description: Post object associated with the status
 */
