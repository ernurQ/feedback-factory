import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'status'>

export type Delete = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildDelete = ({status}: Params): Delete => {
  return async (req, res)=>{
    const data = await status.delete({
      statusId: req.params.id,
      postAuthorId: req.user.id
    })
    
    return res.status(200).json(data);
  }
}
