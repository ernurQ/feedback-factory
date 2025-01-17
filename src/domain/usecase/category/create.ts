import {UseCaseParams} from '../types'
import {NotFoundError,} from '@/domain/errors'
import {ICategory} from '@/domain/entity/category'

export type Create = (params: {
  postId: string,
  postAuthorId: string,
  categoryName: string,
}) => Promise<{
  category: ICategory,
}>;

export const buildCreate = ({ adapter }: UseCaseParams): Create => (
  async ({ postId, postAuthorId, categoryName }) => {
    const post = await adapter.postRepository.get({
      where: {
        id: postId,
        authorId: postAuthorId
      }
    })
    if (!post) throw new NotFoundError({message: 'Post not found'})
    
    const category = await adapter.categoryRepository.create({
      data: {
        postId: post.id,
        name: categoryName,
      }
    })
    
    return { category }
  }
);
