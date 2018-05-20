import axios from 'axios'
const baseUrl = "/api/ranking"

const createRanking = async (credentials) => {
  console.log('rankigService create', credentials)
  const url = baseUrl + "/new"
  const response =  await axios.post(url, credentials, getConfigObject())
  return response.data
}

let token = ''

const getConfigObject = () => {
    console.log('TOKEN ', token)
    return {
        headers: { 'Authorization': token }
      }
}

export const tokenChanger = store => next => action => {
    next(action)
    const state = store.getState()
    console.log("state",state)
    const newToken = state.login.token
    token = `bearer ${newToken}`
  }

export default { createRanking }