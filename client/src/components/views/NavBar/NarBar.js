import React, { useState } from 'react'
import { Drawer, Button, Avatar } from 'antd'
import './Sections/Navbar.scss'
import { Col, Row } from 'antd'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Log from './Sections/Log'
import Footer from '../LandingPage/Sections/Footer'
import styled from 'styled-components'

function NavBar({ children }) {
  const user = useSelector((state) => state.user)

  return (
    <>
      <BodyWrapper>
        <BodyContent>
          <header>
            <div className="inner">
              <Link to={{ pathname: `/` }} href="/" className="logo">
                <img src="/images/logo.svg" alt="DREAMTOGETHER" />
              </Link>
              <ul className="main">
                <li className="item">
                  <div className="itemName">
                    <Link to="/project/all">드림프로젝트</Link>
                  </div>
                </li>
                <li className="item">
                  <div className="itemName">
                    <Link to="/dreamee/all">드림이들</Link>
                  </div>
                </li>
                {/* <li className='item'>
              <div className='itemName'><Link to="/metoring">멘토링</Link></div>
            </li>
            <li className='item'>
              <div className='itemName'><Link to="/community">커뮤니티</Link></div>
            </li> */}
                <li className="item">
                  {user.userData && (
                    <div className="itemName">
                      <Link
                        to={{
                          pathname: `/mypage/mypostproject/${user.userData._id}`
                        }}
                      >
                        마이페이지
                      </Link>
                    </div>
                  )}
                </li>
              </ul>
              <Log />
            </div>
          </header>
          <div>{children}</div>
        </BodyContent>
        <FooterDiv>
          <Footer />
        </FooterDiv>
      </BodyWrapper>
    </>
  )
}

export default NavBar
const BodyContent = styled.div``
const FooterDiv = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
`

const BodyWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  padding-bottom: 120px; /* footer height */
`
