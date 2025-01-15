import Express from 'express'
import {DeliveryParams} from '@/delivery/types'
import {createRules} from './rules'
import {createRouteHandler} from '../../routeHandler'
import {IHandler} from '../types'
import {buildCreate, Create} from './create'

type Params = Pick<DeliveryParams, 'post'>;

export type PostMethods = {
  create: Create
}

const buildPostRoutes = (methods: PostMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router()
    
    /**
     * @openapi
     * /posts:
     *   post:
     *     tags: [Post]
     *     produces:
     *       - application/json
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/create-post'
     *     responses:
     *        201:
     *           description: Created post.
     *           content:
     *              application/json:
     *                schema:
     *                  properties:
     *                    user:
     *                      $ref: '#/components/schemas/Post'
     */
    namespace.post(
      '/',
      createRules,
      createRouteHandler(methods.create)
    )
    
    root.use('/posts', namespace)
  }
}

export const buildPostHandler = (params: Params): IHandler => {
  const create = buildCreate(params)
  
  return {
    registerRoutes: buildPostRoutes(
      {
        create
      }
    )
  }
}
