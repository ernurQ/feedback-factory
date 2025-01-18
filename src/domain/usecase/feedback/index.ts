import {UseCaseParams} from '@/domain/usecase/types'

import {buildCreate, Create} from './create'
import {buildUpdate, Update} from './update'
import {buildSetStatus, SetStatus} from './setStatus'
import {buildSetCategory, SetCategory} from './setCategory'
import {buildDelete, Delete} from './delete'
import {buildGetMany, GetMany} from './getMany'
import {buildGet, Get} from './get'

export type FeedbackUseCase = {
  create: Create,
  update: Update,
  setStatus: SetStatus,
  setCategory: SetCategory,
  delete: Delete,
  getMany: GetMany,
  get: Get,
}

export const buildFeedbackUseCase = (params: UseCaseParams): FeedbackUseCase => {
  const create = buildCreate(params)
  const update = buildUpdate(params)
  const setStatus = buildSetStatus(params)
  const setCategory = buildSetCategory(params)
  const deleteFeedback = buildDelete(params)
  const getMany = buildGetMany(params)
  const get = buildGet(params)
  
  return {
    create,
    update,
    setStatus,
    setCategory,
    delete: deleteFeedback,
    getMany,
    get,
  }
}
