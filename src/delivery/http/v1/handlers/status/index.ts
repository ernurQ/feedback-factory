import Express from 'express'

import {DeliveryParams} from '@/delivery/types'
import {IHandler} from '../types'
import {createRouteHandler} from '../../routeHandler'

import {createStatusRules, deleteStatusRules, updateStatusRules} from './rules'
import {buildCreate, Create} from './create'
import {buildUpdate, Update} from './update'
import {buildDelete, Delete} from './delete'

type Params = Pick<DeliveryParams, 'status'>;

export type PostMethods = {
  create: Create,
  update: Update,
  delete: Delete,
}

const buildPostRoutes = (methods: PostMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router()
    
    /**
     * @openapi
     * /statuses/{postId}:
     *   post:
     *     tags: [Status]
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
     *             $ref: '#/components/rules/create-status'
     *     produces:
     *       - application/json
     *     responses:
     *        201:
     *           description: Created Status.
     *           content:
     *              application/json:
     *                schema:
     *                  properties:
     *                    status:
     *                      $ref: '#/components/schemas/Status'
     */
    namespace.post(
      '/:postId',
      createStatusRules,
      createRouteHandler(methods.create)
    )
    
    /**
     * @openapi
     * /statuses/{id}:
     *   put:
     *     tags: [Status]
     *     parameters:
     *     - in: path
     *       name: id
     *       required: true
     *       description: The unique identifier of the status.
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/update-status'
     *     produces:
     *       - application/json
     *     responses:
     *        200:
     *           description: Updated Status.
     *           content:
     *              application/json:
     *                schema:
     *                  properties:
     *                    status:
     *                      $ref: '#/components/schemas/Status'
     */
    namespace.put(
      '/:id',
      updateStatusRules,
      createRouteHandler(methods.update)
    )
    
    /**
     * @openapi
     * /statuses/{id}:
     *   delete:
     *     tags: [Status]
     *     parameters:
     *     - in: path
     *       name: id
     *       required: true
     *       description: The unique identifier of the status.
     *     produces:
     *       - application/json
     *     responses:
     *        200:
     *           description: Deleted Status.
     *           content:
     *              application/json:
     *                schema:
     *                  properties:
     *                    status:
     *                      $ref: '#/components/schemas/Status'
     */
    namespace.delete(
      '/:id',
      deleteStatusRules,
      createRouteHandler(methods.delete)
    )
    
    root.use('/statuses', namespace)
  }
}

export const buildStatusHandler = (params: Params): IHandler => {
  const create = buildCreate(params)
  const update = buildUpdate(params)
  const deleteStatus = buildDelete(params)
  
  return {
    registerRoutes: buildPostRoutes(
      {
        create,
        update,
        delete: deleteStatus,
      }
    )
  }
}
