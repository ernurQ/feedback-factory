import {Prisma} from '@prisma/client'
import {AdapterParams, UnknownTx} from '@/adapter/types'
import {IFeedback} from '@/domain/entity/feedback'

type Params = Pick<AdapterParams, 'db'>

export type Update =  (data: Prisma.FeedbackUpdateArgs, tx?: UnknownTx)=>Promise<IFeedback | never>

export const buildUpdate = ({db}: Params): Update=>{
  return async (data, tx)=>{
    return db.getContextClient(tx).feedback.update(data)
  }
}
