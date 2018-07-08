import deepFreeze from 'deep-freeze'
import rankingReducer from '../reducers/rankingReducer'

describe('rankingReducer ', () => {
    const initialState = {allRankings: [], selectedRanking: {}, loading: false}
    it(' should return a proper initial state when called with undefined state', () => {
        const action = {
          type: 'DO_NOTHING'
        }
        const newState = rankingReducer(undefined, action)
        expect(newState).toEqual(initialState)
      })
})