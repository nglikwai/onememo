import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { createTodo } from '../../redux/actions/todoActions';
import { sendFriend } from '../../redux/actions/friendAction'
import { faForward, faPaperPlane, faReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Writing = ({ bottomRef }) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const [friendListOpen, setFriendListOpen] = useState(false)
    const ref = useRef();
    const { user } = useSelector(state => state.loadedUser)

    const submitHandler = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        dispatch(createTodo(text))
        setText('')
    }

    const crossSubmitHandler = (friend, text) => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        dispatch(createTodo(text, friend))
        dispatch(sendFriend(friend, text))
        setText('')
        setFriendListOpen(false)

    }

    useEffect(() => {
        const handler = (event) => {
            if (open && ref.current && !ref.current.contains(event.target)) {
                setFriendListOpen(false)
            }
        }

        document.addEventListener('mousedown', handler)
        document.addEventListener('touchstart', handler)

        return () => {
            // Cleanup the event listener
            document.removeEventListener('mousedown', handler)
            document.removeEventListener('touchstart', handler)
        }
    }, [friendListOpen])


    return (
        <Wrapper>

            {friendListOpen &&
                <Friends ref={ref}>

                    {user && user.friendList.map(friend => (
                        <Friend key={friend} onClick={() => crossSubmitHandler(friend, text)}>{friend}</Friend>
                    ))}
                </Friends>}

            <SubmitButton onClick={() => setFriendListOpen(!friendListOpen)} disabled={text ? false : true} >
                <FontAwesomeIcon
                    icon={faReply}
                    color={text ? 'white' : '#333'}
                    size="xs"
                /></SubmitButton>


            <Textarea onChange={(e) => setText(e.target.value)} value={text}></Textarea>
            <SubmitButton onClick={submitHandler} disabled={text ? false : true}>
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    color={text ? 'white' : '#333'}
                    size="xs"
                /></SubmitButton>
        </Wrapper >
    )
}

const Textarea = styled.textarea`
&:focus{    background-color: #333;
}
    width:80%;
    height: 40px;
    border-radius: 3rem;
    padding: 10px 12px;
    font-size: 16px;
    line-height: 110%;
    background-color: #222;
    color:white;
    margin:0 12px;
`

const SubmitButton = styled.button`
    background-color: rgb(46, 80, 124,0);
    border: none;
    border-radius: 50%;
    width:40px;
    height:40px;
    font-size: 26px;
    font-weight: 900;
    display:flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    position: fixed;
    bottom:0px;
    padding:12px 8px;
    opacity: 0.9;
    color: white;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    width:100%;
    align-items: center;
    background-color: #000;
`

const Friends = styled.div`
    background-color: rgba(40,40,40,0.7);
    position: fixed;
    bottom: 70px;
    border-radius: 0.7rem;
`

const Friend = styled.div`
&:hover{background-color:#444}
    padding: 6px 12px;
    margin:6px;
    border-radius: 0.7rem;
    font-size: 20px;
    cursor: pointer;
    transition: 0.3s;

`
export default Writing