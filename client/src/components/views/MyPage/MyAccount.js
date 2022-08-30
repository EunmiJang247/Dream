import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import SubMenus from './Sections/SubMenus'
import { useDispatch } from 'react-redux'
import { changePasswordUser, loginUser } from '../../../_action/user_action'
import axios from 'axios'

function MyAccount(props) {
  // const user = useSelector((state) => state.user.userData)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [Password, setPassword] = useState('')
  const [ChangePasswordWindow, setChangePasswordWindow] = useState(false)

  const [ChangePassword, setChangePassword] = useState(false)
  const [ChangePasswordConfirm, setChangePasswordConfirm] = useState(false)

  const onSubmitHandler = (event) => {
    event.preventDefault()

    //userinfo에 있는 비밀번호와 입력한 비밀번호가 같다면, setChangePasswordWindow를 열어준다.
    let body = {
      email: props.user.userData.email,
      password: Password
    }
    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        setChangePasswordWindow(true)
      } else {
        alert('비밀번호가 일치하지 않습니다.')
        return
      }
    })
  }

  const onPasswordChangeSubmitHandler = (event) => {
    event.preventDefault()
    const variables = {
      email: props.user.userData.email,
      ChangePassword
    }

    dispatch(changePasswordUser(variables)).then((response) => {
      if (response.payload.success) {
        alert('비밀번호 변경 성공!)')
        navigate(`/mypage/myaccount/${props.user.userData._id}`)
      } else {
        alert(
          '비밀번호 변경이 실패하였습니다. 관리자에게 문의 부탁드립니다(valueyou247@naver.com)'
        )
      }
    })
  }

  if (!props.user.userData) {
    return null
  }

  return (
    <>
      <SubMenus />
      <Signin>
        <LoginBox>
          <LoginH2>내 계정</LoginH2>
          {!ChangePasswordWindow && (
            <LoginForm onSubmit={onSubmitHandler}>
              <LoginInput
                type="text"
                value={props.user.userData.email}
                readOnly
              />
              <LoginInput
                type="password"
                placeholder="비밀번호를입력하세요"
                onChange={(e) => setPassword(e.target.value)}
              />
              <SubmitInput type="submit" value="비밀번호 변경하기" />
            </LoginForm>
          )}
          {ChangePasswordWindow && (
            <LoginForm onSubmit={onPasswordChangeSubmitHandler}>
              <LoginInput
                type="password"
                placeholder="신규비밀번호를 입력하세요"
                onChange={(e) => setChangePassword(e.target.value)}
              />
              <LoginInput
                type="password"
                placeholder="신규비밀번호를 한번더 입력하세요"
                onChange={(e) => setChangePasswordConfirm(e.target.value)}
              />
              {ChangePasswordConfirm !== '' &&
                ChangePassword === ChangePasswordConfirm && <p>일치합니다.</p>}

              <SubmitInput type="submit" value="비밀번호 변경하기" />
            </LoginForm>
          )}
        </LoginBox>
      </Signin>
    </>
  )
}

export default MyAccount
const Signin = styled.section`
  padding: 260px 0 260px;
  background-color: #eaeaea;
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
