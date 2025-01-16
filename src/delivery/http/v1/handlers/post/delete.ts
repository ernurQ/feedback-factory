import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'post'>

export type Delete = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildDelete = ({post}: Params): Delete => {
  return async (req, res)=>{
    const data = await post.delete({
      authorId: req.user.id,
      postId: req.params.id,
    })
    
    return res.status(200).json(data);
  }
}
