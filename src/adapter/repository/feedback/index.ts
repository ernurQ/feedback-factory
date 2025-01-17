import {AdapterParams} from '@/adapter/types'

import {buildCreate, Create} from './create'
import {buildGet, Get} from './get'
import {buildUpdate, Update} from './update'

type Params = Pick<AdapterParams, 'db'>

export type FeedbackRepository = {
  create: Create,
  get: Get,
  update: Update,
}

export const buildFeedbackRepository = (params: Params): FeedbackRepository=>{
  const create = buildCreate(params)
  const get = buildGet(params)
  const update = buildUpdate(params)
  
  return {
    create,
    get,
    update,
  }
}
