import axios from 'axios'

import {

    DELETE_TODO_SUCCESS,
    DELETE_TODO_FAIL,

    CLEAR_ERRORS,
    GET_TODOS_REQUEST,
    GET_TODOS_SUCCESS,

    NEW_TODO_REQUEST,
    NEW_TODO_SUCCESS,
    NEW_TODO_FAIL,

} from '../constants/todoConstants'

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


export const getAllTodos = (text, status = '') => async (dispatch) => {
    try {


        dispatch({
            type: GET_TODOS_REQUEST,
        })


        // let link = `https://onememo.vercel.app/api/todo?text=${text}`
        let link = `${window.location.href}api/todo?text=${text}&status=${status}`


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