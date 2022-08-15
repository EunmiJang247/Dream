import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import React from "react";

import { BrowserRouter , Route, Routes} from "react-router-dom";

import 'antd/dist/antd.min.css';
import Auth from "./hoc/auth";
import NavBar from "./components/views/NavBar/NarBar";

function App() {
  const AuthLandingPage = Auth(LandingPage(),null,false);
  const AuthLogin = Auth(LoginPage(),false,false);
  const AuthRegister = Auth(RegisterPage(),false,false);
  return (
    <>
    {/* <BrowserRouter> */}
      <NavBar />
      <div style={{ paddingTop: '69px' }}></div>
      <Routes>
          <Route path='/' element={<AuthLandingPage />} /> 
          <Route path='/login' element={<AuthLogin />} />
          <Route path='/register' element={<AuthRegister />} />
      </Routes>
    {/* </BrowserRouter> */}
    </>
  );
}

export default App;


//-----------------------------------------kakao
// import "./App.css";
// import Auth from "./hoc/auth";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Loginpage from "./hoc/loginpage";
// import Profile from "./hoc/Profile";
// function App() {
//   const REST_API_KEY = "2adc3d5d075b87f7fc982551735f9c37";
//   const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
//   const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
//   return (
//   <Router>
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Loginpage KAKAO_AUTH_URL= {KAKAO_AUTH_URL} />}></Route>
//         <Route path="/oauth/kakao/callback" element={<Auth />} ></Route>
//         <Route path="/profile" element={<Profile />} ></Route>
//       </Routes>
//     </div>
//   </Router>
//   );
// }
// export default App;