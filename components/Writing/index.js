import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { createTodo } from '../../redux/actions/todoActions';


const Writing = () => {
    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const submitHandler = () => {
        dispatch(createTodo(text))
        setText('')
    }
    return (
        <Wrapper>
            <Textarea onChange={(e) => setText(e.target.value)} value={text}></Textarea>
            <SubmitButton onClick={submitHandler}>+</SubmitButton>
        </Wrapper>
    )
}

const Textarea = styled.textarea`
    width:85%;
    border-radius: 3rem;
    padding:8px 12px;
`

const SubmitButton = styled.button`
    color:white;
    background-color: rgb(107, 176, 205);
    border: none;
    border-radius: 50%;
    padding:4px 16px;
    font-size: 30px;
`

const Wrapper = styled.div`
    border-radius: 2rem;
    position: sticky;
    bottom: 0;
    padding:12px 20px;
    opacity: 0.9;
    color: white;
    font-size: 24px;
    display: flex;
    justify-content: space-between;
    width:100%;
    align-items: center;

`

export default Writing