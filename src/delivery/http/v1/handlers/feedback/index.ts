import Express from 'express'

import {DeliveryParams} from '@/delivery/types'
import {IHandler} from '../types'
import {createRouteHandler} from '../../routeHandler'

import {createFeedbackRules, updateFeedbackRules} from './rules'
import {buildCreate, Create} from './create'
import {buildUpdate, Update} from './update'

type Params = Pick<DeliveryParams, 'feedback'>;

export type FeedbackMethods = {
  create: Create,
  update: Update,
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
    
    /**
     * @openapi
     * /feedbacks/{id}:
     *   put:
     *     tags: [Feedback]
     *     parameters:
     *     - in: path
     *       name: id
     *       required: true
     *       description: The unique identifier of the feedback.
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/update-feedback'
     *     produces:
     *       - application/json
     *     responses:
     *        200:
     *           description: Updated Feedback.
     *           content:
     *              application/json:
     *                schema:
     *                  properties:
     *                    status:
     *                      $ref: '#/components/schemas/Feedback'
     */
    namespace.put(
      '/:id',
      updateFeedbackRules,
      createRouteHandler(methods.update)
    )
    
    root.use('/feedbacks', namespace)
  }
}

export const buildFeedbackHandler = (params: Params): IHandler => {
  const create = buildCreate(params)
  const update = buildUpdate(params)
  
  return {
    registerRoutes: buildPostRoutes(
      {
        create,
        update,
      }
    )
  }
}
