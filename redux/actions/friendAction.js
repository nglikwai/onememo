import axios from 'axios'

import {
    GET_FRIENDS_REQUEST,
    GET_FRIENDS_SUCCESS,

    ADD_FRIEND_REQUEST,
    ADD_FRIEND_SUCCESS,

    SEND_FRIEND_REQUEST,
    SEND_FRIEND_SUCCESS
} from "../constants/friendConstants"

export const searchUser = (name) => async (dispatch) => {
    try {
        dispatch({
            type: GET_FRIENDS_REQUEST,
        })

        let link = `http://localhost:3000/api/friend/add?name=${name}`


        const { data } = await axios.get(link)
        console.log(data)
        dispatch({
            type: GET_FRIENDS_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        console.log(error)
    }
}

export const addFriend = (name) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_FRIEND_REQUEST,
        })

        let link = `http://localhost:3000/api/friend/add?name=${name}`


        const { data } = await axios.put(link)
        dispatch({
            type: ADD_FRIEND_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        console.log(error)
    }
}


export const sendFriend = (name, text) => async (dispatch) => {
    try {
        dispatch({
            type: SEND_FRIEND_REQUEST,
        })

        let link = `http://localhost:3000/api/friend/add?name=${name}&text=${text}`


        const { data } = await axios.post(link)
        console.log(data)
        dispatch({
            type: SEND_FRIEND_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        console.log(error)
    }
}
