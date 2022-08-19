import './App.css';

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import React from "react";

import { BrowserRouter , Route, Routes} from "react-router-dom";

import 'antd/dist/antd.min.css';
import Auth from "./hoc/auth";
import NavBar from "./components/views/NavBar/NarBar";
import ProjectPage from './components/views/ProjectPage/ProjectPage';
import Dreamee from './components/views/Dreamee/Dreamee';
import DreameeDetail from './components/views/Dreamee/DreameeDetail';
import ProjectDetail from './components/views/ProjectPage/ProjectDetail';
import ProjectPostPage from './components/views/ProjectPage/ProjectPostPage';
import DreameePostPage from './components/views/Dreamee/DreameePostPage';
import Mydreameeintro from './components/views/MyPage/Mydreameeintro';
import MyPostPage from './components/views/MyPage/MyPostPage';
import MyApplyProject from './components/views/MyPage/MyApplyProject';
import MyAccount from './components/views/MyPage/MyAccount';


function App() {
 
  const AuthLandingPage = Auth(LandingPage,null,false);
  const AuthLogin = Auth(LoginPage,null,false);
  const AuthRegister = Auth(RegisterPage,false,false);
  const AuthProject = Auth(ProjectPage,null,false)
  const AuthDreamee = Auth(Dreamee,null,false)
  const AuthProjectDetail = Auth(ProjectDetail,null,false)
  const AuthProjectPostPage = Auth(ProjectPostPage,null,false)
  const AuthDreameePostPage = Auth(DreameePostPage,null,false)

  const AuthMyPostPage = Auth(MyPostPage,null,false)
  const AuthMydreameeintro = Auth(Mydreameeintro,null,false)
  const AuthMyApplyProject = Auth(MyApplyProject,null,false)
  const AuthMyAccount = Auth(MyAccount,null,false)

  return (
    <>
    {/* <BrowserRouter> */}
    <NavBar>
      <Routes>
          <Route path='/' element={<AuthLandingPage />} /> 
          <Route path='/register' element={<AuthRegister />} />
          <Route path='/project/all' element={<AuthProject />} />
          <Route path='/project/detail/:id' element={<AuthProjectDetail />} />
          <Route path='/project/post' element={<AuthProjectPostPage />} />
          <Route path='/dreamee/all' element={<AuthDreamee />} />
          <Route path='/dreamee/detail/:id' element={<DreameeDetail />} />
          <Route path='/dreamee/post' element={<AuthDreameePostPage />} />
          
          <Route path='/login' element={<AuthLogin />} />

          <Route path='/mypage/mypostproject/:userid' element={<AuthMyPostPage />} />
          <Route path='/mypage/myapplyproject/:userid' element={< AuthMyApplyProject/>} />
          <Route path='/mypage/mydreamee/:userid' element={<AuthMydreameeintro />} />
          <Route path='/mypage/myaccount/:userid' element={<AuthMyAccount />} />
      </Routes>
    </NavBar>
    {/* </BrowserRouter> */}
    </>
  );
}

export default App;