import {AdapterParams} from '@/adapter/types'
import {buildCreate, Create} from './create'
import {buildGet, Get} from './get'

type Params = Pick<AdapterParams, 'db'>

export type PostRepository = {
  create: Create,
  get: Get
}
export const buildPostRepository = (params: Params): PostRepository=>{
  const create = buildCreate(params)
  const get = buildGet(params)
  
  return {
    create,
    get
  }
}
