import {UseCaseParams} from '../types'
import {NotFoundError,} from '@/domain/errors'
import {IStatus} from '@/domain/entity/status'

export type Delete = (params: {
  statusId: string,
  postAuthorId: string,
}) => Promise<{
  status: IStatus,
}>;

export const buildDelete = ({ adapter }: UseCaseParams): Delete => (
  async ({ statusId, postAuthorId }) => {
    const status = await adapter.statusRepository.get({
      where: {
        id: statusId,
        post: {
          authorId: postAuthorId,
        }
      }
    })
    if (!status) throw new NotFoundError({message: 'Status not found'})
    
    const deletedStatus = await adapter.statusRepository.delete({
      where: {
        id: status.id
      }
    })
    
    return { status: deletedStatus }
  }
);
