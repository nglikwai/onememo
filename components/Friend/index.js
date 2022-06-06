import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { addFriend } from '../../redux/actions/friendAction'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FriendEdit from '../FriendEdit';


const Friend = ({ friend }) => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.loadedUser)
    const [added, setAdded] = useState(false)
    const [friendEditOpen, setFriendEditOpen] = useState(false)
    const ref = useRef();


    const addFriendClick = () => {
        setAdded(true)
        dispatch(addFriend(friend))
    }

    useEffect(() => {
        const handler = (event) => {
            if (friendEditOpen && ref.current && !ref.current.contains(event.target)) {
                setFriendEditOpen(false)
            }
        }

        document.addEventListener('mousedown', handler)
        document.addEventListener('touchstart', handler)

        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handler)
            document.removeEventListener('touchstart', handler)
        }
    }, [friendEditOpen])


    return (

        <Wrapper onClick={() => setFriendEditOpen(true)} ref={ref}>


            <Name>{friend}</Name>
            {!added && user && !user.friendList.includes(friend) ?
                <FontAwesomeIcon
                    icon={faPlus}
                    color="white"
                    size="lg"
                    onClick={addFriendClick}
                /> : ""}

            {
                friendEditOpen && <FriendEdit friend={friend} />
            }

        </Wrapper>



    )
}

export default Friend;



const Wrapper = styled.div`
            &:hover{background-color:rgba(50,50,50,0.5)};
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
