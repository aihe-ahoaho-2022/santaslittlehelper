import request from 'superagent'

export function getInvitesApi() {
  ///api/invite
  return request.get('/api/invite/:invite_code').then((res) => {
    return res.body
  })
}
