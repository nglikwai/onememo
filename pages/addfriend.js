import AddFriend from '../components/AddFriend'
import Layout from '../components/layout/Layout'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTodos } from '../redux/actions/todoActions'

import { wrapper } from '../redux/store'

export default function Index() {


    return (
        <Layout>
            <AddFriend />
        </Layout>
    )
}

