import {Prisma} from '@prisma/client'
import {AdapterParams, UnknownTx} from '@/adapter/types'
import {IVote} from '@/domain/entity/vote'

type Params = Pick<AdapterParams, 'db'>

export type Create =  (data: Prisma.VoteCreateArgs, tx?: UnknownTx)=>Promise<IVote | never>

export const buildCreate = ({db}: Params): Create=>{
  return async (data, tx)=>{
    return db.getContextClient(tx).vote.create(data)
  }
}
