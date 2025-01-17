import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'feedback'>

export type Create = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildCreate = ({feedback}: Params): Create => {
  return async (req, res)=>{
    const data = await feedback.create({
      authorId: req.user.id,
      createDto: req.body,
      postId: req.params.postId
    })
    
    return res.status(201).json(data);
  }
}
