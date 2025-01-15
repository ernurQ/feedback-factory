import {AuthUseCase, buildAuthUseCase} from './auth'
import {buildExampleUseCase, ExampleUseCase} from './example'
import {UseCaseParams} from './types'
import {buildPostUseCase, PostUseCase} from './post'

export type UseCase = {
  auth: AuthUseCase;
  post: PostUseCase
  example: ExampleUseCase;
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params);
  const post = buildPostUseCase(params);
  const example = buildExampleUseCase(params);

  return {
    auth,
    post,
    example
  }
}
