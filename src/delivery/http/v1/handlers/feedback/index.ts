import Express from 'express'

import {DeliveryParams} from '@/delivery/types'
import {IHandler} from '../types'
import {createRouteHandler} from '../../routeHandler'

import {
  createFeedbackRules,
  setFeedbackStatusRules,
  updateFeedbackRules
} from './rules'
import {buildCreate, Create} from './create'
import {buildUpdate, Update} from './update'
import {buildSetStatus, SetStatus} from './setStatus'

type Params = Pick<DeliveryParams, 'feedback'>;

export type FeedbackMethods = {
  create: Create,
  update: Update,
  setStatus: SetStatus
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
    
    /**
     * @openapi
     * /feedbacks/{id}/status:
     *   patch:
     *     tags: [Feedback]
     *     parameters:
     *     - in: path
     *       name: id
     *       required: true
     *       description: The unique identifier of the feedback.
     *     - in: query
     *       name: statusId
     *       required: false
     *       description: The unique identifier of the status. Do not specify to remove status.
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
    namespace.patch(
      '/:id/status',
      setFeedbackStatusRules,
      createRouteHandler(methods.setStatus)
    )
    
    root.use('/feedbacks', namespace)
  }
}

export const buildFeedbackHandler = (params: Params): IHandler => {
  const create = buildCreate(params)
  const update = buildUpdate(params)
  const setStatus = buildSetStatus(params)
  
  return {
    registerRoutes: buildPostRoutes(
      {
        create,
        update,
        setStatus,
      }
    )
  }
}
