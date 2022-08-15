import React, { useState } from 'react'
import {useDispatch} from 'react-redux' 
import { loginUser, registerUser } from '../../../_action/user_action';
import {useNavigate} from 'react-router-dom';

function RegisterPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  }

  const onNameHandler = (event) => {
    setName(event.target.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  }

  const onConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    //이제 axios를 써서 서버에 데이터를보내겠다
    let body = {
      email : Email,
      Name : Name,
      password : Password
    }

    if(Password !== ConfirmPassword){
      return alert('비밀번호와확인은같아야합니다')
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
    <div style={{
      display:'flex', justifyContent:'center',alignItems:'center',
      width:'100%', height:'100vh'
    }}>
      <form style={{display:'flex', flexDirection:'column'}}
        onSubmit={onSubmitHandler}
      >
        <label htmlFor="">Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>

        <label htmlFor="">Name</label>
        <input type="text" value={Name} onChange={onNameHandler}/>

        <label htmlFor="">Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>

        <label htmlFor="">PasswordConfirm</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPassword}/>
        <br />
          <button>
            Login
          </button>
      </form>
    </div>
  )
}

export default RegisterPage