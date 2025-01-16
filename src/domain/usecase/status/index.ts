import {UseCaseParams} from '@/domain/usecase/types'
import {buildCreate, Create} from './create'

export type StatusUseCase = {
  create: Create;
}

export const buildStatusUseCase = (params: UseCaseParams): StatusUseCase => {
  const create = buildCreate(params)
  return {
    create,
  }
}
