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
  

  const [open, setOpen] = useState(false)
  const handleMouseHover = () => {
    setOpen(prev => !prev);
  }

  return (
    <>
      <header>
        <div className="inner">
          <a href="/" className="logo">
            <img src="./images/logo.svg" alt="DREAMTOGETHER" />
          </a>

          <ul className='main'>
            <li className='item' 
            onMouseEnter={handleMouseHover}
            onMouseLeave={handleMouseHover}
            >
              <div className='itemName'><Link to="/project/all">드림프로젝트</Link></div>
              {open && 
              <div className='itemContents'>
                <div className={open?'dropdownContentsOn':'dropdownContentsMenuOff'}>
                  <div className='dropdownContentsMenu'>

                  <Row className="Rowheight" gutter={[24, 24]} >
                    <Col className="Colborder" span={8} >
                      <div className='ColborderInner'>
                        웹사이트 제작
                        <div>리액트</div>
                      </div>
                      <div className='ColborderInner'>
                        웹사이트 제작
                      </div>
                    </Col>
                    <Col className="Colborder" span={8} >
                    <div className='ColborderInner'>
                      앱 제작
                    </div>
                    </Col>
                    <Col span={8} >
                    <div className='ColborderInner'>
                      기타
                    </div>
                    </Col>
                  </Row>

                  </div>
                </div>
              </div>
              }

            </li>
            <li className='item'>
              <div className='itemName'><Link to="/dreamee/all">드림이들</Link></div>
            </li>
            {/* <li className='item'>
              <div className='itemName'><Link to="/metoring">멘토링</Link></div>
            </li> */}
            {/* <li className='item'>
              <div className='itemName'><Link to="/community">고민&막힌코드공유</Link></div>
            </li> */}
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