import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { next, registerProject } from '../../../../_action/project_action';
import { BlueButton } from './BlueButton';
import Progress from './Progress';

function Questions() {
    const dispatch = useDispatch();
    const questions = useSelector((state)=>state.project.questions)
    const page = useSelector((state)=> state.project.page)
    
  return (
    <>
    <MainHeader style={{margin : "30px"}}>{questions[page].question}</MainHeader>
    <h2></h2>
    {questions[page].answer.map((item)=>{
        return(
            <BlueButton 
            text={item.text} 
            clickEvent={()=>{
                    dispatch(registerProject(item.text))
                    dispatch(next())
            }}/>
        )
    })}
    <Progress page={page} maxPage={questions.length} />

    
    </>
  )
}

export default Questions;
const MainHeader = styled.h1`
  font-size: 32px;
  font-weight: 800;
  margin : 30px 0;
`