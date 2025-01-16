import {UseCaseParams} from '@/domain/usecase/types'
import {buildCreate, Create} from './create'
import {buildGetPost, GetPost} from './getPost'
import {buildUpdate, Update} from './update'
import {buildDelete, Delete} from './delete'

export type PostUseCase = {
  create: Create;
  getPost: GetPost;
  update: Update;
  delete: Delete
}

export const buildPostUseCase = (params: UseCaseParams): PostUseCase => {
  const create = buildCreate(params)
  const getPost = buildGetPost(params)
  const update = buildUpdate(params)
  const deletePost = buildDelete(params)
  
  return {
    create,
    getPost,
    update,
    delete: deletePost,
  }
}
