import {AdapterParams} from '@/adapter/types'
import {buildCreate, Create} from './create'

type Params = Pick<AdapterParams, 'db'>

export type CategoryRepository = {
  create: Create,
}

export const buildCategoryRepository = (params: Params): CategoryRepository=>{
  const create = buildCreate(params)
  
  return {
    create,
  }
}
