import {Prisma} from '@prisma/client'
import {AdapterParams} from '@/adapter/types'
import {IStatus} from '@/domain/entity/status'

type Params = Pick<AdapterParams, 'db'>

export type Get =  (data: Prisma.StatusFindFirstArgs)=>Promise<IStatus | null | never>

export const buildGet = ({db}: Params): Get=>{
  return async (data)=>{
    return db.client.status.findFirst(data)
  }
}
