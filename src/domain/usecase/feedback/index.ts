import {UseCaseParams} from '@/domain/usecase/types'

import {buildCreate, Create} from './create'
import {buildUpdate, Update} from './update'

export type FeedbackUseCase = {
  create: Create,
  update: Update,
}

export const buildFeedbackUseCase = (params: UseCaseParams): FeedbackUseCase => {
  const create = buildCreate(params)
  const update = buildUpdate(params)
  
  return {
    create,
    update,
  }
}
