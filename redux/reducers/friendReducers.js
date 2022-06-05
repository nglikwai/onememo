import {
    GET_FRIENDS_REQUEST,
    GET_FRIENDS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/friendConstants"

export const searchUserReducer = (state = { user: [] }, action) => {
    switch (action.type) {

        case GET_FRIENDS_REQUEST:
            return {
                loading: true
            }

        case GET_FRIENDS_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}