import rankingService from '../services/rankingService'
import { dispatchNotification } from './notificationReducer'

const initialState = []

const reducer = (store = initialState, action) => {
    if (action.type === 'CREATE_RANKING') {
        const newList = [...store, action.content]
        return newList
    }
    return store 
}

export const createRanking = (content) => {
      return async (dispatch) => {
        try {
          const response = await rankingService.createRanking(content)
          const message =  'Ranking ' + content.rankingName + ' was created succsefully!'
          dispatch({
            type: 'CREATE_RANKING',
            content: response
          })
          dispatchNotification(dispatch,message)  
        }
        catch(error) {
         dispatchNotification(dispatch, 'Error at creating ranking.')
        }
      }
}

export const getRankings = () => {
  return async (dispatch) => {
    try {
      const response = await rankingService.getRankings()
      const message =  'Rankings fetched successfully!'
      dispatch({
        type: 'SET_RANKINGS',
        content: response
      })
      dispatchNotification(dispatch,message)  
    }
    catch(error) {
     dispatchNotification(dispatch, 'Error while fetching ranking.')
    }
  }
}


export default reducer