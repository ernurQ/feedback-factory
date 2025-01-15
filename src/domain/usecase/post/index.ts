import {UseCaseParams} from '@/domain/usecase/types'
import {buildCreate, Create} from './create'
import {buildGetPost, GetPost} from './getPost'

export type PostUseCase = {
  create: Create;
  getPost: GetPost
}

export const buildPostUseCase = (params: UseCaseParams): PostUseCase => {
  const create = buildCreate(params)
  const getPost = buildGetPost(params)
  
  return {
    create,
    getPost,
  }
}
