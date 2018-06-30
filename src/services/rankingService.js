import axios from 'axios'
const baseUrl = "/api/ranking"

const createRanking = async (credentials) => {
  const url = baseUrl + "/new"
  const response =  await axios.post(url, credentials, getConfigObject())
  return response.data
}

const getRankings = async () => {
  const url = baseUrl + "/"
  const response =  await axios.get(url)
  return response.data
}

let token = ''

const getConfigObject = () => {
    return {
        headers: { 'Authorization': token }
      }
}

export const tokenChanger = store => next => action => {
    next(action)
    const state = store.getState()
    const newToken = state.login.token
    token = `bearer ${newToken}`
  }

export default { createRanking, getRankings }