import {AdapterParams} from './types'
import {buildExampleGateway, ExampleGateway} from './gateway/example'

import {buildUserRepository, UserRepository} from './repository/user'
import {buildPostRepository, PostRepository} from './repository/post'
import {buildStatusRepository, StatusRepository} from './repository/status'
import {
  buildCategoryRepository,
  CategoryRepository
} from './repository/category'
import {
  buildFeedbackRepository,
  FeedbackRepository
} from './repository/feedback'
import {buildVoteRepository, VoteRepository} from './repository/vote'

export type Adapter = {
  userRepository: UserRepository,
  postRepository: PostRepository,
  statusRepository: StatusRepository,
  categoryRepository: CategoryRepository,
  feedbackRepository: FeedbackRepository,
  voteRepository: VoteRepository,
  exampleGateway: ExampleGateway,
}

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const postRepository = buildPostRepository(params)
  const statusRepository = buildStatusRepository(params)
  const categoryRepository = buildCategoryRepository(params)
  const feedbackRepository = buildFeedbackRepository(params)
  const voteRepository = buildVoteRepository(params)
  const exampleGateway = buildExampleGateway(params);

  return {
    userRepository,
    postRepository,
    statusRepository,
    categoryRepository,
    feedbackRepository,
    voteRepository,
    exampleGateway
  }
}
