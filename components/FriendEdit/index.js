import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { removeFriend } from '../../redux/actions/friendAction'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FriendEdit = ({ friend }) => {
    const dispatch = useDispatch()

    const removeAction = () => {
        dispatch(removeFriend(friend))
    }

    return (

        <Wrapper>
            <Item onClick={removeAction}>
                <Action>移除好友</Action>
            </Item>

        </Wrapper>



    )
}

export default FriendEdit;



const Wrapper = styled.div`
    right: 0;
    position: fixed;
    border-radius:1rem;
    padding:12px;
      `



const Item = styled.div`
&:hover{opacity:1}
    color:white;
    display: flex;
    justify-content:space-between;
    align-items: center;
    opacity: 0.8;
    
`

const Action = styled.span`
&:hover{opacity:1}

    padding-right: 20px;
    font-size: 18px;
    opacity: 0.2;
    transition: 0.3s;

`

