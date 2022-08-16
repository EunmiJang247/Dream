import React, { useState } from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProjectDetail() {
    const {id} = useParams();
    
    const [Project, setProject] = useState([])

    useState(()=>{
      axios.get(`/api/project/${id}`)
        .then(response =>{
          console.log(response.data)
          setProject(response.data)
        })
        .catch(err => alert(err))
    },[])
  return (
    <>
    <Main>
      <Head>
        <Title>
          <TeamName>{Project.projecttitle}</TeamName>
        </Title>
        <Summary>
          <span>{Project.servicecate}/</span>
          <span>{Project.position}/</span>
          <span>{Project.regidate}</span>
        </Summary>
      </Head>
      <Tab>
        <span>😉</span>조회<span>23</span>
        <span>😉</span>찜<span>23</span>
        <span>😉</span>댓글<span>23</span>
      </Tab>
      <Recruit>
        <RecruitTitle>
          팀소개
        </RecruitTitle>
        <RecruitContents>
          {Project.projectcontent}
        </RecruitContents>
        <br />
        <RecruitTitle>
          댓글
        </RecruitTitle>
      </Recruit>
    </Main>
    </>
  )
}

export default ProjectDetail
const Main = styled.div`
  text-align: center;
`
const Head = styled.div`
  max-width: 800px;
  margin: 0px auto;
  box-sizing: border-box;
`
const Title = styled.div`
    margin-bottom: 18px;
    padding: 0px 20px;
`
const TeamName = styled.span`
    font-size: 30px;
    font-weight: 900;
    color: #3c3c3c;
    margin: 0px 12px;
    line-height: 40px;
`
const Summary = styled.div`
  color: #3c3c3c;
`
const Tab = styled.div`
    max-width: 800px;
    margin: 0px auto;
    box-sizing: border-box;
    border-bottom: 1px solid #EFEFEF;

    span{
      color: #707070;
      font-size: 14px;
      margin: 0px 9px;
    }
`
const Recruit = styled.div`
    max-width: 800px;
    margin: 0px auto;
    box-sizing: border-box;

  padding: 40px 18px;
    text-align: left;
`
const RecruitTitle = styled.div`
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
    margin-right: 20px;
    vertical-align: middle;

`
const RecruitContents = styled.div`


`
const Reply = styled.div`


`