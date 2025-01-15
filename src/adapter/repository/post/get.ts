import {Prisma} from '@prisma/client'
import {AdapterParams} from '@/adapter/types'
import {IPost} from '@/domain/entity/post'

type Params = Pick<AdapterParams, 'db'>

export type Get =  (data: Prisma.PostFindFirstArgs) => Promise<IPost | null | never>

export const buildGet = ({db}: Params): Get=>{
  return async (data)=>{
    return db.client.post.findFirst(data)
  }
}
