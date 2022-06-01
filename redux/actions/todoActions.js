import axios from 'axios'
import absoluteUrl from 'next-absolute-url'

import {
    CHECK_TODO_REQUEST,
    CHECK_TODO_SUCCESS,
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
    DELETE_TODO_FAIL,

    CLEAR_ERRORS,

    GET_TODOS_SUCCESS,

    NEW_TODO_REQUEST,
    NEW_TODO_SUCCESS,
    NEW_TODO_FAIL,

} from '../constants/bookingConstants'

export const createTodo = (todo) => async (dispatch) => {
    try {
        const data = { 'todo': todo, "createdAt": Date() }
        dispatch({ type: NEW_TODO_REQUEST });

        dispatch({
            type: NEW_TODO_SUCCESS,
            payload: data
        })


        const config = {
            header: {
                'Content-Type': 'application/json'
            }
        }

        await axios.put(`/api/todo`, data, config)


    } catch (error) {

        dispatch({
            type: NEW_TODO_FAIL,
            payload: error
        })
    }
}



export const deleteBooking = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_TODO_REQUEST })

        const { data } = await axios.delete(`/api/admin/bookings/${id}`)

        dispatch({
            type: DELETE_TODO_SUCCESS,
            payload: data.success
        })

    } catch (error) {

        dispatch({
            type: DELETE_TODO_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getAllTodos = () => async (dispatch) => {
    try {


        let link = `http://localhost:3000/api/todo`


        const { data } = await axios.get(link)

        dispatch({
            type: GET_TODOS_SUCCESS,
            payload: data.todo
        })

    } catch (error) {
        console.log(error)
    }
}

export const deleteTodo = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_TODO_SUCCESS,
            payload: id
        })
        await axios.delete(`/api/todo?id=${id}`)


    } catch (error) {

        dispatch({
            type: DELETE_TODO_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateTodo = (id, status) => async (dispatch) => {
    try {

        await axios.patch(`/api/todo?id=${id}`, { "status": status })


    } catch (error) {

        dispatch({
            type: DELETE_TODO_FAIL,
            payload: error.response.data.message
        })
    }
}


// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}