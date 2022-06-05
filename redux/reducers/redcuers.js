import { combineReducers } from 'redux';

import { authReducer, userReducer, loadedUserReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './userReducers'

import { todoReducer } from './todoReducers'
import { searchUserReducer } from './friendReducers';

const reducer = combineReducers({

    auth: authReducer,
    user: userReducer,
    loadedUser: loadedUserReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
    searchUser: searchUserReducer,
    todo: todoReducer,


})

export default reducer