import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'category'>

export type Delete = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildDelete = ({category}: Params): Delete => {
  return async (req, res)=>{
    const data = await category.delete({
      categoryId: req.params.id,
      postAuthorId: req.user.id,
    })
    
    return res.status(200).json(data);
  }
}
