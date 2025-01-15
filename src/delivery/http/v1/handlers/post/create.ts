import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'post'>

export type Create = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildCreate = ({post}: Params): Create => {
  return async (req, res)=>{
    const data = await post.create({
      authorId: req.user?.id,
      title: req.body.title,
      description: req.body.description
    })
    
    return res.status(201).json(data);
  }
}
