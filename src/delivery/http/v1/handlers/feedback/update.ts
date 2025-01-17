import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'feedback'>

export type Update = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildUpdate = ({feedback}: Params): Update => {
  return async (req, res)=>{
    const data = await feedback.update({
      feedbackId: req.params.id,
      feedbackAuthorId: req.user.id,
      updateDto: req.body,
    })
    
    return res.status(200).json(data);
  }
}
