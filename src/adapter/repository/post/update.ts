import {Prisma} from '@prisma/client'
import {AdapterParams, UnknownTx} from '@/adapter/types'
import {IPost} from '@/domain/entity/post'

type Params = Pick<AdapterParams, 'db'>

export type Update =  (data: Prisma.PostUpdateArgs, tx?: UnknownTx) => Promise<IPost | never>

export const buildUpdate = ({db}: Params): Update=>{
  return async (data, tx)=>{
    return db.getContextClient(tx).post.update(data)
  }
}
