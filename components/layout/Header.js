import React, { useEffect } from "react";
import Link from "next/link";
import { faBars, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../redux/actions/userActions";
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
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            <Link href="/" >
              <h4>
                <strong className="text-danger" style={{cursor:'pointer'}}>ONE BOOK</strong>
              </h4>
            </Link>
          </div>
        </div>
        <Link href="/search">
                <SearchButton>
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    color="white"
                    size="lg"
                  />
                </SearchButton>
              </Link>
        <div className="col-3 mt-3 mt-md-0 text-center">
          {user ? (
            <div className="ml-4 dropdown d-line">
              <a
                className="btn dropdown-toggle mr-4"
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
    
                <span>{user && user.name}</span>
              </a>
  

              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                {user.role === "admin" && (
                  <>
                    <Link href="/admin/rooms">
                      <a className="dropdown-item">{t('header.manage_room')}</a>
                    </Link>

                    <Link href="/admin/bookings">
                      <a className="dropdown-item">{t('header.manage_booking')}</a>
                    </Link>

                    <Link href="/admin/users">
                      <a className="dropdown-item">{t('header.manage_users')}</a>
                    </Link>

                    <Link href="/admin/reviews">
                      <a className="dropdown-item">{t('header.manage_review')}</a>
                    </Link>

                    <hr />
                  </>
                )}

                <Link href="/bookings/me">
                  <a className="dropdown-item">{t('header.booking')}</a>
                </Link>

                <Link href="/me/update">
                  <a className="dropdown-item">{t('header.profile')}</a>
                </Link>

                <Link href="/">
                  <a
                    className="dropdown-item text-danger"
                    onClick={logoutHandler}
                  >
                    {t('header.logout')}
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <a className="px-4 py-2 text-secondary bg float-right border rounded-pill">
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
      </div>
    </nav>
  );
};

const SearchButton = styled.button`
  background-color: #cc0000;
  border-radius: 3rem;
  border: none;
  padding: 8px 12px;
`;

export default Header;
