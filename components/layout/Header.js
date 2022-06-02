import React, { useEffect } from "react";
import Link from "next/link";
import { faBars, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/userActions";
import { getAllTodos } from "../../redux/actions/todoActions";

import { signOut } from "next-auth/client";
import { useTranslation } from 'react-i18next'

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
            <div className="dropdown">
              <a
                className="btn dropdown-toggle "
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />

                </figure>
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

        <Link href="/">
          <SearchButton>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color="white"
              size="lg"
            />
          </SearchButton>
        </Link>

      </Wrapper>
    </NavWrapper >
  );
};
const NavWrapper = styled.div`
&:hover{background-color: rgba(50,50,50,0.9);}
  background-color: rgba(50,50,50,0.3);
  transition: 0.4s;
`
const Name = styled.span`
  font-size: 20px;
  color: #999;
`

const DropMenu = styled.div`
  border-radius: 1rem;
`

const Item = styled.div`
  border-radius: 1rem;
  font-size: 20px;
  line-height: 200%; 
`

const Wrapper = styled.div`
  width:100%;
  padding:0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;

`
const SearchButton = styled.button`
  background-color: rgb(131, 205, 134);
  border-radius: 3rem;
  border: none;
  padding: 8px 12px;
`;

export default Header;
