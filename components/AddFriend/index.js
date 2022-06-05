import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { getAllTodos } from '../../redux/actions/todoActions'
import Friend from '../Friend';

import { searchUser } from '../../redux/actions/friendAction';


const AddFriend = () => {

    const [term, setTerm] = useState('')
    const [delayedTerm, setDelayedTerm] = useState('')
    const { user: searchedUser } = useSelector(state => state.searchUser)
    const { user } = useSelector(state => state.loadedUser)
    const dispatch = useDispatch()

    const onChangeHandler = (e) => {
        setTerm(e.target.value)
    }



    useEffect(() => {

        const timeId = setTimeout(() => {
            setDelayedTerm(term)
        }, 500);

        return () => {
            clearTimeout(timeId)
        }
    }, [term])

    useEffect(() => {
        dispatch(searchUser(delayedTerm))
    }, [delayedTerm])

    return (
        <Wrapper>
            <SearchFriend placeholder='搜尋好友' value={term} onChange={onChangeHandler} />
            <FriendWrapper>
                {searchedUser && searchedUser.map(user => (
                    <Friend key={user.name} friend={user.name} />
                ))

                }
                {user && user.friendList.map(friend => (
                    <Friend key={friend} friend={friend} />
                ))}

            </FriendWrapper>
        </Wrapper>
    )
}

export default AddFriend

const Wrapper = styled.div`
    padding: 80px 0 ;
`

const SearchFriend = styled.input`
&:focus{width:100%; background-color:rgba(50,50,50,0.5); color:white; }
&::placeholder{color:#555; }
  background-color: transparent;
  border: none;
  border-bottom:1px solid rgba(50,50,50,1);
  font-size:20px;
  padding:8px 20px;
  width:100%;
  height:70px;
  transition: 0.3s;
  color:white;
`;

const FriendWrapper = styled.div`

`


