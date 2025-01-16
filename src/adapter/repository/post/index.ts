import {AdapterParams} from '@/adapter/types'
import {buildCreate, Create} from './create'
import {buildGet, Get} from './get'
import {buildUpdate, Update} from './update'

type Params = Pick<AdapterParams, 'db'>

export type PostRepository = {
  create: Create,
  get: Get
  update: Update
}
export const buildPostRepository = (params: Params): PostRepository=>{
  const create = buildCreate(params)
  const get = buildGet(params)
  const update = buildUpdate(params)
  
  return {
    create,
    get,
    update,
  }
}
