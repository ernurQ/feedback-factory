import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'feedback'>

export type SetCategory = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildSetCategory = ({feedback}: Params): SetCategory => {
  return async (req, res)=>{
    let categoryId =
      typeof req.query.categoryId === 'string' ?
        req.query.categoryId
        : null
    
    if (categoryId === '') {
      categoryId = null
    }
    
    const data = await feedback.setCategory({
      postAuthorId: req.user.id,
      feedbackId: req.params.id,
      categoryId
    })
    
    return res.status(200).json(data);
  }
}
