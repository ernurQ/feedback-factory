import {UseCaseParams} from '@/domain/usecase/types'
import {buildCreate, Create} from './create'

export type PostUseCase = {
  create: Create;
}

export const buildPostUseCase = (params: UseCaseParams): PostUseCase => {
  const create = buildCreate(params)
  
  return {
    create,
  }
}
