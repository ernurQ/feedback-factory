import Express from 'express'

import {DeliveryParams} from '@/delivery/types'
import {IHandler} from '../types'
import {createRouteHandler} from '../../routeHandler'

import {
  createCategoryRules,
  deleteCategoryRules,
  updateCategoryRules
} from './rules'
import {buildCreate, Create} from './create'
import {buildUpdate, Update} from './update'
import {buildDelete, Delete} from './delete'

type Params = Pick<DeliveryParams, 'category'>;

export type CategoryMethods = {
  create: Create,
  update: Update,
  delete: Delete,
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
    
    /**
     * @openapi
     * /categories/{id}:
     *   put:
     *     tags: [Category]
     *     parameters:
     *     - in: path
     *       name: id
     *       required: true
     *       description: The unique identifier of the category.
     *     requestBody:
     *       in: body
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/rules/update-category'
     *     produces:
     *       - application/json
     *     responses:
     *        200:
     *           description: Updated Category.
     *           content:
     *              application/json:
     *                schema:
     *                  properties:
     *                    status:
     *                      $ref: '#/components/schemas/Category'
     */
    namespace.put(
      '/:id',
      updateCategoryRules,
      createRouteHandler(methods.update)
    )
    
    /**
     * @openapi
     * /categories/{id}:
     *   delete:
     *     tags: [Category]
     *     parameters:
     *     - in: path
     *       name: id
     *       required: true
     *       description: The unique identifier of the category.
     *     produces:
     *       - application/json
     *     responses:
     *        200:
     *           description: Deleted Category.
     *           content:
     *              application/json:
     *                schema:
     *                  properties:
     *                    status:
     *                      $ref: '#/components/schemas/Category'
     */
    namespace.delete(
      '/:id',
      deleteCategoryRules,
      createRouteHandler(methods.delete)
    )
    
    
    root.use('/categories', namespace)
  }
}

export const buildCategoryHandler = (params: Params): IHandler => {
  const create = buildCreate(params)
  const update = buildUpdate(params)
  const deleteCategory = buildDelete(params)
  
  return {
    registerRoutes: buildCategoryRoutes(
      {
        create,
        update,
        delete: deleteCategory,
      }
    )
  }
}
