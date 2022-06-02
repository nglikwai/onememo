import React from 'react'
import Head from 'next/head'

import Header from './Header'
import styled from "styled-components";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title = 'Book Best Hotels for your Holiday' }) => {



    return (
        <Wrapper>
            <BackgroundImage />
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
`

const BackgroundImage = styled.div`
    background-image: url('images/background.png');
    width:100%;
    height: 100%;
    position:fixed;
    z-index: -10;
    background-size: cover;
    
`
export default Layout
