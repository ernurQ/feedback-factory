import {AdapterParams} from '@/adapter/types'
import {buildCreate, Create} from './create'
import {buildCreateMany, CreateMany} from './createMany'

type Params = Pick<AdapterParams, 'db'>

export type StatusRepository = {
  create: Create,
  createMany: CreateMany
}
export const buildStatusRepository = (params: Params): StatusRepository=>{
  const create = buildCreate(params)
  const createMany = buildCreateMany(params)
  
  return {
    create,
    createMany
  }
}
