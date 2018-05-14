import loginService from '../services/loginService'
import { dispatchNotification } from './notificationReducer'

const initialState = {
    username: undefined,
    name: undefined,
    token : ""
}

const reducer = (store = initialState, action) => {
    if (action.type === 'LOGIN') {
        const userInfo = {
            username: action.username,
            token: action.token,
            name: action.name
        }
        window.localStorage.setItem('loggedUser', JSON.stringify(userInfo))
        return {
            username: action.username,
            name: action.name,
            token: action.token
        }
    }
    if (action.type === 'LOGOUT') {
        window.localStorage.removeItem('loggedUser')
        return {
            username: undefined,
            name: undefined,
            token: ""
        }
    }
    return store 
}

export const login = (credentials) => {
    return async (dispatch) => {
        try {
            const response = await loginService.login(credentials)
            console.log("response",response)
            dispatch({
                type: 'LOGIN',
                username: response.username,
                name: response.name,
                token: response.token
            })
            const message = 'Welcome back ' + response.name + '!'
            dispatchNotification(dispatch, message)
        }
        catch(error) {
            dispatchNotification(dispatch, 'Wrong username or password!')
        }
    }
}
export const logout = () => {
    return async (dispatch) => {
        dispatch({
            type: 'LOGOUT'
        })
        dispatchNotification(dispatch, 'Thank you, come again!')
    }
}

export const initCurrentUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const credentials = JSON.parse(loggedUserJSON)
          dispatch({
              type: 'LOGIN',
              username: credentials.username,
              name: credentials.name,
              token: credentials.token
          })
        }
    }
}

export default reducer