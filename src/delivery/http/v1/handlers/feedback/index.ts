import Express from 'express'

import {DeliveryParams} from '@/delivery/types'
import {IHandler} from '../types'
import {createRouteHandler} from '../../routeHandler'

import {createFeedbackRules} from './rules'
import {buildCreate, Create} from './create'

type Params = Pick<DeliveryParams, 'feedback'>;

export type FeedbackMethods = {
  create: Create,
}

const buildPostRoutes = (methods: FeedbackMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router()
    
    /**
     * @openapi
     * /feedbacks/{postId}:
     *   post:
     *     tags: [Feedback]
     *     parameters:
     *     - in: path
     *       name: postId
     *       required: true
     *       description: The unique identifier of the post.
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/create-feedback'
     *     produces:
     *       - application/json
     *     responses:
     *        201:
     *           description: Created Feedback.
     *           content:
     *              application/json:
     *                schema:
     *                  properties:
     *                    feedback:
     *                      $ref: '#/components/schemas/Feedback'
     */
    namespace.post(
      '/:postId',
      createFeedbackRules,
      createRouteHandler(methods.create)
    )
    
    root.use('/feedbacks', namespace)
  }
}

export const buildFeedbackHandler = (params: Params): IHandler => {
  const create = buildCreate(params)
  
  return {
    registerRoutes: buildPostRoutes(
      {
        create,
      }
    )
  }
}
