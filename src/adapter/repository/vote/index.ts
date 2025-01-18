import {AdapterParams} from '@/adapter/types'

import {buildCreate, Create} from './create'
import {buildGet, Get} from './get'
import {buildDelete, Delete} from './delete'

type Params = Pick<AdapterParams, 'db'>

export type VoteRepository = {
  create: Create,
  get: Get,
  delete: Delete,
}

export const buildVoteRepository = (params: Params): VoteRepository=>{
  const create = buildCreate(params)
  const get = buildGet(params)
  const deleteVote = buildDelete(params)
  
  return {
    create,
    get,
    delete: deleteVote,
  }
}
