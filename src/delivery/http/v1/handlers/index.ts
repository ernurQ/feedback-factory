import Express from 'express'
import {IHandler} from './types'
import {DeliveryParams} from '@/delivery/types'

import {buildExampleHandler} from './example'
import {buildAuthHandler} from './auth'
import {buildPostHandler} from './post'
import {buildStatusHandler} from './status'

export const buildHandler = (params: DeliveryParams): Express.Router => {
  const router = Express.Router()

  const handlers: Array<IHandler> = [
    buildAuthHandler(params),
    buildPostHandler(params),
    buildStatusHandler(params),
    buildExampleHandler(params),
  ]

  for (let i = 0; i < handlers.length; i++){
    const handler = handlers[i]

    handler.registerRoutes(router)
  }

  return router
}
