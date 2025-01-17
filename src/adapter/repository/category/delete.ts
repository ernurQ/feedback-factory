import {Prisma} from '@prisma/client'
import {AdapterParams, UnknownTx} from '@/adapter/types'
import {ICategory} from '@/domain/entity/category'

type Params = Pick<AdapterParams, 'db'>

export type Delete =  (data: Prisma.CategoryDeleteArgs, tx?: UnknownTx)=>Promise<ICategory | never>

export const buildDelete = ({db}: Params): Delete=>{
  return async (data, tx)=>{
    return db.getContextClient(tx).category.delete(data)
  }
}
