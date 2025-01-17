import {UseCaseParams} from '@/domain/usecase/types'

import {buildCreate, Create} from './create'
import {buildUpdate, Update} from './update'

export type CategoryUseCase = {
  create: Create,
  update: Update,
}

export const buildCategoryUseCase = (params: UseCaseParams): CategoryUseCase => {
  const create = buildCreate(params)
  const update = buildUpdate(params)
  
  return {
    create,
    update,
  }
}
