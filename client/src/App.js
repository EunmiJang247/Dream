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

function App() {
 
  const AuthLandingPage = Auth(LandingPage,null,false);
  const AuthLogin = Auth(LoginPage,null,false);
  const AuthRegister = Auth(RegisterPage,false,false);
  const AuthProject = Auth(ProjectPage,null,false)
  const AuthDreamee = Auth(Dreamee,null,false)

  return (
    <>
    {/* <BrowserRouter> */}
    <NavBar>
      <Routes>
          <Route path='/' element={<AuthLandingPage />} /> 
          <Route path='/register' element={<AuthRegister />} />
          <Route path='/project/all' element={<AuthProject />} />
          <Route path='/project/detail/:id' element={<ProjectDetail />} />
          <Route path='/dreamee/all' element={<AuthDreamee />} />
          <Route path='/dreamee/detail/:id' element={<DreameeDetail />} />

          <Route path='/login' element={<AuthLogin />} />
      </Routes>
    </NavBar>
    {/* </BrowserRouter> */}
    </>
  );
}

export default App;