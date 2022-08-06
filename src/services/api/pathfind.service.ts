import BaseService, { GetResponse } from './base.service'

export default class PathfindService extends BaseService {
  endpointPrefix: string

  constructor () {
    super()
    this.endpointPrefix = 'pathfind/'
  }

 async Pathfind(fromLat: number, fromLng: number, toID: number): Promise<GetResponse> {
    return await this.get(this.formatTotalEndPoint(this.endpointPrefix, `${fromLat}/${fromLng}/${toID}`));
 }
}
