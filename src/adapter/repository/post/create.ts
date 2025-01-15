import {Prisma} from '@prisma/client'
import {AdapterParams, UnknownTx} from '@/adapter/types'
import {IPost} from '@/domain/entity/post'

type Params = Pick<AdapterParams, 'db'>

export type Create =  (data: Prisma.PostCreateArgs, tx?: UnknownTx) => Promise<IPost | never>

export const buildCreate = ({db}: Params): Create=>{
  return async (data, tx)=>{
    return db.getContextClient(tx).post.create(data)
  }
}
