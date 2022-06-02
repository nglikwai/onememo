import React from 'react'
import Head from 'next/head'

import Header from './Header'
import styled from "styled-components";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title = 'Book Best Hotels for your Holiday' }) => {



    return (
        <Wrapper>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* <link rel="manifest" href="/manifest.json" /> */}
            </Head>

            <Header />
            <ToastContainer position="bottom-right" />
            {children}


        </Wrapper>
    )
}

const Wrapper = styled.div`
    background-image: url('http://localhost:3000/images/background.png');
`
export default Layout
