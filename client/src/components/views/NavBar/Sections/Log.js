import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function Log() {
  const user = useSelector((state) => state.user)

  const navigate = useNavigate()

  const onLogoutHandler = () => {
    axios.get(`/api/users/logout`).then((response) => {
      if (response.data.success) {
        navigate('/login')
      } else {
        alert('로그아웃실패')
      }
    })
  }

  const onLoginHandler = () => {
    navigate('/login')
  }
  if (user.userData && !user.userData.isAuth) {
    return <LoginorOut onClick={onLoginHandler}>로그인</LoginorOut>
  } else {
    return <LoginorOut onClick={onLogoutHandler}>로그아웃</LoginorOut>
  }
}

export default Log
const LoginorOut = styled.div`
  height: 48px;
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;

  border-radius: 50px;
  color: white;
  padding: 14px 21px;
  border: none;
  background: rgb(232, 52, 78);
  font-size: 14px;
  font-weight: 700;

  cursor: pointer;
`
