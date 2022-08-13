import BaseService, { GetResponse } from './base.service'

export default class DestinationService extends BaseService {
  endpointPrefix: string

  constructor () {
    super()
    this.endpointPrefix = 'destinations/'
  }

 

  async GetAllDestinations (): Promise<GetResponse> {
    return await this.get(this.formatTotalEndPoint(this.endpointPrefix, 'GetAllDestinations'));
  }
  async GetAllTags (): Promise<GetResponse> {
    return await this.get(this.formatTotalEndPoint(this.endpointPrefix, 'tags'));
  }
}
