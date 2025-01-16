import Express from 'express'

import {DeliveryParams} from '@/delivery/types'
import {IHandler} from '../types'
import {createRouteHandler} from '../../routeHandler'

import {createStatusRules} from './rules'
import {buildCreate, Create} from './create'

type Params = Pick<DeliveryParams, 'status'>;

export type PostMethods = {
  create: Create,
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
    
    root.use('/statuses', namespace)
  }
}

export const buildStatusHandler = (params: Params): IHandler => {
  const create = buildCreate(params)
  
  return {
    registerRoutes: buildPostRoutes(
      {
        create,
      }
    )
  }
}
