import {Prisma} from '@prisma/client'
import {AdapterParams, UnknownTx} from '@/adapter/types'
import {IStatus} from '@/domain/entity/status'

type Params = Pick<AdapterParams, 'db'>

export type Update =  (data: Prisma.StatusUpdateArgs, tx?: UnknownTx)=>Promise<IStatus | never>

export const buildUpdate = ({db}: Params): Update=>{
  return async (data, tx)=>{
    return db.getContextClient(tx).status.update(data)
  }
}
