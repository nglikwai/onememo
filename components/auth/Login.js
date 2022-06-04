import React, { useState } from 'react'
import Link from 'next/link'

import { signIn } from 'next-auth/client'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import ButtonLoader from '../layout/ButtonLoader'
import styled from 'styled-components'


const Login = () => {
    const { t } = useTranslation()
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);

        const result = await signIn('credentials', {
            redirect: false,
            name,
            password
        })

        setLoading(false)

        if (result.error) {
            toast.error(result.error);
        } else {
            window.location.href = '/'
        }

    }


    return (
        <div className="container container-fluid">
            <BackgroundImage color='black' />

            <div className="row wrapper">
                <div className="col-10">
                    <Wrapper className="shadow-lg" onSubmit={submitHandler}>
                        <Title className="mb-3">ONE MEMO</Title>
                        <div className="form-group">
                            <Input
                                type="text"
                                id="name_field"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={`${t('login.name')}`}
                            />
                        </div>

                        <div className="form-group">
                            <Input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={`${t('login.password')}`}
                            />
                        </div>

                        <LoginButton
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3 "
                            disabled={loading ? true : false}
                        >
                            {loading ? <ButtonLoader /> : `${t('login.login')}`}
                        </LoginButton>

                        <Link href="/register" className="float-right mt-5"><LoginButton className="btn btn-block py-3 ">{t('login.new_user')}</LoginButton></Link>
                    </Wrapper>
                </div>
            </div>
        </div>
    )
}

export default Login

const Title = styled.h1`
    color: rgb(131, 205, 134) ;
    font-size: 60px;
    font-weight: 900;    
`


const Wrapper = styled.form`
    background-color: rgba(256,256,256,0.2);
    border-radius: 3rem;
`

const Input = styled.input`
border-radius: 1rem;
height: 50px;
margin: 30px 0;
`


const LoginButton = styled.button`
    border-radius: 3rem;
    margin:0;
`

const Word = styled.span`
    color: #ccc;
    font-weight: 300;
`


const BackgroundImage = styled.div`
    background-image: url(/images/background-${props => props.color}.svg);
    width:100%;
    height: 100%;
    position:fixed;
    top:0;
    left:0;
    z-index: -10;
    background-size: cover;
    
`