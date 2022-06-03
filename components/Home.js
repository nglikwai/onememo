import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";


import Todo from "./Todo";

import { useSelector } from "react-redux";


import styled from "styled-components";
import Writing from "./Writing";



const Home = () => {
  const bottomRef = useRef(null);
  const windowRef = useRef(null)
  const router = useRouter()
  const { todoList } = useSelector(state => state.todo)
  const { isAuthenticated } = useSelector(state => state.loadedUser)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [todoList]);

  return (
    <Wrapper>

      {todoList && todoList.map(todo => (
        <Todo key={todo.createdAt} item={todo}></Todo>)
      )}
      <Writing />
      <span ref={bottomRef}></span>
    </Wrapper>

  )
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height:100%;
  padding-bottom:80px;
`


export default Home;
