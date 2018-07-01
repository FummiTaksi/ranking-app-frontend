import rankingService from '../services/rankingService'
import { dispatchNotification } from './notificationReducer'

const initialState = []

const reducer = (store = initialState, action) => {
    if (action.type === 'CREATE_RANKING') {
        const newList = [...store, action.content.ranking]
        return newList
    }
    if (action.type === 'SET_RANKINGS') {
      return action.content.rankings;
    }
    if (action.type === 'DELETE_RANKING') {
      const notDeleted = store.filter(b => b._id !== action.content.deletedRanking._id)
      return notDeleted
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

export const deleteRanking = (rankingId) => {
  return async (dispatch) => {
    try {
      const response = await rankingService.deleteRanking(rankingId)
      const message =  'Ranking ' + response.deletedRanking.competitionName + ' was deleted succsefully!'
      dispatch({
        type: 'DELETE_RANKING',
        content: response
      })
      dispatchNotification(dispatch,message)  
    }
    catch(error) {
     dispatchNotification(dispatch, 'Error while deleting ranking.')
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
     dispatchNotification(dispatch, 'Error while fetching rankings.')
    }
  }
}


export default reducer