import {UseCaseParams} from '../types'
import {NotFoundError,} from '@/domain/errors'
import {IFeedback} from '@/domain/entity/feedback'

export type Get = (params: {
  feedbackId: string,
}) => Promise<{
  feedback: IFeedback,
}>;

export const buildGet = ({ adapter }: UseCaseParams): Get => (
  async ({ feedbackId }) => {
    const feedback = await adapter.feedbackRepository.get({
      where: {
        id: feedbackId,
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            avatar: true,
          }
        },
        status: {
          select: {
            id: true,
            name: true,
          }
        },
        category: {
          select: {
            id: true,
            name: true,
          }
        },
        votes: {
          include: {
            voter: {
              select: {
                id: true,
                email: true,
                avatar: true,
              }
            }
          }
        }
      }
    })
    if (!feedback) throw new NotFoundError({message: 'Feedback not found.'})
    
    return { feedback }
  }
);
