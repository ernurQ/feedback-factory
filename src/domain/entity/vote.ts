import {Vote} from '@prisma/client'

export interface IVote extends Vote {}

/**
 * @openapi
 * components:
 *   schemas:
 *     Vote:
 *       type: object
 *       required:
 *         - id
 *         - voterId
 *         - feedbackId
 *       properties:
 *         id:
 *           type: string
 *         voterId:
 *           type: string
 *         feedbackId:
 *           type: string
 */
