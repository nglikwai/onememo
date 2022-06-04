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
  const { user } = useSelector(state => state.loadedUser)


  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [todoList, user]);

  return (
    <Wrapper>
      <BackgroundImage color={user?.preference} />

      <TodoWrapper>


        {todoList ?
          <>
            {todoList.map(todo => (
              <Todo key={todo.createdAt} item={todo}></Todo>)
            )}
          </>
          :
          <>
            loading
          </>
        }
      </TodoWrapper>
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
`

const TodoWrapper = styled.div`
  padding:80px 8px;
  width: 100%;
`

const BackgroundImage = styled.div`
    background-image: url(/images/background-${props => props.color}.svg);
    width:100%;
    height: 100%;
    position:fixed;
    z-index: -10;
    background-size: cover;
    
`

export default Home;
