import {Request, Response} from 'express'
import {DeliveryParams} from '@/delivery/types'

type Params = Pick<DeliveryParams, 'feedback'>

export type GetMany = (req: Request, res: Response)=>Promise<Response>

export const buildGetMany = ({feedback}: Params): GetMany => {
  return async (req, res)=>{
    const {
      postId,
      statusId,
      categoryId,
      sortBy,
      orderBy,
      offset = 0,
      limit = 10,
    } = req.query as {
      postId: string,
      statusId?: string,
      categoryId?: string,
      sortBy?: 'votes' | 'createdAt' | 'updatedAt',
      orderBy?: 'asc' | 'desc',
      offset?: string,
      limit?: string,
    }
    
    const data = await feedback.getMany({
      postId,
      statusId,
      categoryId,
      sortBy,
      orderBy,
      offset: +offset,
      limit: +limit
    })
    
    return res.status(200).json(data);
  }
}
