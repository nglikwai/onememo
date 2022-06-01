import React, { useEffect } from "react";
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

  const { todoList } = useSelector(state => state.todo)

  return (
    <Wrapper>
      {todoList && todoList.map(todo => (
        <Todo key={todo.createdAt} item={todo}></Todo>)
      )}
      <Writing />
    </Wrapper>

  )
};

const Wrapper = styled.div`

display: flex;
flex-direction: column;
align-items: flex-start;

`

export default Home;
