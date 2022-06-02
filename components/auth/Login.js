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
            <div className="row wrapper">
                <div className="col-10">
                    <Wrapper className="shadow-lg" onSubmit={submitHandler}>
                        <Title className="mb-3">ONE MEMO</Title>
                        <div className="form-group">
                            <Label htmlFor="name_field">{t('login.name')}</Label>
                            <Input
                                type="text"
                                id="name_field"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <Label htmlFor="password_field">{t('login.password')}</Label>
                            <Input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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

                        <Link href="/register" className="float-right mt-3">{t('login.new_user')}</Link>
                    </Wrapper>
                </div>
            </div>
        </div>
    )
}

export default Login

const Title = styled.h1`
    color: rgb(131, 205, 134) ;
    font-size: 80px;
    font-weight: 900;
    padding: 0  0 20px 0;
    
`

const Label = styled.label`
    color: white ;
    font-size: 20px;
    font-weight: 300;
`

const Wrapper = styled.form`
    background-color: rgba(256,256,256,0.2);
    border-radius: 3rem;
`

const Input = styled.input`
border-radius: 1rem;
height: 50px;
margin: 10px 0;
`


const LoginButton = styled.button`
border-radius: 3rem;
`