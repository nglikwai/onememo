import { combineReducers } from 'redux';

import { allRoomsReducer, roomDetailsReducer, newReviewReducer, checkReviewReducer, newRoomReducer, roomReducer, roomReviewsReducer, reviewReducer } from './roomReducers'

import { authReducer, userReducer, loadedUserReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer } from './userReducers'

import { checktodoReducer, bookedDatesReducer, bookingsReducer, bookingDetailsReducer, todoReducer } from './todoReducers'

const reducer = combineReducers({

    auth: authReducer,
    user: userReducer,
    loadedUser: loadedUserReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,

    todo: todoReducer,


})

export default reducer