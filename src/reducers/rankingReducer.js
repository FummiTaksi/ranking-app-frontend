import rankingService from '../services/rankingService'
import { dispatchNotification } from './notificationReducer'

const initialState ={ allRankings: [] , selectedRanking: {} }

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

export const createRanking = (createContent) => {
      return async (dispatch) => {
        try {
          const response = await rankingService.createRanking(createContent)
          const header = 'Ranking ' + createContent.rankingName + ' was created succsefully!'
          const content = 'Click Rankings to view ranking you created.'
          const icon = 'thumbs up'
          dispatch({
            type: 'CREATE_RANKING',
            content: response
          })
          dispatchNotification(dispatch,{header, content, icon})  
        }
        catch(error) {
          const header = 'Error occured while creating ranking'
          const content = 'Make sure excel file is correct rating file'
          const icon = 'thumbs down'
         dispatchNotification(dispatch, {header, content, icon})
        }
      }
}

export const deleteRanking = (rankingId) => {
  return async (dispatch) => {
    try {
      const response = await rankingService.deleteRanking(rankingId)
      const header = 'Ranking ' + response.deletedRanking.competitionName + ' was deleted succsefully!'
      const content = 'Page should update list automatically'
      const icon = 'thumbs up'
      dispatch({
        type: 'DELETE_RANKING',
        content: response
      })
      dispatchNotification(dispatch,{header, content, icon})  
    }
    catch(error) {
      const header = 'Error occured while deleting ranking'
      const content = 'Try again later'
      const icon = 'thumbs down'
     dispatchNotification(dispatch, {header, content, icon})
    }
  }
}

export const getRankings = () => {
  return async (dispatch) => {
    try {
      const response = await rankingService.getRankings()
      const header = 'Rankings fetched successfully!'
      const content = ''
      const icon = 'list ul'
      dispatch({
        type: 'SET_RANKINGS',
        content: response
      })
      dispatchNotification(dispatch,{header, content, icon})  
    }
    catch(error) {
      const header = 'Error while fetching rankings'
      const content = 'Try again later'
      const icon = 'thumbs down'
     dispatchNotification(dispatch, {header, content, icon})
    }
  }
}

export const getRanking = (rankingId) => {
  return async (dispatch) => {
    try {
      const response = await rankingService.getRanking(rankingId)
      const header = 'Ranking ' + response.ranking.competitionName + ' fetched successfully!'
      const content = 'Have fun browsing!'
      const icon = 'trophy'
      dispatch({
        type: 'GET_RANKING',
        content: response
      })
      dispatchNotification(dispatch,{header, content, icon})  
    }
    catch(error) {
      const header = 'Error while fetching ranking'
      const content = 'Try again later'
      const icon = 'thumbs down'
     dispatchNotification(dispatch, {header,content,icon})
    }
  }
}

export default reducer