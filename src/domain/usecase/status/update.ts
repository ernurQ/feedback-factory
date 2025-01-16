import {NotFoundError} from '@/domain/errors'
import {UseCaseParams} from '../types'
import {IStatus} from '@/domain/entity/status'

export type Update = (params: {
  postAuthorId: string,
  statusId: string,
  updateDto: {
    name?: string
  }
}) => Promise<{
  status: IStatus,
}>;

export const buildUpdate = ({ adapter }: UseCaseParams): Update => (
  async ({ postAuthorId, statusId, updateDto}) => {
    const status = await adapter.statusRepository.get({
      where: {
        id: statusId,
        post: {
          authorId: postAuthorId
        }
      }
    })
    if (!status) throw new NotFoundError({message: 'Status not found'})
    
    const updatedStatus = await adapter.statusRepository.update({
      where: {
        id: statusId,
      },
      data: { ...updateDto },
    })
    
    return { status: updatedStatus }
  }
);
