//자식컴포넌트
import React from 'react'
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

function PeopleList({result, onDeleteApplier}) {
  // console.log('result',result)
  const DeletePosition = (idx) => {
    onDeleteApplier(idx)
  }
  // console.log('dreameeInfo는요',dreameeInfo)
  return (
    <>
    {result && result.map((step)=>(
        <>
        <PositionDiv>
            <ResultP><HeaderSpan>모집포지션 : </HeaderSpan>{step.position}</ResultP>
            <ResultP><HeaderSpan>기술스택 : </HeaderSpan>{step.skill}</ResultP>
            <ResultP><HeaderSpan>연차 : </HeaderSpan>{step.years}</ResultP>
            <ResultP><HeaderSpan>명수 : </HeaderSpan>{step.Number}</ResultP>
            <CloseOutlined style={{position:'absolute', right:'30px', top:'0', bottom:'0', 
            height:'20px', margin:'auto', cursor:'pointer'}}
            onClick={()=>{
              DeletePosition(step.idx)
            }}
            />
        </PositionDiv>
        </>
    ))}
    </>
  )
}

export default PeopleList;
const ResultP = styled.p`
  margin-left: 20px;
  margin-bottom: 0;

`
const HeaderSpan = styled.span`
  font-weight: 700;
`
const PositionDiv = styled.div`
  position: relative;
  margin-bottom: 3px;
  margin-top:20px;
  padding: 10px;
  border-radius: 20px;
  border: 5px solid #d9d9d9;
`
