import React, { useEffect } from 'react'
import Head from 'next/head'

import Header from './Header'
import styled from "styled-components";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const Layout = ({ children, title = 'One Memo' }) => {



    return (
        <Wrapper >
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Header />
            <ToastContainer position="bottom-right" />
            {children}


        </Wrapper>
    )
}

const Wrapper = styled.div`

`


export default Layout
