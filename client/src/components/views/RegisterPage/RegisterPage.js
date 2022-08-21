import React, { useState } from 'react'
import {useDispatch} from 'react-redux' 
import { loginUser, registerUser } from '../../../_action/user_action';
import {Link, useNavigate} from 'react-router-dom';
import styled from 'styled-components';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [emailvalid, SetEmailvalid] = useState(false)

  const [Name, setName] = useState("")

  const [Password, setPassword] = useState("")
  const [Passwordvalid, SetPasswordvalid] = useState(false)

  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.target.value);

    var regExpemail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    // console.log('이메일 유효성검사 ::', regExpemail.test(event.target.value))
    //  8 ~ 10자 영문, 숫자 조합
    if(regExpemail.test(event.target.value)){SetEmailvalid(true)}
    else{SetEmailvalid(false)}
  }

  const onNameHandler = (event) => {
    setName(event.target.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{5,15}$/
    //  8 ~ 10자 영문, 숫자 조합
    if(regExp.test(event.target.value)){SetPasswordvalid(true)}
    else{SetPasswordvalid(false)}
  }

  const onConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if(!emailvalid){
      alert('이메일을 확인해주세요')
      return
    }else if(Name === ""){
      alert('닉네임을을 입력하세요')
      return
    }else if(!Passwordvalid){
      alert('5 ~ 15자 영문, 숫자 조합 비밀번호를 입력하세요')
      return
    }else if(ConfirmPassword !== Password){
      alert('비밀번호와 비밀번호 확인이 다릅니다')
      return
    }
    
    //이제 axios를 써서 서버에 데이터를보내겠다
    let body = {
      email : Email,
      Name : Name,
      password : Password
    }

    dispatch(registerUser(body))
      .then(response => {
        if(response.payload.success){
          navigate('/login');
        }else{
          alert('실패요')
        }
      } )
  }

  return (
    <>
    <Signin>
      <LoginBox>
        <LoginH2><StrongSpan>Welcome! </StrongSpan>드림투게더에 오신것을 환영합니다</LoginH2>
        <LoginForm onSubmit={onSubmitHandler}>
          <LoginInput type="text" placeholder='이메일을 입력하세요' onChange={onEmailHandler} />
            {emailvalid ? "" : <span style={{fontSize:'8px', marginLeft: '8px'}}>이메일 형식으로 작성해주세요</span>}
          <LoginInput type="text" placeholder='닉네임을 입력하세요' onChange={onNameHandler}/>
          <LoginInput type="password" placeholder='비밀번호를 입력하세요' onChange={onPasswordHandler}/>
            {Passwordvalid ? "" : <span style={{fontSize:'8px', marginLeft: '8px'}}>5 ~ 15자 영문, 숫자 조합으로 작성해주세요</span>}
          <LoginInput type="password" placeholder='비밀번호를 한번 더 입력하세요' onChange={onConfirmPassword}/>
            {ConfirmPassword && ConfirmPassword === Password? <span style={{fontSize:'8px', marginLeft: '8px', color:'blue'}}>일치합니다</span> : ""}
          <SubmitInput type="submit" value="회원가입하기" />
          <Link to={{pathname: `/login`}}><Hellowp>로그인</Hellowp></Link>
        </LoginForm>
      </LoginBox>
    </Signin>
  </>
  )
}

export default RegisterPage;
const Signin = styled.section`
  padding: 210px 0 210px;
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
    color: rgb(232,52,78);
`
const LoginForm = styled.form`
    padding: 15px 12px;
`
const LoginInput = styled.input`
    width: 100%;
    margin-top: 6px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    outline: none;
    box-sizing: border-box;
    font-size: 14px;
`
const SubmitInput = styled.input`
    background-color: rgb(232,52,78);
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
