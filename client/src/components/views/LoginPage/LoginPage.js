import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_action/user_action'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function LoginPage(props) {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const onEmailHandler = (event) => {
    setEmail(event.target.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.target.value)
  }

  const onSubmitHandler = (event) => {
    if (Email === '') {
      alert('이메일을 입력해주세요')
      return
    } else if (Password === '') {
      alert('비밀번호를 입력해주세요')
      return
    }

    event.preventDefault()
    //이제 axios를 써서 서버에 데이터를보내겠다
    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        window.localStorage.setItem('userId', response.payload.userId)
        navigate('/')
      } else {
        alert(response.payload.message)
      }
    })
  }

  return (
    <>
      <Signin>
        <LoginBox>
          <LoginH2>
            <StrongSpan>Welcome! </StrongSpan>드림투게더에 오신것을 환영합니다
          </LoginH2>
          <LoginForm onSubmit={onSubmitHandler}>
            <LoginInput
              type="text"
              placeholder="이메일을입력하세요"
              onChange={onEmailHandler}
            />
            <LoginInput
              type="password"
              placeholder="비밀번호를입력하세요"
              onChange={onPasswordHandler}
            />
            <SubmitInput type="submit" value="로그인" />
            <Link to={{ pathname: `/register` }}>
              <Hellowp>회원가입하기</Hellowp>
            </Link>
          </LoginForm>
        </LoginBox>
      </Signin>
    </>
  )
}

export default LoginPage
const Signin = styled.section`
  padding: 260px 0 260px;
  background-image: url('/images/login.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
`
const LoginBox = styled.div`
  width: 400px;
  margin: 0 auto;
  border-radius: 6px;
  background-color: white;
  box-shadow: 2px 2px 20px rgb(0 0 0 / 30%);
  color: #555;
`
const LoginH2 = styled.h2`
  padding: 12px;
  font-size: 14px;
  text-align: center;
  border-bottom: 1px solid #ddd;
`
const StrongSpan = styled.span`
  font-weight: 700;
  color: rgb(232, 52, 78);
`
const LoginForm = styled.form`
  padding: 15px 12px;
`
const LoginInput = styled.input`
  width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  font-size: 14px;
`
const SubmitInput = styled.input`
  background-color: rgb(232, 52, 78);
  border: none;
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
`
const Hellowp = styled.p`
  margin-top: 10px;
  text-decoration: underline;
  font-size: 12px;
  color: #333;
  text-align: center;
  cursor: pointer;
`
