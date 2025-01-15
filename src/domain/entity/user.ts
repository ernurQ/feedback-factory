import {User} from '@prisma/client'

export interface IUser extends User {}

/**
 * @openapi
 * components:
 *   schemas:
 *      User:
 *          required:
 *            - id
 *            - created_at
 *          properties: 
 *            id:
 *                type: string
 *            email:
 *                type: string
 *            name:
 *                type: string
 *            avatar:
 *                type: string
 *            created_at:
 *                type: string
 *                format: date
 */
