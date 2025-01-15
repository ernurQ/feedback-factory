import {Prisma} from '@prisma/client'
import {AdapterParams, UnknownTx} from '@/adapter/types'

type Params = Pick<AdapterParams, 'db'>

export type CreateMany =  (data: Prisma.StatusCreateManyArgs, tx?: UnknownTx)=>Promise<{count:number} | never>

export const buildCreateMany = ({db}: Params): CreateMany=>{
  return async (data, tx)=>{
    return db.getContextClient(tx).status.createMany(data)
  }
}
