import rankingService from '../services/rankingService'
import { dispatchNotification } from './notificationReducer'

const initialState ={allRankings: [] , selectedRanking: {}}

const reducer = (store = initialState, action) => {
    if (action.type === 'CREATE_RANKING') {
        const allRankings = [...store.allRankings, action.content.ranking]
        const newState = {...store, allRankings}
        return newState
    }
    if (action.type === 'SET_RANKINGS') {
      const newState = {...store, allRankings: action.content.rankings}
      return newState
    }
    if (action.type === 'DELETE_RANKING') {
      const notDeleted = store.allRankings.filter(b => b._id !== action.content.deletedRanking._id)
      const newState = {...store, allRankings: notDeleted}
      return newState
    }
    if (action.type === 'GET_RANKING') {
      const newState = {...store, selectedRanking: action.content.ranking}
      return newState
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

export const getRanking = (rankingId) => {
  return async (dispatch) => {
    try {
      const response = await rankingService.getRanking(rankingId)
      const message =  'Ranking ' + response.ranking.competitionName + ' fetched successfully!'
      dispatch({
        type: 'GET_RANKING',
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