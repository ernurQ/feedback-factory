import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'post'>

export type GetPost = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildGetPost = ({post}: Params): GetPost => {
  return async (req, res)=>{
    const data = await post.getPost({
      postId: req.params.id
    })
    
    return res.status(200).json(data);
  }
}
