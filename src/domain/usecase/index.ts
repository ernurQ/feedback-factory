import {UseCaseParams} from './types'

import {AuthUseCase, buildAuthUseCase} from './auth'
import {buildPostUseCase, PostUseCase} from './post'
import {buildStatusUseCase, StatusUseCase} from './status'
import {buildCategoryUseCase, CategoryUseCase} from './category'
import {buildExampleUseCase, ExampleUseCase} from './example'

export type UseCase = {
  auth: AuthUseCase,
  post: PostUseCase,
  status: StatusUseCase,
  category: CategoryUseCase,
  example: ExampleUseCase,
}

export const buildUseCase = (params: UseCaseParams): UseCase => {
  const auth = buildAuthUseCase(params)
  const post = buildPostUseCase(params)
  const status = buildStatusUseCase(params)
  const category = buildCategoryUseCase(params)
  const example = buildExampleUseCase(params)

  return {
    auth,
    post,
    status,
    category,
    example,
  }
}
