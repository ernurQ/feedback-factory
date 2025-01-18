import Express from 'express'

import {DeliveryParams} from '@/delivery/types'
import {IHandler} from '../types'
import {createRouteHandler} from '../../routeHandler'

import {upvoteRules} from './rules'
import {buildUpvote, Upvote} from './upvote'


type Params = Pick<DeliveryParams, 'vote'>;

export type VoteMethods = {
  upvote: Upvote
}

const buildVoteRoutes = (methods: VoteMethods) => {
  return (root: Express.Router) => {
    const namespace = Express.Router()
    
    /**
     * @openapi
     * /votes/{feedbackId}:
     *   post:
     *     tags: [Vote]
     *     parameters:
     *     - in: path
     *       name: feedbackId
     *       required: true
     *       description: The unique identifier of the feedback.
     *     produces:
     *       - application/json
     *     responses:
     *        200:
     *           description: Voted.
     *           content:
     *              application/json:
     *                schema:
     *                  properties:
     *                    status:
     *                      $ref: '#/components/schemas/Vote'
     */
    namespace.post(
      '/:feedbackId',
      upvoteRules,
      createRouteHandler(methods.upvote)
    )
    
    root.use('/votes', namespace)
  }
}

export const buildVoteHandler = (params: Params): IHandler => {
  const upvote = buildUpvote(params)
  
  return {
    registerRoutes: buildVoteRoutes(
      {
        upvote,
      }
    )
  }
}
