import * as ActionTypes from '../../../action-types';

export const loggingIn = () => ({type: ActionTypes.LOGGING_IN});
export const login = credentials => ({type: ActionTypes.LOGIN_PENDING, payload: credentials});
export const userAuthenticated = payload => ({type: ActionTypes.LOGIN, payload: payload.response});
export const logout = () => ({type: ActionTypes.LOGOUT_PENDING});
export const userLoggedOut = () => ({type: ActionTypes.LOGOUT});
export const changePassword = credentials => ({type: ActionTypes.CHANGE_PASSWORD_PENDING, payload: credentials});
export const passwordChanged = payload => ({type: ActionTypes.CHANGE_PASSWORD, payload: payload.response});
export const changeEmail = credentials => ({type: ActionTypes.CHANGE_EMAIL_PENDING, payload: credentials});
export const emailChanged = payload => ({type: ActionTypes.CHANGE_EMAIL, payload: payload.response});
