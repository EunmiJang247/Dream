import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import Dreamee from './Dreamee';

function Dreamees() {
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(2)
    const [Dreamees, setDreamees] = useState([])

    useEffect(()=>{
        let body = {
          skip: Skip,
          limit: Limit
        }
        getProducts(body)
      },[])

      const getProducts = (body) => {
        axios.post('/api/dreamee', body)
          .then(response => { 
            if(response.data.success){
                setDreamees(response.data.projectInfo)
            }
          })
      }

  return (
    <>  
    <Dongryowrap>
        <Inner>
        <div style={{height:'50px', position:'relative'}}>
          <DreamIntro>동료를 소개합니다!🥰</DreamIntro>
          <Dreambutton>드림이로등록</Dreambutton>
        </div>
            <Dongryowrapul> 
            {Dreamees.map((result)=>(
                <Dreamee key={result._id} dreamee={result} />
            ))}
            </Dongryowrapul>
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