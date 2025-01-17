import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'feedback'>

export type SetStatus = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildSetStatus = ({feedback}: Params): SetStatus => {
  return async (req, res)=>{
    let statusId =
      typeof req.query.statusId === 'string' ?
        req.query.statusId
        : null
    
    if (statusId === '') {
      statusId = null
    }
    
    const data = await feedback.setStatus({
      postAuthorId: req.user.id,
      feedbackId: req.params.id,
      statusId
    })
    
    return res.status(200).json(data);
  }
}
