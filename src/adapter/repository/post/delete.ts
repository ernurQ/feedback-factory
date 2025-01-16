import {Prisma} from '@prisma/client'
import {AdapterParams, UnknownTx} from '@/adapter/types'
import {IPost} from '@/domain/entity/post'

type Params = Pick<AdapterParams, 'db'>

export type Delete =  (data: Prisma.PostDeleteArgs, tx?: UnknownTx) => Promise<IPost | never>

export const buildDelete = ({db}: Params): Delete => {
  return async (data, tx)=>{
    return db.getContextClient(tx).post.delete(data)
  }
}
