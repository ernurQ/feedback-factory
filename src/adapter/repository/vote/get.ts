import {Prisma} from '@prisma/client'
import {AdapterParams} from '@/adapter/types'
import {IVote} from '@/domain/entity/vote'

type Params = Pick<AdapterParams, 'db'>

export type Get =  (data: Prisma.VoteFindFirstArgs)=>Promise<IVote | null | never>

export const buildGet = ({db}: Params): Get=>{
  return async (data)=>{
    return db.client.vote.findFirst(data)
  }
}
