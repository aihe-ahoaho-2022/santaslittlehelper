import request from 'superagent'

export function getRandomDrink() {
  return request.get(`/api/v1/drinks`).then((response) => {
    return response.body.drinks[0]
  })
}
