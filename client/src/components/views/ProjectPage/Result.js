import { Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Peopleneed from './Sections/Peopleneed';

function Result(props) {
    const selectedanswer = useSelector((state)=> state.project.selectedanswer);
    const navigate = useNavigate();

    const[purpose, setPurpose] = useState("")
    const[servicecate, setServicecate] = useState("")
    const[meetingcycle, setMeetingcycle] = useState("")
    const[mentoring, setMentoring] = useState("")

    const[teamname, setTeamname] = useState("")
    const[shortDesc, setShortDesc] = useState("")
    const[dreameeInfo, setDreameeInfo] = useState([])
    const[kakaoaddress, setKakaoaddress] = useState("")
    const[longDesc, setLongDesc] = useState("")

    useEffect(()=>{
        setPurpose(selectedanswer[0].answer);
        setServicecate(selectedanswer[1].answer);
        setMeetingcycle(selectedanswer[2].answer);
        setMentoring(selectedanswer[3].answer)

    },[purpose, servicecate,meetingcycle,mentoring])

    const body = {
            writer: props.user._id,
            purpose: purpose,
            meetingcycle: meetingcycle,
            projectdesc:shortDesc,
            projectcontent:longDesc,
            servicecate:servicecate,
            kakaoaddress:kakaoaddress,
            mentoring:mentoring,    
            teamname:teamname,        
            dreameeInfo:dreameeInfo
        }

    const onClickHandler = () => {
      if(teamname === ""){
        alert('팀이름을 작성해주세요')
        return
      }else if(shortDesc ===""){
        alert('프로젝트 한단어 설명을 작성해주세요')
        return
      }else if(dreameeInfo=[]){
        alert('구인목록을 작성해주세요')
        return
      }else if(kakaoaddress === ""){
        alert('오픈카톡방 주소를 입력해주세요')
        return
      }else if(longDesc === ""){
        alert('드림프로젝트 상세설명을 입력해주세요')
        return
      }

        axios.post(`/api/project/post`, body)
        .then(response => {
            if(response.data.success){
              alert('프로젝트 업로드 성공!')
              navigate('/');
            }else{
              alert('업로드 실패')
            }
          }) 
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // console.log('Change:', e.target.value);
        setShortDesc(e.target.value)
    };

  return (
    <>
    <Resultdiv>
        <ResultHead>Tell me more detail <br/>about your dream project</ResultHead>
        <span style={{marginLeft:'10px', fontWeight: 'bold'}}>팀이름</span>
        <Input style={{ display:'block', marginBottom:'10px'}} size="default" placeholder="" onChange={(e)=>setTeamname(e.target.value)}
        />

        <span style={{marginLeft:'10px', fontWeight: 'bold'}}>드림프로젝트 단어로 설명</span>
        <Input style={{ marginBottom:'10px'}} showCount maxLength={15} onChange={onChange} 
        />

        <Peopleneed setDreameeInfo={setDreameeInfo}/>
        {/* <PeopleBoard />
        <PeopleItem /> */}

        <span style={{marginLeft:'10px', fontWeight: 'bold'}}>오픈카톡방 주소</span>
        <Input style={{display:'block', marginBottom:'10px'}} size="default" placeholder="" 
        onChange={(e)=>setKakaoaddress(e.target.value)}
        />

        <span style={{marginLeft:'10px', fontWeight: 'bold'}}>드림프로젝트 상세 설명</span>
        <TextArea rows={6} onChange={(e)=>setLongDesc(e.target.value)}/>
        

        <SubmitButton onClick={onClickHandler}>최종 제출하기</SubmitButton>
    </Resultdiv>
    </>
  )
}

export default Result;
const Resultdiv = styled.div`
    width: 600px;
    margin: 80px auto;
`
const ResultHead = styled.h1`
    font-size: 50px;
    text-align: center;
`
const SubmitButton = styled.button`
    width: 150px;
    display: block;
    margin: 30px auto;
    border-radius: 5px;
    color: white;
    padding: 10px 21px;
    border: none;
    background: rgb(232,52,78);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
`