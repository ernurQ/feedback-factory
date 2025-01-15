import {IUser} from '@/domain/entity/user'
import {UnauthorizedError} from '@/domain/errors'
import {UseCaseParams} from '../types'

export type Authorize = (data: {
  email: string,
  password: string,
}) =>
    Promise<{
      user: IUser,
      accessToken: string
    } | never>

export const buildAuthorize = ({
  service,
}: UseCaseParams): Authorize => {
  return async ({email, password}) => {
    
    const user = await service.auth.checkCredentials({
      email,
      password
    })

    if (!user) {
      throw new UnauthorizedError()
    }

    const {refreshToken, accessToken} = await service.auth.signAuthTokens({
      user
    })

    return {
      user,
      accessToken,
      refreshToken
    }
  }
}
