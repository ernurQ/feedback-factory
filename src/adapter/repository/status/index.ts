import {AdapterParams} from '@/adapter/types'
import {buildCreate, Create} from './create'
import {buildCreateMany, CreateMany} from './createMany'
import {buildUpdate, Update} from './update'
import {buildGet, Get} from './get'
import {buildDelete, Delete} from './delete'

type Params = Pick<AdapterParams, 'db'>

export type StatusRepository = {
  create: Create,
  createMany: CreateMany,
  update: Update,
  get: Get,
  delete: Delete,
}
export const buildStatusRepository = (params: Params): StatusRepository=>{
  const create = buildCreate(params)
  const createMany = buildCreateMany(params)
  const update = buildUpdate(params)
  const get = buildGet(params)
  const deleteStatus = buildDelete(params)
  
  return {
    create,
    createMany,
    update,
    get,
    delete: deleteStatus,
  }
}
