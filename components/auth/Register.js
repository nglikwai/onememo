import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import ButtonLoader from '../layout/ButtonLoader'

import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearErrors } from '../../redux/actions/userActions'
import styled from 'styled-components';

const Register = () => {

    const dispatch = useDispatch()
    const router = useRouter();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = user

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

    const { success, error, loading } = useSelector(state => state.auth)

    useEffect(() => {

        if (success) {
            router.push('/login')
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, success, error])


    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name, email, password, avatar
        }

        dispatch(registerUser(userData))

    }

    const onChange = (e) => {

        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }

    }


    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Join Us</h1>

                        <div className="form-group">
                            <Input
                                type="text"
                                id="name_field"

                                name='name'
                                value={name}
                                onChange={onChange}
                                placeholder='Name'

                            />
                        </div>

                        <div className="form-group">
                            <Input
                                type="email"
                                id="email_field"
                                name='email'
                                value={email}
                                onChange={onChange}
                                placeholder='Email'
                            />
                        </div>

                        <div className="form-group">
                            <Input
                                type="password"
                                id="password_field"
                                name='password'
                                value={password}
                                onChange={onChange}
                                placeholder='Password'

                            />
                        </div>




                        <SubmitButton
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            {loading ? <ButtonLoader /> : 'REGISTER'}
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register


const Input = styled.input`
&:focus{    background-color: #555; color:white
}
    background-color: #333;
    color: white;
    border: none;
    border-radius: 2rem;
    margin: 30px 0;
    transition: 0.4s;
    padding: 12px 20px;
    margin: 10px 0;
    width:100%;
`

const SubmitButton = styled.button`
&:hover{opacity:1}
    border-radius: 2rem;
    opacity: 0.8;
    transition: 0.4s;
`