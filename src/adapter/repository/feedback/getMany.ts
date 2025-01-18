import {Prisma} from '@prisma/client'
import {AdapterParams} from '@/adapter/types'
import {IFeedback} from '@/domain/entity/feedback'

type Params = Pick<AdapterParams, 'db'>

export type GetMany =  (data: Prisma.FeedbackFindManyArgs)=>Promise<Array<IFeedback> | never>

export const buildGetMany = ({db}: Params): GetMany=>{
  return async (data)=>{
    return db.client.feedback.findMany(data)
  }
}
