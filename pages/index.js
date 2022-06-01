import Home from '../components/Home'
import Layout from '../components/layout/Layout'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from '../redux/actions/todoActions'

import { wrapper } from '../redux/store'

export default function Index() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllTodos())
  }, [])
  return (
    <Layout>
      <Home />
    </Layout>
  )
}

