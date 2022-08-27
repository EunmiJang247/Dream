import React, { useEffect } from 'react'
import axios from 'axios'

import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Dreamees from '../Dreamee/Sections/Dreamees'
import ProjectLists from '../ProjectPage/Sections/ProjectLists'

function LandingPage() {
  return (
    <>
      <Visual>
        <Inner>
          <h1>
            당신이 무엇을 좋아하고 잘하는지 같이 알아가요
            <br />
          </h1>
          <Link to={{ pathname: `/project/all` }}>
            <button>참여하기</button>
          </Link>
        </Inner>
      </Visual>
      <ProjectLists LandingPage Limit="4" AllLanding />
      <Dreamees noButton Limit="8" />
      {/* <div style={{height:'50px'}}></div> */}
    </>
  )
}
export default LandingPage
const Visual = styled.div`
  background-image: url('images/dreamtogether_background.jpg');
  width: 100%;
  background-position: center;
`
const Inner = styled.div`
  height: 300px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  & h1 {
    margin-bottom: 20px;
    font-size: 18px;
  }
  & button {
    padding: 10px 50px;
    border-radius: 30px;
    background-color: transparent;
    transition: 0.3s;
    font-size: 16px;
    color: #333;
    border: 1px solid black;
    cursor: pointer;
  }
  & button:hover {
    background-color: black;
    color: white;
  }
`
