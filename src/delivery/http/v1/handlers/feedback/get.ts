import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'feedback'>

export type Get = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildGet = ({feedback}: Params): Get => {
  return async (req, res)=>{
    const data = await feedback.get({
      feedbackId: req.params.id,
    })
    
    return res.status(201).json(data);
  }
}
