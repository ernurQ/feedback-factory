import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'post'>

export type Update = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildUpdate = ({post}: Params): Update => {
  return async (req, res)=>{
    const data = await post.update({
      authorId: req.user.id,
      postId: req.params.id,
      updateDto: req.body,
    })
    
    return res.status(200).json(data);
  }
}
