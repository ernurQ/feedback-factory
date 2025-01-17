import Express from 'express'

import {DeliveryParams} from '@/delivery/types'
import {IHandler} from '../types'
import {createRouteHandler} from '../../routeHandler'

import {
  createRules,
  deletePostRules,
  getPostRules,
  updatePostRules
} from './rules'
import {buildCreate, Create} from './create'
import {buildGetPost, GetPost} from './getPost'
import {buildUpdate, Update} from './update'
import {buildDelete, Delete} from './delete'

type Params = Pick<DeliveryParams, 'post'>;

export type PostMethods = {
  create: Create
  getPost: GetPost
  update: Update
  delete: Delete
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
     *                    post:
     *                      $ref: '#/components/schemas/Post'
     */
    namespace.post(
      '/',
      createRules,
      createRouteHandler(methods.create)
    )
    
    /**
     * @openapi
     * /posts/{id}:
     *   get:
     *     tags: [Post]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         description: Unique identifier of the post
     *     produces:
     *       - application/json
     *
     *     responses:
     *       200:
     *         description: Successfully retrieved the post.
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 post:
     *                   $ref: '#/components/schemas/Post'
     *       404:
     *         description: Post not found.
     */
    namespace.get(
      '/:id',
      getPostRules,
      createRouteHandler(methods.getPost)
    )
    
    /**
     * @openapi
     * /posts/{id}:
     *   put:
     *     tags: [Post]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Unique identifier of the post
     *     produces:
     *       - application/json
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/update-post'
     *     responses:
     *       201:
     *         description: Updated post.
     *         content:
     *           application/json:
     *             schema:
     *               properties:
     *                 post:
     *                   $ref: '#/components/schemas/Post'
     */
    namespace.put(
      '/:id',
      updatePostRules,
      createRouteHandler(methods.update)
    )
    
    /**
     * @openapi
     * /posts/{id}:
     *   delete:
     *     tags: [Post]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *         description: Unique identifier of the post
     *     produces:
     *       - application/json
     *     responses:
     *        200:
     *           description: Deleted post.
     *           content:
     *              application/json:
     *                schema:
     *                  properties:
     *                    post:
     *                      $ref: '#/components/schemas/Post'
     */
    namespace.delete(
      '/:id',
      deletePostRules,
      createRouteHandler(methods.delete)
    )
    
    root.use('/posts', namespace)
  }
}

export const buildPostHandler = (params: Params): IHandler => {
  const create = buildCreate(params)
  const getPost = buildGetPost(params)
  const update = buildUpdate(params)
  const deletePost = buildDelete(params)
  
  return {
    registerRoutes: buildPostRoutes(
      {
        create,
        getPost,
        update,
        delete: deletePost,
      }
    )
  }
}
