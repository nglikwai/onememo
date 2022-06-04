import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { createTodo } from '../../redux/actions/todoActions';
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Writing = ({ bottomRef }) => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')


    const submitHandler = () => {
        console.log(bottomRef)
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
        dispatch(createTodo(text))
        setText('')
    }
    return (
        <Wrapper>
            <Textarea onChange={(e) => setText(e.target.value)} value={text}></Textarea>
            <SubmitButton onClick={submitHandler}>
                <FontAwesomeIcon
                    icon={faPaperPlane}
                    color="white"
                    size="xs"
                /></SubmitButton>
        </Wrapper>
    )
}

const Textarea = styled.textarea`
&:focus{    background-color: #333;
}
    width:80%;
    height: 50px;
    border-radius: 3rem;
    padding:8px 12px;
    font-size: 20px;
    line-height: 110%;
    background-color: #222;
    color:white;
`

const SubmitButton = styled.button`
    color:white;
    background-color: rgb(46, 80, 124);
    border: none;
    border-radius: 50%;
    width:20px;
    height:40px;
    font-size: 26px;
    font-weight: 900;
    display:flex;
    align-items: center;
    justify-content: center;
    margin-left:10px
`

const Wrapper = styled.div`
    position: fixed;
    bottom:0px;
    padding:12px 20px;
    opacity: 0.9;
    color: white;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    width:100%;
    align-items: center;
    background-color: #000;
`

export default Writing