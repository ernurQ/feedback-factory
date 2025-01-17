import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'feedback'>

export type Delete = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildDelete = ({feedback}: Params): Delete => {
  return async (req, res)=>{
    const data = await feedback.delete({
      userId: req.user.id,
      feedbackId: req.params.id,
    })
    
    return res.status(200).json(data);
  }
}
