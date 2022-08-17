import { Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const OPTIONS = ['React','Node','Vue','Php','AWS','Angular','Devops','Java'];

function DreameePostPage() {
    const navigate = useNavigate();
    const [nickname,setNickname] = useState("")
    const [position,setPosition] = useState("")
    const [portfolio,setPortfolio] = useState("")
    const [kakao, setKakao] = useState("")
    const [selfintro, setSelfintro] = useState("")


    const onClickHandler = () => {
        const body={
            userFrom: localStorage.getItem('userId'),
            nickname:nickname,
            position:position,
            tech:selectedItems,
            introduce:selfintro,
            portfolio:portfolio,
            kakao:kakao,
        }
        axios.post(`/api/dreamee/post`, body)
        .then(response => {
            if(response.data.success){
              alert('프로젝트 업로드 성공!')
              navigate('/');
            }else{
              alert('업로드 실패')
            }
          }) 
    }
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
  return (
    <Resultdiv>
        <ResultHead>Tell me more detail <br/>about yourself</ResultHead>
        <span style={{marginLeft:'10px', fontWeight: 'bold'}}>닉네임</span>
        <Input style={{ display:'block', marginBottom:'10px'}} size="default" 
        placeholder="" onChange={(e)=>setNickname(e.target.value)}
        />

        <span style={{marginLeft:'10px', fontWeight: 'bold'}}>지원예정/현재 직군</span>
        <Input style={{ display:'block', marginBottom:'10px'}} size="default" 
        placeholder="" onChange={(e)=>setPosition(e.target.value)}
        />

        <span style={{marginLeft:'10px', fontWeight: 'bold'}}>기술스택</span>
            <Select
            mode="multiple"
            placeholder="Inserted are removed"
            value={selectedItems}
            onChange={setSelectedItems}
            style={{
                width: '100%',
            }}
            >
            {filteredOptions.map((item) => (
                <Select.Option key={item} value={item}>
                {item}
                </Select.Option>
            ))}
            </Select>

        <span style={{marginLeft:'10px', fontWeight: 'bold'}}>포트폴리오 웹사이트</span>
        <Input style={{ display:'block', marginBottom:'10px'}} size="default" 
        placeholder="" onChange={(e)=>setPortfolio(e.target.value)}
        />  

        <span style={{marginLeft:'10px', fontWeight: 'bold'}}>카카오아이디(프로젝트 수락할 경우에만 열람이 가능합니다)</span>
        <Input style={{display:'block', marginBottom:'10px'}} size="default" 
        placeholder="" onChange={(e)=>setKakao(e.target.value)}
        />

        <span style={{marginLeft:'10px', fontWeight: 'bold'}}>자신에 대한 간략한 설명</span>
        <TextArea rows={4} onChange={(e)=>setSelfintro(e.target.value)}/>
        
        <SubmitButton onClick={onClickHandler}>최종 제출하기</SubmitButton>
    </Resultdiv>
  )
}

export default DreameePostPage;
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