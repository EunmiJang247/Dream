import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ProjectList from './ProjectList'

function ProjectLists(props) {
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(props.Limit)
  const [Project, setProject] = useState([])
  const [PostSize, setPostSize] = useState(0)

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit
    }
    getProject(body)
  }, [])

  const getProject = (body) => {
    if (props.AllLanding) {
      axios.post('/api/project', body).then((response) => {
        if (response.data.success) {
          if (body.loadMore) {
            setProject([...Project, ...response.data.projectInfo])
          } else {
            setProject(response.data.projectInfo)
          }
          setPostSize(response.data.postSize)
        }
      })
    } else if (props.MyPostProject) {
      axios
        .post(`/api/project/mypost/${props.userid}`, body)
        .then((response) => {
          if (response.data.success) {
            if (body.loadMore) {
              setProject([...Project, ...response.data.projectInfo])
            } else {
              setProject(response.data.projectInfo)
            }
            setPostSize(response.data.postSize)
          }
        })
    } else if (props.MyApplyroject) {
      axios
        .post(`/api/project/myapply/${props.userid}`, body)
        .then((response) => {
          let projectArray = []
          response.data.projectInfo.map((info) =>
            projectArray.push(info.projectId)
          )
          if (response.data.success) {
            if (body.loadMore) {
              setProject([...Project, ...projectArray])
            } else {
              setProject(projectArray)
            }
            setPostSize(projectArray)
          }
        })
    }
  }

  const loadmoreHandler = () => {
    let skip = Skip + Limit
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true
    }
    getProject(body)
    // setSkip(skip)
  }

  return (
    <>
      <ChamyeoWrap>
        <Inner>
          <div>
            {!props.MyPostProject && (
              <>
                <h5 style={{ fontWeight: '600' }}>
                  ???????????????????????? ??????????????????? ????{' '}
                </h5>
                {props.LandingPage && (
                  <Link to={{ pathname: '/project/all' }}>
                    <SeeMore>?????????</SeeMore>
                  </Link>
                )}
                {!props.LandingPage && (
                  <Link to={{ pathname: `/project/post` }}>
                    <Dreambutton>????????????????????????</Dreambutton>
                  </Link>
                )}
              </>
            )}
          </div>
          <List_head>
            <div style={{ width: '20%' }}>???????????????</div>
            <div style={{ width: '45%' }}>??????</div>
            <div style={{ width: '15%' }}>????????????</div>
            <div style={{ width: '10%' }}>????????????</div>
            {props.MyPostProject && (
              <div style={{ width: '10%' }}>????????????</div>
            )}
            {!props.MyPostProject && (
              <div style={{ width: '10%' }}>????????? . ?????????</div>
            )}
          </List_head>
          {Project.map((result) => (
            <ProjectList
              key={result._id}
              project={result}
              MyPostProject={props.MyPostProject}
            />
          ))}
          {PostSize >= Limit && !props.LandingPage && (
            <LoadMoreBtn onClick={loadmoreHandler}>?????????</LoadMoreBtn>
          )}
        </Inner>
      </ChamyeoWrap>
    </>
  )
}

export default ProjectLists

const ChamyeoWrap = styled.div`
  /* width: 100%; */
  margin: 30px;
`
const Inner = styled.div`
  width: 1100px;
  margin: 0 auto;
  position: relative;
`
const SeeMore = styled.p`
  position: absolute;
  top: 0px;
  right: 10px;
  text-decoration: underline;
  cursor: pointer;
`
const List_head = styled.div`
  border-top: 1px solid #eaeaea;
  height: 38px;
  line-height: 38px;
  box-sizing: border-box;
  color: #888;
  background: #f6f6f6;
  display: flex;

  font-size: 13px;
  & div {
    width: 20%;
    text-align: center;
  }
`
const Dreambutton = styled.button`
  position: absolute;
  top: -20px;
  right: 0px;

  margin: auto;
  border-radius: 5px;
  color: white;
  padding: 10px 21px;
  border: none;
  background: rgb(232, 52, 78);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`
const LoadMoreBtn = styled.button`
  text-align: center;

  width: 100px;
  margin: 30px auto;
  display: block;

  border-radius: 5px;
  color: white;
  padding: 10px 21px;
  border: none;
  background: rgb(232, 52, 78);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`
