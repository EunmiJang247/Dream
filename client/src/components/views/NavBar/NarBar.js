import React, { useState } from 'react';
import { Drawer, Button, Avatar  } from 'antd';
import './Sections/Navbar.scss';
import { Col, Row } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Log from './Sections/Log';
import Footer from '../LandingPage/Sections/Footer';

function NavBar({children}) {
  const user = useSelector(state => state.user)

  return (
    <>
      <header>
        <div className="inner">
          <a href="/" className="logo">
            <img src="./images/logo.svg" alt="DREAMTOGETHER" />
          </a>
          <ul className='main'>
            <li className='item'>
              <div className='itemName'><Link to="/project/all">드림프로젝트</Link></div>
            </li>
            <li className='item'>
              <div className='itemName'><Link to="/dreamee/all">드림이들</Link></div>
            </li>
            <li className='item'>
              <div className='itemName'><Link to="/metoring">멘토링</Link></div>
            </li>
            <li className='item'>
              <div className='itemName'><Link to="/community">커뮤니티</Link></div>
            </li>
            <li className='item'>
              {user.userData &&
              <div className='itemName'><Link to={{pathname: `/mypage/mypostproject/${user.userData._id}`}}>마이페이지</Link></div>
              }
              </li>
          </ul>
            <Log />
        </div>
      </header>
      <div>{children}</div>
      <Footer />
    </>
  )
}

export default NavBar