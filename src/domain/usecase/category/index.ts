import {UseCaseParams} from '@/domain/usecase/types'

import {buildCreate, Create} from './create'
import {buildUpdate, Update} from './update'
import {buildDelete, Delete} from './delete'

export type CategoryUseCase = {
  create: Create,
  update: Update,
  delete: Delete,
}

export const buildCategoryUseCase = (params: UseCaseParams): CategoryUseCase => {
  const create = buildCreate(params)
  const update = buildUpdate(params)
  const deleteCategory = buildDelete(params)
  
  return {
    create,
    update,
    delete: deleteCategory,
  }
}
