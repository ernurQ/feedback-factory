import {Prisma} from '@prisma/client'
import {AdapterParams, UnknownTx} from '@/adapter/types'
import {IFeedback} from '@/domain/entity/feedback'

type Params = Pick<AdapterParams, 'db'>

export type Delete =  (data: Prisma.FeedbackDeleteArgs, tx?: UnknownTx)=>Promise<IFeedback | never>

export const buildDelete = ({db}: Params): Delete=>{
  return async (data, tx) => {
    return db.getContextClient(tx).feedback.delete(data)
  }
}
