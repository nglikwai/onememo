import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from 'react-i18next'
import Pagination from "react-js-pagination";

import Todo from "./Todo";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { clearErrors } from "../redux/actions/roomActions";

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
`


export default Home;
