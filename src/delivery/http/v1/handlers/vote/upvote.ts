import {Response} from 'express'
import {DeliveryParams} from '@/delivery/types'
import {AuthRequest} from '@/delivery/http/v1/handlers/types'

type Params = Pick<DeliveryParams, 'vote'>

export type Upvote = (req: AuthRequest, res: Response)=>Promise<Response>

export const buildUpvote = ({vote}: Params): Upvote => {
  return async (req, res)=>{
    const data = await vote.upvote({
      feedbackId: req.params.feedbackId,
      voterId: req.user.id,
    })
    
    return res.status(200).json(data);
  }
}
