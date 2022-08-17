import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Dreamee from './Dreamee';

function Dreamees(props) {
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(props.Limit)
    const [Dreamees, setDreamees] = useState([])
    const [PostSize, setPostSize] = useState(0)

    useEffect(()=>{
        let body = {
          skip: Skip,
          limit: Limit
        }
        getDreamee(body)
      },[])

      const getDreamee = (body) => {
        axios.post('/api/dreamee', body)
          .then(response => { 
            if(response.data.success){
                if(body.loadMore){
                  setDreamees([...Dreamees, ...response.data.dreameeInfo])
                }else{
                  setDreamees(response.data.dreameeInfo)
                }
                setPostSize(response.data.postSize)
            }else{
              alert("드림이정보 가져오는데 실패")
            }
          })
      }

      const loadmoreHandler = () => {
        let skip = Skip+Limit
        let body = {
          skip: skip,
          limit: Limit,
          loadMore : true
        }
        getDreamee(body)
        setSkip(skip)
      }

  return (
    <>  
    <Dongryowrap>
        <Inner>
        <div style={{height:'50px', position:'relative'}}>
          <DreamIntro>동료를 소개합니다!🥰</DreamIntro>
          {!props.noButton &&
          <Link to={{pathname: `/dreamee/post`}}><Dreambutton>드림이로등록</Dreambutton></Link>
          }
        </div>
            <Dongryowrapul> 
            {Dreamees && Dreamees.map((result)=>(
                <Dreamee key={result._id} dreamee={result} />
            ))}
            </Dongryowrapul>
            {PostSize >= Limit && !props.noButton && 
              <LoadMoreBtn onClick={loadmoreHandler}>더보기</LoadMoreBtn>
            } 

        </Inner>
    </Dongryowrap>
    </>
  )
}

export default Dreamees;

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
    flex-wrap : wrap;
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
    top: 0;
    right: 20px;

    margin: auto;
    border-radius: 5px;
    color: white;
    padding: 10px 21px;
    border: none;
    background: rgb(232,52,78);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;    
`
const LoadMoreBtn = styled.button`
  text-align: center;

  width:100px;
  margin: 30px auto;
  display:block;

  border-radius: 5px;
  color: white;
  padding: 10px 21px;
  border: none;
  background: rgb(232,52,78);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;

`