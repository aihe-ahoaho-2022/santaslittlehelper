import request from 'superagent'

const rootUrl = '/api/v1'

export function getPeets() {
  return request.get(rootUrl + '/peets').then((res) => {
    return res.body
  })
}
