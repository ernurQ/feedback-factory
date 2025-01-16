import {AdapterParams} from '@/adapter/types'
import {buildCreate, Create} from './create'
import {buildGet, Get} from './get'
import {buildUpdate, Update} from './update'
import {buildDelete, Delete} from './delete'

type Params = Pick<AdapterParams, 'db'>

export type PostRepository = {
  create: Create;
  get: Get;
  update: Update;
  delete: Delete;
}
export const buildPostRepository = (params: Params): PostRepository=>{
  const create = buildCreate(params)
  const get = buildGet(params)
  const update = buildUpdate(params)
  const deletePost = buildDelete(params)
  
  return {
    create,
    get,
    update,
    delete: deletePost,
  }
}
