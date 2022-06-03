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
            <SubmitButton onClick={submitHandler}>{'>'}</SubmitButton>
        </Wrapper>
    )
}

const Textarea = styled.textarea`
    width:80%;
    height: 50px;
    border-radius: 3rem;
    padding:8px 12px;
    font-size: 20px;
    line-height: 110%;
    background-color: #444;
    color:white;
`

const SubmitButton = styled.button`
    color:white;
    background-color: rgb(46, 80, 124);
    border: none;
    border-radius: 50%;
    width:35px;
    height:40px;
    font-size: 3
    0px;
    margin: 0 2% 0 0;
    font-weight: 900;
    display:flex;
    justify-content:center;
    align-items: center;
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