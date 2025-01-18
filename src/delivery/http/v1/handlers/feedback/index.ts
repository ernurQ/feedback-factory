import Express from 'express'

import {DeliveryParams} from '@/delivery/types'
import {IHandler} from '../types'
import {createRouteHandler} from '../../routeHandler'

import {
  createFeedbackRules,
  deleteFeedbackRules,
  getManyFeedbacksRules,
  setFeedbackCategoryRules,
  setFeedbackStatusRules,
  updateFeedbackRules
} from './rules'
import {buildCreate, Create} from './create'
import {buildUpdate, Update} from './update'
import {buildSetStatus, SetStatus} from './setStatus'
import {buildSetCategory, SetCategory} from './setCategory'
import {buildDelete, Delete} from './delete'
import {buildGetMany, GetMany} from './getMany'

type Params = Pick<DeliveryParams, 'feedback'>;

export type FeedbackMethods = {
  create: Create,
  update: Update,
  setStatus: SetStatus
  setCategory: SetCategory,
  delete: Delete,
  getMany: GetMany,
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
    
    /**
     * @openapi
     * /feedbacks/{id}/category:
     *   patch:
     *     tags: [Feedback]
     *     parameters:
     *     - in: path
     *       name: id
     *       required: true
     *       description: The unique identifier of the feedback.
     *     - in: query
     *       name: categoryId
     *       required: false
     *       description: The unique identifier of the category. Do not specify to remove status.
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
      '/:id/category',
      setFeedbackCategoryRules,
      createRouteHandler(methods.setCategory)
    )
    
    /**
     * @openapi
     * /feedbacks/{id}:
     *   delete:
     *     tags: [Feedback]
     *     parameters:
     *     - in: path
     *       name: id
     *       required: true
     *       description: The unique identifier of the feedback.
     *     produces:
     *       - application/json
     *     responses:
     *        200:
     *           description: Deleted Feedback.
     *           content:
     *              application/json:
     *                schema:
     *                  properties:
     *                    status:
     *                      $ref: '#/components/schemas/Feedback'
     */
    namespace.delete(
      '/:id',
      deleteFeedbackRules,
      createRouteHandler(methods.delete)
    )
    
    /**
     * @openapi
     *   /feedbacks:
     *     get:
     *       tags: [Feedback]
     *       parameters:
     *         - name: postId
     *           in: query
     *           required: true
     *         - name: statusId
     *           in: query
     *           required: false
     *         - name: categoryId
     *           in: query
     *           required: false
     *         - name: sortBy
     *           in: query
     *           required: false
     *           schema:
     *             type: string
     *             enum:
     *               - votes
     *               - createdAt
     *               - updatedAt
     *         - name: orderBy
     *           in: query
     *           required: false
     *           schema:
     *             type: string
     *             enum:
     *               - asc
     *               - desc
     *         - name: offset
     *           in: query
     *           required: false
     *           schema:
     *             type: integer
     *         - name: limit
     *           in: query
     *           required: false
     *           schema:
     *             type: integer
     *       responses:
     *         200:
     *           content:
     *             application/json:
     *               schema:
     *                 type: object
     *                 properties:
     *                   feedbacks:
     *                     type: array
     *                     items:
     *                       type: object
     *                       properties:
     *                         id:
     *                           type: string
     *                         title:
     *                           type: string
     *                         description:
     *                           type: string
     *                         createdAt:
     *                           type: string
     *                           format: date-time
     *                         updatedAt:
     *                           type: string
     *                           format: date-time
     *                         postId:
     *                           type: string
     *                         authorId:
     *                           type: string
     *                         statusId:
     *                           type: string
     *                         categoryId:
     *                           type: string
     *                         _count:
     *                           type: object
     *                           properties:
     *                             votes:
     *                               type: integer
     *                               description: Number of votes for the feedback.
     */
    namespace.get(
      '/',
      getManyFeedbacksRules,
      createRouteHandler(methods.getMany)
    )
    
    root.use('/feedbacks', namespace)
  }
}

export const buildFeedbackHandler = (params: Params): IHandler => {
  const create = buildCreate(params)
  const update = buildUpdate(params)
  const setStatus = buildSetStatus(params)
  const setCategory = buildSetCategory(params)
  const deleteFeedback = buildDelete(params)
  const getMany = buildGetMany(params)
  
  return {
    registerRoutes: buildPostRoutes(
      {
        create,
        update,
        setStatus,
        setCategory,
        delete: deleteFeedback,
        getMany,
      }
    )
  }
}
