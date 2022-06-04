import {
    CHECK_TODO_REQUEST,
    CHECK_TODO_SUCCESS,
    CHECK_TODO_RESET,
    CHECK_TODO_FAIL,
    BOOKED_DATES_SUCCESS,
    BOOKED_DATES_FAIL,
    MY_TODOS_SUCCESS,
    MY_TODOS_FAIL,
    TODO_DETAILS_SUCCESS,
    TODO_DETAILS_FAIL,
    ADMIN_TODOS_REQUEST,
    ADMIN_TODOS_SUCCESS,
    ADMIN_TODOS_FAIL,
    DELETE_TODO_REQUEST,
    DELETE_TODO_SUCCESS,
    DELETE_TODO_RESET,
    DELETE_TODO_FAIL,

    CLEAR_ERRORS,

    GET_TODOS_SUCCESS,

    NEW_TODO_REQUEST,
    NEW_TODO_SUCCESS,
    NEW_TODO_FAIL,

} from '../constants/todoConstants'

export const todoReducer = (state = { loading: false, todoList: [] }, action) => {
    switch (action.type) {

        case NEW_TODO_REQUEST:
            return {
                loading: true,
                todoList: [...state.todoList]
            }
        case GET_TODOS_SUCCESS:
            return {
                loading: false,
                todoList: [...action.payload]
            }
        case NEW_TODO_SUCCESS:
            return {
                loading: false,
                todoList: [...state.todoList, action.payload]
            }

        case NEW_TODO_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_TODO_SUCCESS:
            return {
                loading: false,
                todoList: state.todoList.filter(item => item._id != action.payload)
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

// Check Booking
export const checktodoReducer = (state = { available: null }, action) => {
    switch (action.type) {

        case CHECK_TODO_REQUEST:
            return {
                loading: true
            }

        case CHECK_TODO_SUCCESS:
            return {
                loading: false,
                available: action.payload
            }

        case CHECK_TODO_RESET:
            return {
                loading: false,
                available: null
            }

        case CHECK_TODO_FAIL:
            return {
                loading: false,
                error: action.payload
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


// Get all booked dates
export const bookedDatesReducer = (state = { dates: [] }, action) => {
    switch (action.type) {
        case BOOKED_DATES_SUCCESS:
            return {
                loading: false,
                dates: action.payload
            }

        case BOOKED_DATES_FAIL:
            return {
                loading: false,
                error: action.payload
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


export const bookingsReducer = (state = { bookings: [] }, action) => {
    switch (action.type) {

        case ADMIN_TODOS_REQUEST:
            return {
                loading: true,
            }

        case MY_TODOS_SUCCESS:
        case ADMIN_TODOS_SUCCESS:
            return {
                loading: false,
                bookings: action.payload
            }

        case MY_TODOS_FAIL:
        case ADMIN_TODOS_FAIL:
            return {
                loading: false,
                error: action.payload
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

export const bookingDetailsReducer = (state = { booking: {} }, action) => {
    switch (action.type) {
        case TODO_DETAILS_SUCCESS:
            return {
                loading: false,
                booking: action.payload
            }

        case TODO_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
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


