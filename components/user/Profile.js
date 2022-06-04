import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify'
import ButtonLoader from '../layout/ButtonLoader'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, clearErrors, loadUser } from '../../redux/actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants'
import styled from 'styled-components'
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons'

const colors = ["orange", "grey", "black", "blue", "red", "white"];


const Profile = () => {

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
    const [preference, setPreference] = useState("blue");

    const { user: loadedUser, loading } = useSelector(state => state.loadedUser)
    const { error, isUpdated, loading: updateLoading } = useSelector(state => state.user)

    useEffect(() => {

        if (loadedUser) {

            setUser({
                name: loadedUser.name,
                email: loadedUser.email
            })
            setAvatarPreview(loadedUser.avatar.url)
            setPreference(loadedUser.preference)
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {

            router.push('/');
            dispatch(loadUser())
            dispatch({ type: UPDATE_PROFILE_RESET })

        }

    }, [dispatch, isUpdated, error, loadedUser])


    const submitHandler = (e) => {
        e.preventDefault();

        const userData = {
            name, email, password, avatar, preference
        }
        dispatch(updateProfile(userData))

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

        <Wrapper>
            <BackgroundImage color={preference} />

            {loading ? <Loader /> :
                <div className="container container-fluid">
                    <div className="row wrapper">


                        <form style={{ paddingTop: '0' }} onSubmit={submitHandler}>
                            <h1 className="mb-3 text-white">Setting</h1>

                            <ColorWrapper>
                                {colors.map((color) => (
                                    <Color key={color} color={color} onClick={() => setPreference(color)} selected={preference == color ? true : false} />
                                ))}
                            </ColorWrapper>
                            <div className="form-group ">
                                <Input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    name='name'
                                    value={name}
                                    onChange={onChange}
                                    placeholder='name'
                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    type="email"
                                    id="email_field"
                                    className="form-control"
                                    name='email'
                                    value={email}
                                    onChange={onChange}
                                    placeholder='email'

                                />
                            </div>

                            <div className="form-group">
                                <Input
                                    type="password"
                                    id="password_field"
                                    className="form-control"
                                    name='password'
                                    value={password}
                                    onChange={onChange}
                                    placeholder='password'

                                />
                            </div>




                            <SubmitButton
                                id="login_button"
                                type="submit"
                                className="btn btn-block py-3"
                                disabled={updateLoading ? true : false}
                            >
                                {updateLoading ? <ButtonLoader /> : 'UPDATE'}
                            </SubmitButton>
                        </form>
                    </div>
                </div>

            }

        </Wrapper>
    )
}

export default Profile


const Wrapper = styled.div`

    width:100%;
    height: 100%;
    display: flex;
    justify-content: center;
    margin:20px 0;
`;

const ColorWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;

`;

const Color = styled.div`
    &:forcus {
    border: 1px solid yellow;
    }
    width:40px;
    height:40px;
    background-color: ${(props) => props.color};
    border-radius: 50%;
    margin: 10px;
    cursor: pointer;
    box-shadow:${props => props.selected ? `0 0 40px ${props.color !== 'black' ? props.color : 'white'}` : ''};
`

const Input = styled.input`
    background-color: #333;
    color: white;
    border: none;
    border-radius: 1rem;
    margin: 30px 0;
`

const SubmitButton = styled.button`
&:hover{opacity:1}
    border-radius: 2rem;
    opacity: 0.8;
    transition: 0.4s;
`

const BackgroundImage = styled.div`
    background-image: url(/images/background-${props => props.color}.svg);
    background-size: cover;
    width:100%;
    height: 100%;
    position:fixed;
    z-index: -10;
    background-size: cover;
    `