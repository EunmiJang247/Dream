import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Comment from './Sections/Comment'
import Like from './Sections/Like'
import Apply from './Sections/Apply'
import dayjs from 'dayjs'

function ProjectDetail(props) {
  const { id } = useParams()
  const variable = { projectId: id }

  const [Project, setProject] = useState([])
  const [Comments, setComments] = useState([])

  useEffect(() => {
    axios
      .get(`/api/project/${id}`)
      .then((response) => {
        setProject(response.data)
      })
      .catch((err) => alert(err))

    axios
      .post('/api/comment/getComments', variable)
      .then((response) => {
        setComments(response.data.comments)
      })
      .catch((err) => alert(err))
  }, [])

  const refreshFunction = (newComment) => {
    setComments(Comments.concat(newComment))
  }

  if (!props.user.userData) {
    return null
  }

  return (
    <>
      <Main>
        <Head>
          <Title>
            <TeamName>{Project.projectdesc}</TeamName>
            <Like projectId={id} userid={props.user.userData._id} ProjectLike />
          </Title>
          <Summary>
            <span>{Project.servicecate}제작/</span>
            <span>{Project.meetingcycle} 회의/</span>
            <span>~{dayjs(Project.duedate).format('YYYY-MM-DD')}</span>
          </Summary>
        </Head>
        <Tab>
          <span>😉</span>조회<span>{Project.views}</span>
          <span>😉</span>댓글<span>{Comments.length}</span>
        </Tab>
        <Recruit>
          <RecruitTitle>팀소개</RecruitTitle>
          <RecruitContents>{Project.projectcontent}</RecruitContents>
          <br />
          <RecruitTitle>모집 Position</RecruitTitle>
          <div>
            {Project.dreameeInfo &&
              Project.dreameeInfo.map((dreamee, index) => {
                return (
                  <React.Fragment key={index}>
                    <div style={{ marginLeft: '5px' }}>
                      • {dreamee.position} {dreamee.Number}명
                    </div>
                    {dreamee.skill.map((skill, index) => (
                      <React.Fragment key={index}>
                        <span style={{ marginLeft: '10px' }}>{skill},</span>
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                )
              })}
          </div>
        </Recruit>
        <Apply projectId={id} positions={Project.dreameeInfo} />
      </Main>

      <Comment refreshFunction={refreshFunction} commentLists={Comments} />
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
  border-bottom: 1px solid #efefef;

  span {
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
const RecruitContents = styled.div``
const Reply = styled.div``
