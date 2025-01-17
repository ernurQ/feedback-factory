import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'category'>

export type Create = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildCreate = ({category}: Params): Create => {
  return async (req, res)=>{
    const data = await category.create({
      postId: req.params.postId,
      postAuthorId: req.user.id,
      categoryName: req.body.name,
    })
    
    return res.status(201).json(data);
  }
}
