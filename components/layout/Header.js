import React, { useEffect } from "react";
import Link from "next/link";
import { faBars, faGear, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/userActions";

import { signOut } from "next-auth/client";
import { useTranslation } from 'react-i18next'
import SearchButton from "../SearchButton";

const Header = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.loadedUser);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user]);

  const logoutHandler = () => {
    signOut();
  };

  return (
    <NavWrapper className="navbar row justify-content-center sticky-top">
      <Wrapper>
        <div >
          {user ? (
            <div className="dropdown" style={{ opacity: '0.9' }} >
              <a
                className="btn dropdown-toggle "
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <Avatar src={user.avatar.url} />
              </a>


              <DropMenu
                className="dropdown-menu "
                aria-labelledby="dropDownMenuButton"
              >


                <Link href="/me/update">
                  <Item className="dropdown-item ">{t('header.profile')}</Item>
                </Link>

                <Link href="/">
                  <Item
                    className="dropdown-item text-danger"
                    onClick={logoutHandler}
                  >
                    {t('header.logout')}
                  </Item>
                </Link>
              </DropMenu>
            </div>
          ) : (
            !loading && (
              <Link href="/">
                <a className="rounded-pill">
                  <FontAwesomeIcon
                    icon={faUser}
                    color="#aaa"
                    size="lg"
                  />
                </a>
              </Link>
            )
          )}
        </div>


        <SearchButton />



      </Wrapper>
    </NavWrapper >
  );
};
const NavWrapper = styled.div`
&:hover{background-color: rgba(0,0,0,0.8);}
  background-color: rgba(0,0,0,0.8);
  transition: 0.4s;
  position: fixed;
  width:100%;
  margin:0;
  padding-bottom: 0;
`
const Name = styled.span`
  font-size: 20px;
  color: #999;
`

const DropMenu = styled.div`
  border-radius: 1rem;
  background-color: #222;
`

const Item = styled.div`
&:active{background-color:#666 ; color:white}
&:hover{background-color:#444;color:white}
  cursor: pointer;
  border-radius: 1rem;
  font-size: 20px;
  line-height: 200%; 
  color: white;
`

const Wrapper = styled.div`
  width:100%;
  padding:0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

`

const Avatar = styled.img`
  width:50px;
  height: 50px;
  border-radius:50%;
`

export default Header;
