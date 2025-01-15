import {Prisma} from '@prisma/client'
import {AdapterParams, UnknownTx} from '@/adapter/types'
import {IStatus} from '@/domain/entity/status'

type Params = Pick<AdapterParams, 'db'>

export type Create =  (data: Prisma.StatusCreateArgs, tx?: UnknownTx)=>Promise<IStatus | never>
export const buildCreate = ({db}: Params): Create=>{
  return async (data, tx)=>{
    return db.getContextClient(tx).status.create(data)
  }
}
