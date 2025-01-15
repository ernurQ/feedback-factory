import {buildExampleGateway, ExampleGateway} from './gateway/example'
import {buildUserRepository, UserRepository} from './repository/user'
import {buildStatusRepository, StatusRepository} from './repository/status'
import {AdapterParams} from './types'
import {buildPostRepository, PostRepository} from '@/adapter/repository/post'

export type Adapter = {
  userRepository: UserRepository;
  postRepository: PostRepository;
  statusRepository: StatusRepository
  exampleGateway: ExampleGateway;
}

export const buildAdapter = (params: AdapterParams): Adapter => {
  const userRepository = buildUserRepository(params);
  const postRepository = buildPostRepository(params)
  const statusRepository = buildStatusRepository(params)
  const exampleGateway = buildExampleGateway(params);

  return {
    userRepository,
    postRepository,
    statusRepository,
    exampleGateway
  }
}
