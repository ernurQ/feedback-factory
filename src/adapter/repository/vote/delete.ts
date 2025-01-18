import {Prisma} from '@prisma/client'
import {AdapterParams, UnknownTx} from '@/adapter/types'
import {IVote} from '@/domain/entity/vote'

type Params = Pick<AdapterParams, 'db'>

export type Delete =  (data: Prisma.VoteDeleteArgs, tx?: UnknownTx)=>Promise<IVote | never>

export const buildDelete = ({db}: Params): Delete=>{
  return async (data, tx)=>{
    return db.getContextClient(tx).vote.delete(data)
  }
}
