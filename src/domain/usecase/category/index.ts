import {UseCaseParams} from '@/domain/usecase/types'
import {buildCreate, Create} from './create'

export type CategoryUseCase = {
  create: Create,
}

export const buildCategoryUseCase = (params: UseCaseParams): CategoryUseCase => {
  const create = buildCreate(params)
  
  return {
    create,
  }
}
