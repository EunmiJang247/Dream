import React, { useState } from 'react'
import {useDispatch} from 'react-redux' 
import { loginUser } from '../../../_action/user_action';
import {useNavigate} from 'react-router-dom';

function LoginPage(props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  }

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    //이제 axios를 써서 서버에 데이터를보내겠다
    let body = {
      email : Email,
      password : Password
    }

    dispatch(loginUser(body))
      .then(response => {
        if(response.payload.loginSuccess){
          window.localStorage.setItem('userId', response.payload.userId);
          navigate('/');
        }else{
          alert('Error')
        }
    })
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
        <label htmlFor="">Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <br />
          <button>
            Login
          </button>
      </form>
    </div>
  )
}

export default LoginPage;