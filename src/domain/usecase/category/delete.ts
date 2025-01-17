import {UseCaseParams} from '../types'
import {NotFoundError,} from '@/domain/errors'
import {ICategory} from '@/domain/entity/category'

export type Delete = (params: {
  categoryId: string,
  postAuthorId: string,
}) => Promise<{
  category: ICategory,
}>;

export const buildDelete = ({ adapter }: UseCaseParams): Delete => (
  async ({ categoryId, postAuthorId }) => {
    const category = await adapter.categoryRepository.get({
      where: {
        id: categoryId,
        post: {
          authorId: postAuthorId,
        }
      }
    })
    if (!category) throw new NotFoundError({message: 'Category not found'})
    
    const deletedCategory = await adapter.categoryRepository.delete({
      where: {
        id: category.id
      }
    })
    
    return { category: deletedCategory }
  }
);
