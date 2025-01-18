import {Request, Response} from 'express'
import {DeliveryParams} from '@/delivery/types'

type Params = Pick<DeliveryParams, 'feedback'>

export type GetMany = (req: Request, res: Response)=>Promise<Response>

export const buildGetMany = ({feedback}: Params): GetMany => {
  return async (req, res)=>{
    const {
      postId,
      statusId,
      categoryId
    } = req.query
    
    const data = await feedback.getMany({
      postId: postId as string,
      statusId: statusId as string | undefined,
      categoryId: categoryId as string | undefined,
    })
    
    return res.status(200).json(data);
  }
}
