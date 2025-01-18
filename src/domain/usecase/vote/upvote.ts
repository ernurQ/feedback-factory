import {NotFoundError} from '@/domain/errors'
import {UseCaseParams} from '../types'
import {IVote} from '@/domain/entity/vote'

export type Upvote = (params: {
  voterId: string;
  feedbackId: string;
}) => Promise<{
  vote: IVote;
}>;

export const buildUpvote = ({ adapter }: UseCaseParams): Upvote => (
  async ({ voterId, feedbackId }) => {
    const existingVote = await adapter.voteRepository.get({
      where: {
        feedbackId,
        voterId,
      }
    })
    
    if (existingVote) {
      const deletedVote = await adapter.voteRepository.delete({
        where: {
          id: existingVote.id
        }
      })
      
      return { vote: deletedVote }
    }
    
    const feedback = await adapter.feedbackRepository.get({
      where: {
        id: feedbackId,
      }
    })
    if (!feedback) throw new NotFoundError({message: 'Feedback not found.'})
    
    const voter = await adapter.userRepository.get({
      where: {
        id: voterId,
      }
    })
    if (!voter) throw new NotFoundError({message: 'User not found.'})
    
    const newVote = await adapter.voteRepository.create({
      data: {
        voterId,
        feedbackId,
      }
    })
    
    return { vote: newVote };
  }
);
