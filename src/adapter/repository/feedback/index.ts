import {AdapterParams} from '@/adapter/types'

import {buildCreate, Create} from './create'

type Params = Pick<AdapterParams, 'db'>

export type FeedbackRepository = {
  create: Create,
}

export const buildFeedbackRepository = (params: Params): FeedbackRepository=>{
  const create = buildCreate(params)
  
  return {
    create,
  }
}
