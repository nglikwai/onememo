import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { getAllTodos } from '../../redux/actions/todoActions'


const SearchButton = () => {

    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const onChangeHandler = (e) => {
        setText(e.target.value)
    }



    useEffect(() => {
        dispatch(getAllTodos(text))
    }, [text])

    return (
        <Button placeholder="🔎" value={text} onChange={onChangeHandler} />
    )
}

export default SearchButton

const Button = styled.input`
&:focus{width:200px; background-color:#444; color:white; font-weight:400}
  background-color: transparent;
  border-radius: 3rem;
  border: none;
  padding: 8px;
  width:40px;
  font-weight: 900;
  transition: 0.3s;
`;
