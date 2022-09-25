import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Dreamee from './Dreamee'

function Dreamees(props) {
  const userid = useSelector((state) => state.user.userData)

  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(props.Limit)
  const [DreameeLists, setDreameeLists] = useState([])
  const [PostSize, setPostSize] = useState(0)

  const navigate = useNavigate()

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit
    }
    getDreamee(body)
  }, [])

  const getDreamee = (body) => {
    axios.post('/api/dreamee', body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setDreameeLists([...DreameeLists, ...response.data.dreameeInfo])
        } else {
          setDreameeLists(response.data.dreameeInfo)
        }
        setPostSize(response.data.postSize)
      } else {
        alert('드림이정보 가져오는데 실패')
      }
    })
  }

  const loadmoreHandler = () => {
    let skip = Skip + Limit
    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true
    }
    getDreamee(body)
    setSkip(skip)
  }

  const regibutton = () => {
    if (!userid._id) {
      alert('로그인을 해주세요')
    } else {
      axios
        .get(`/api/dreamee/mydreamee/${userid._id}`)
        .then((response) => {
          //등록된드림이소개가 있는데 드림이등록을 또 누른 경우
          if (response.data) {
            console.log(response.data)
            alert('이미 등록된 드림이 소개가 있습니다.')
          } else {
            navigate('/dreamee/post')
          }
        })
        .catch((err) => alert(err))
    }
  }

  return (
    <>
      <Dongryowrap>
        <Inner>
          <div style={{ position: 'relative' }}>
            <DreamIntro>동료를 소개합니다!🥰</DreamIntro>
            {!props.noButton && (
              <Dreambutton onClick={regibutton}>드림이로등록</Dreambutton>
            )}
          </div>
          <Dongryowrapul>
            {DreameeLists &&
              DreameeLists.map((DreameeList, index) => (
                <React.Fragment key={index}>
                  <Dreamee dreamee={DreameeList} />
                </React.Fragment>
              ))}
          </Dongryowrapul>
          {PostSize >= Limit && !props.noButton && (
            <LoadMoreBtn onClick={loadmoreHandler}>더보기</LoadMoreBtn>
          )}
        </Inner>
      </Dongryowrap>
    </>
  )
}

export default Dreamees

const Dongryowrap = styled.div`
  width: 100%;
  margin-top: 30px;
`
const Inner = styled.div`
  width: 1100px;
  margin: 0 auto;
`
const Dongryowrapul = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`
const DreamIntro = styled.div`
  font-weight: 600;
  display: flex;
  top: 0;
  bottom: 0;
  align-content: center;
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
