import {AuthUseCase, buildAuthUseCase} from './auth'
import {buildExampleUseCase, ExampleUseCase} from './example'
import {UseCaseParams} from './types'
import {buildPostUseCase, PostUseCase} from './post'
import {buildStatusUseCase, StatusUseCase} from '@/domain/usecase/status'

export type UseCase = {
  auth: AuthUseCase,
  post: PostUseCase,
  status: StatusUseCase,
  example: ExampleUseCase,
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const post = buildPostUseCase(params);
  const status = buildStatusUseCase(params)
  const example = buildExampleUseCase(params);

  return {
    auth,
    post,
    status,
    example,
  }
}
