import {UseCaseParams} from '@/domain/usecase/types'
import {buildCreate, Create} from './create'
import {buildUpdate, Update} from './update'

export type StatusUseCase = {
  create: Create,
  update: Update,
}

export const buildStatusUseCase = (params: UseCaseParams): StatusUseCase => {
  const create = buildCreate(params)
  const update = buildUpdate(params)
  
  return {
    create,
    update,
  }
}
