import {UseCaseParams} from '@/domain/usecase/types'
import {buildUpvote, Upvote} from './upvote'

export type VoteUseCase = {
  upvote: Upvote,
}

export const buildVoteUseCase = (params: UseCaseParams): VoteUseCase => {
  const upvote = buildUpvote(params)
  
  return {
    upvote,
  }
}
