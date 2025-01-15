import {Adapter} from '@/domain/types'

export type CreateDefaultStatuses = (data: {
  postId: string
}) => Promise<{count: number} | null | never>;

export const buildCreateDefaultStatuses = ({statusRepository}: Adapter): CreateDefaultStatuses => {
  return async ({postId}) => {
    const defaultStatuses = [
      'Идея', 'Запланировано', 'В работе', 'Выполнено'
    ]
    
    return statusRepository.createMany({
      data: defaultStatuses.map(status => ({postId, name: status}))
    })
  }
}
