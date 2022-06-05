import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { addFriend } from '../../redux/actions/friendAction'
import { faBars, faFlag, faGear, faMagnifyingGlass, faPlus, faRotate, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Friend = ({ friend }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.loadedUser)
    const [added, setAdded] = useState(false)
    const addFriendClick = () => {
        setAdded(true)
        dispatch(addFriend(friend))
    }

    return (
        <Wrapper>
            <Name>{friend}</Name>
            {!added && user && !user.friendList.includes(friend) ?
                <FontAwesomeIcon
                    icon={faPlus}
                    color="white"
                    size="lg"
                    onClick={addFriendClick}
                /> : ""}
            {added && <Added>added</Added>}

        </Wrapper>
    )
}

export default Friend

const Wrapper = styled.div`
&:hover{background-color:rgba(50,50,50,0.5)}
    padding:20px;
    border-bottom: 1px solid #333;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Name = styled.span`
    color:white;
    font-size: 20px;
`

const Added = styled.span`
    color: #333;
`
