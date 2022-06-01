import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { deleteTodo, updateTodo } from '../../redux/actions/todoActions';
import { useDispatch, useSelector } from "react-redux";

const Todo = ({ item }) => {
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false)
    const [color, setColor] = useState('rgb(131, 205, 134)')

    useEffect(() => {
        if (item.status == 'completed') {
            setColor('rgba(131, 205, 134,0.1)')
        }
        if (item.status == 'important') {
            setColor('orange')
        }
    }, [])

    const updateHandler = (status) => {
        if (status == 'completed') {
            setColor('rgba(131, 205, 134,0.1)')
        }
        if (status == 'important') {
            setColor('orange')
        }
        dispatch(updateTodo(item._id, status))
    }
    return (
        <Wrapper onClick={() => setEdit(!edit)}>
            <TodoWrapper color={color}>{item.todo}

                {
                    edit &&
                    <>
                        <EditWrapper>
                            <EditItem color='green' onClick={() => updateHandler("completed")}>Y</EditItem>
                            <EditItem color='red' onClick={() => dispatch(deleteTodo(item._id))}>X</EditItem>
                            <EditItem color='orange' onClick={() => updateHandler("important")}>X</EditItem>
                        </EditWrapper>
                    </>
                }
            </TodoWrapper>



        </Wrapper>

    )
}
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`


const EditWrapper = styled.div`

    padding:12px;
    display: flex;
`

const EditItem = styled.div`
    border-radius:3rem;
    background-color: ${(props) => (props.color ? props.color : '#cc0000')};
    padding:4px 14px;
    margin:0 4px;
    color: white;
    font-size: 20px;
`
const TodoWrapper = styled.div`
    border-radius: 2rem;
    background-color:${(props) => (props.color ? props.color : 'green')}; ;
    padding:4px 20px;
    color: white;
    font-size: 20px;
    margin: 8px 16px;
    width:auto;
`

export default Todo