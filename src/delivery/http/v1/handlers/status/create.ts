import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'status'>

export type Create = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildCreate = ({status}: Params): Create => {
  return async (req, res)=>{
    const data = await status.create({
      postId: req.params.postId,
      postAuthorId: req.user.id,
      statusName: req.body.name,
    })
    
    return res.status(201).json(data);
  }
}
