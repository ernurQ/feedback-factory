import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'status'>

export type Update = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildUpdate = ({status}: Params): Update => {
  return async (req, res)=>{
    const data = await status.update({
      statusId: req.params.id,
      postAuthorId: req.user.id,
      updateDto: req.body,
    })
    
    return res.status(201).json(data);
  }
}
