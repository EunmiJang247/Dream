import { Col, Divider, Input, Row } from 'antd'
import React, { useState } from 'react';
import { Select } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { BlueButton } from './Sections/BlueButton';
import { next } from '../../../_action/project_action';
import Questions from './Sections/Questions';
import Result from './Sections/Result';
const { Option } = Select;

function ProjectPostPage() {

    const user = useSelector((state)=>state.user.userData)
    const page = useSelector((state)=> state.project.page)
    const questions = useSelector((state)=> state.project.questions)

  return (
    <>
    {page > -1 && page !== questions.length && 
        (
        <Main>
            <Questions />
        </Main>
        )
    }
    {page === questions.length && 
        (
        <Result user={user} />   
        )
    }
    </>
  );
}

export default ProjectPostPage;
const Main = styled.main`
  width: 100%;
  max-width: 800px;
  padding: 30px 0;
  margin: auto;
  text-align: center;

`
const MainHeader = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin : 30px 0;
`