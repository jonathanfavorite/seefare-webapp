export interface GetResponse {
    success: boolean
    data: any
  }
  export default class BaseService {
    baseUrl: string
    constructor () {
      this.baseUrl = 'https://seefare-api.conveyor.cloud/'
    }
    formatTotalEndPoint (endpointPrefix: string, endpoint: string): string {
      return `${this.baseUrl}${endpointPrefix}${endpoint}`
    }
    async get (url: string): Promise<GetResponse> {
      let apiResponse: GetResponse = {
        success: false,
        data: null
      }
      let f =  await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*', // * means all

        }
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
          apiResponse.success = true
          apiResponse.data = data
        } else {
          apiResponse.success = false
          apiResponse.data = 'data is null'
        }
      })
      .catch(error => {
        apiResponse.data = error
        apiResponse.success = false
      })
      
      return apiResponse
    }
  }
  