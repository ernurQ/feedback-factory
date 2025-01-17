import {Prisma} from '@prisma/client'

import {AdapterParams, UnknownTx} from '@/adapter/types'
import {ICategory} from '@/domain/entity/category'

type Params = Pick<AdapterParams, 'db'>

export type Update =  (data: Prisma.CategoryUpdateArgs, tx?: UnknownTx)=>Promise<ICategory | never>

export const buildUpdate = ({db}: Params): Update=>{
  return async (data, tx)=>{
    return db.getContextClient(tx).category.update(data)
  }
}
