import {UseCaseParams} from '@/domain/usecase/types'
import {buildCreate, Create} from './create'
import {buildUpdate, Update} from './update'
import {buildDelete, Delete} from './delete'

export type StatusUseCase = {
  create: Create,
  update: Update,
  delete: Delete,
}

export const buildStatusUseCase = (params: UseCaseParams): StatusUseCase => {
  const create = buildCreate(params)
  const update = buildUpdate(params)
  const deleteStatus = buildDelete(params)
  
  return {
    create,
    update,
    delete: deleteStatus,
  }
}
