import {Prisma} from '@prisma/client'
import {AdapterParams} from '@/adapter/types'
import {IFeedback} from '@/domain/entity/feedback'

type Params = Pick<AdapterParams, 'db'>

export type Get =  (data: Prisma.FeedbackFindFirstArgs)=>Promise<IFeedback | null | never>

export const buildGet = ({db}: Params): Get=>{
  return async (data)=>{
    return db.client.feedback.findFirst(data)
  }
}
