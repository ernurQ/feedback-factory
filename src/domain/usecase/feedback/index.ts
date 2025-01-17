import {UseCaseParams} from '@/domain/usecase/types'
import {buildCreate, Create} from './create'

export type FeedbackUseCase = {
  create: Create,
}

export const buildFeedbackUseCase = (params: UseCaseParams): FeedbackUseCase => {
  const create = buildCreate(params)
  
  return {
    create,
  }
}
