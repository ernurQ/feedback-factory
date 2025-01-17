import {UseCaseParams} from '../types'
import {IFeedback} from '@/domain/entity/feedback'


export type GetMany = (params: {
  postId: string,
  statusId?: string,
  categoryId?: string,
  sortBy?: 'votes' | 'createdAt' | 'updatedAt',
  orderBy?: 'asc' | 'desc',
  offset: number,
  limit: number,
}) => Promise<{
  feedbacks: Array<IFeedback>,
}>;

export const buildGetMany = ({ adapter }: UseCaseParams): GetMany => (
  async (
    {
      postId,
      statusId,
      categoryId,
      sortBy = 'updatedAt',
      orderBy: reqOrderBy = 'desc',
      offset,
      limit
    }) => {
    let orderBy
    
    if (sortBy === 'votes') {
      orderBy = {
        votes: {
          _count: reqOrderBy
        }
      }
    }
    else {
      orderBy = {
        [sortBy]: reqOrderBy,
      }
    }
    
    const feedbacks = await adapter.feedbackRepository.getMany({
      where: {
        postId,
        statusId,
        categoryId,
      },
      include: {
        _count: {
          select: {
            votes: true
          }
        }
      },
      orderBy,
      skip: offset,
      take: limit,
    })
    
    return { feedbacks }
  }
);
