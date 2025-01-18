import {AdapterParams} from '@/adapter/types'

import {buildCreate, Create} from './create'
import {buildGet, Get} from './get'
import {buildGetMany, GetMany} from './getMany'
import {buildUpdate, Update} from './update'
import {buildDelete, Delete} from './delete'

type Params = Pick<AdapterParams, 'db'>

export type FeedbackRepository = {
  create: Create,
  get: Get,
  getMany: GetMany,
  update: Update,
  delete: Delete,
}

export const buildFeedbackRepository = (params: Params): FeedbackRepository=>{
  const create = buildCreate(params)
  const get = buildGet(params)
  const getMany = buildGetMany(params)
  const update = buildUpdate(params)
  const deleteFeedback = buildDelete(params)
  
  return {
    create,
    get,
    getMany,
    update,
    delete: deleteFeedback,
  }
}
