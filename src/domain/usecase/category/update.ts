import {NotFoundError} from '@/domain/errors'
import {UseCaseParams} from '../types'
import {ICategory} from '@/domain/entity/category'

export type Update = (params: {
  postAuthorId: string,
  statusId: string,
  updateDto: {
    name?: string
  }
}) => Promise<{
  category: ICategory,
}>;

export const buildUpdate = ({ adapter }: UseCaseParams): Update => (
  async ({ postAuthorId, statusId, updateDto}) => {
    const category = await adapter.categoryRepository.get({
      where: {
        id: statusId,
        post: {
          authorId: postAuthorId
        }
      }
    })
    if (!category) throw new NotFoundError({message: 'Category not found'})
    
    const updatedCategory = await adapter.categoryRepository.update({
      where: {
        id: statusId,
      },
      data: { ...updateDto },
    })
    
    return { category: updatedCategory }
  }
);
