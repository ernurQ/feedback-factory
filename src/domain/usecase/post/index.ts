import {UseCaseParams} from '@/domain/usecase/types'
import {buildCreate, Create} from './create'
import {buildGetPost, GetPost} from './getPost'
import {buildUpdate, Update} from './update'

export type PostUseCase = {
  create: Create;
  getPost: GetPost;
  update: Update;
}

export const buildPostUseCase = (params: UseCaseParams): PostUseCase => {
  const create = buildCreate(params)
  const getPost = buildGetPost(params)
  const update = buildUpdate(params)
  
  return {
    create,
    getPost,
    update,
  }
}
