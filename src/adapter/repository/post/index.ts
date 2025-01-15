import {AdapterParams} from '@/adapter/types'
import {buildCreate, Create} from './create'

type Params = Pick<AdapterParams, 'db'>

export type PostRepository = {
  create: Create,
}
export const buildPostRepository = (params: Params): PostRepository=>{
  const create = buildCreate(params)
  
  return {
    create,
  }
}
