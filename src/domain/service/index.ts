import {Adapter} from '../types'
import {AuthService, buildAuthService} from './auth'
import {buildExampleService, ExampleService} from './example'
import {buildStatusService, StatusService} from './status'

export type Service = {
  auth: AuthService;
  status: StatusService
  example: ExampleService;  
}

export const buildService = (params: Adapter): Service => {
  const auth = buildAuthService(params);
  const status = buildStatusService(params)
  const example = buildExampleService(params);
  
  return {
    auth,
    status,
    example
  }
}
  
