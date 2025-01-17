import Express from 'express'

import {DeliveryParams} from '@/delivery/types'
import {IHandler} from '../types'
import {createRouteHandler} from '../../routeHandler'

import {createCategoryRules} from './rules'
import {buildCreate, Create} from './create'

type Params = Pick<DeliveryParams, 'category'>;

export type CategoryMethods = {
  create: Create,
}

const buildCategoryRoutes = (methods: CategoryMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router()
    
    /**
     * @openapi
     * /categories/{postId}:
     *   post:
     *     tags: [Category]
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
     *             $ref: '#/components/rules/create-category'
     *     produces:
     *       - application/json
     *     responses:
     *        201:
     *           description: Created Category.
     *           content:
     *              application/json:
     *                schema:
     *                  properties:
     *                    status:
     *                      $ref: '#/components/schemas/Category'
     */
    namespace.post(
      '/:postId',
      createCategoryRules,
      createRouteHandler(methods.create)
    )

    root.use('/categories', namespace)
  }
}

export const buildCategoryHandler = (params: Params): IHandler => {
  const create = buildCreate(params)
  
  return {
    registerRoutes: buildCategoryRoutes(
      {
        create,
      }
    )
  }
}
