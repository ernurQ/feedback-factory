import {Adapter} from '@/domain/types'
import {
  buildCreateDefaultStatuses,
  CreateDefaultStatuses
} from './createDefaultStatuses'

export type StatusService = {
  createDefaultStatuses: CreateDefaultStatuses
}

export const buildStatusService = (params: Adapter): StatusService =>{
  const createDefaultStatuses = buildCreateDefaultStatuses(params)
  
  return {
    createDefaultStatuses,
  }
}
