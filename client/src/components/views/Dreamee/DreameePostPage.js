import { Input, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import FileUpload from './Sections/FileUpload';
const { Option } = Select;

const skillData = [
    {id: 1, name: "React"},
    {id: 2, name: "Node"},
    {id: 3, name: "Vue"},
    {id: 4, name: "fourth"},
    {id: 5, name: "fifth"},
    {id: 6, name: "sixth"},
    {id: 7, name: "seventh"},
    {id: 8, name: "eighth"},
];
function DreameePostPage({mydreamee}) {
    // console.log('props',props)

    //서버에서 데이터왓을때 호출하던지, 정책을 프롭스로 쓰는것으로! 
    
    const navigate = useNavigate();//이게안들어갔음
    const [nickname,setNickname] = useState("")
    const [position,setPosition] = useState("")
    const [tech, setTech] = useState([]);
    const [portfolio,setPortfolio] = useState("")
    const [kakao, setKakao] = useState("")
    const [selfintro, setSelfintro] = useState("")

    const [updatetoggle, setUpdatetoggle] = useState(false);
    const [Images, setImages] = useState("")
    
    const onClickHandler = () => {
        //드림이신규등록
        if(nickname === ""){
            alert('닉네임을 입력해주세요')
            return
        }else if(position === ""){
            alert('직군을을 입력해주세요')
            return
        }else if(tech === ""){
            alert('기술을 입력해주세요')
            return
        }else if(portfolio === ""){
            alert('포트폴리오 주소를 입력해주세요')
            return
        }else if(kakao === ""){
            alert('카카오아이디를 입력해주세요')
            return
        }else if(selfintro === ""){
            alert('간략한 설명 부분을 입력해주세요')
            return
        }

        const body={
            userFrom: localStorage.getItem('userId'),
            nickname:nickname,
            position:position,
            tech:tech,
            introduce:selfintro,
            portfolio:portfolio,
            kakao:kakao,
            selfintro:selfintro,
            Images:Images,
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
    const [isChecked, setIsChecked] = useState(false)
    const [checkedItems, setCheckedItems] = useState(new Set())

    const checkHandler = (event) => {
        // console.log(event.target.value,event.target.checked)
        setIsChecked(!isChecked);
        checkedItemHandler(event.target.value, event.target.checked)
    }
    const checkedItemHandler = (Id,isChecked) => {
        if(isChecked){
            checkedItems.add(Id);
            console.log(checkedItems)
            setCheckedItems(checkedItems);
        }else if(!isChecked && checkedItems.has(Id)){
            checkedItems.delete(Id);
            console.log(checkedItems)
            setCheckedItems(checkedItems);
        }
        setTech([...checkedItems])
        // setResult(details)
        return checkedItems;
    };

    const onModifyHandler = () => {
        setUpdatetoggle(prev => !prev)
    }

    const onModifyCompleteHandler = () => {
        if(nickname === ""){
            alert('닉네임을 입력해주세요')
            return
        }else if(position === ""){
            alert('직군을을 입력해주세요')
            return
        }else if(tech === ""){
            alert('기술을 입력해주세요')
            return
        }else if(portfolio === ""){
            alert('포트폴리오 주소를 입력해주세요')
            return
        }else if(kakao === ""){
            alert('카카오아이디를 입력해주세요')
            return
        }else if(selfintro === ""){
            alert('간략한 설명 부분을 입력해주세요')
            return
        }
        
        const body={
            userFrom: localStorage.getItem('userId'),
            nickname:nickname,
            position:position,
            tech:tech,
            introduce:selfintro,
            portfolio:portfolio,
            kakao:kakao,
            Images:Images,
        }
        
        axios.put(`/api/dreamee/${mydreamee._id}`, body)
        // .then(response => {
        //     if(response.data.success){
        //       alert('프로젝트 업로드 성공!')
        //       navigate('/');
        //     }else{
        //       alert('업로드 실패')
        //     }
        //   }) 
        setUpdatetoggle(prev => !prev)

    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const handleChange = (value) => {
        setPosition(value)
    }

  return (
    <>

    {!updatetoggle && mydreamee &&
    //마이페이지의 내 드림이소개에서 접근한 경우, 수정버튼 안누른경우 
        <Resultdiv>
            <ResultHead>Tell me more detail <br/>about yourself</ResultHead>
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>사진</span>
            <br />
            
            <br />
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>닉네임</span>
            <Input style={{ display:'block', marginBottom:'10px'}} size="default" 
            placeholder="" 
            value={mydreamee.nickname}
            />

            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>지원예정/현재 직군</span>
            {/* <Input style={{ display:'block', marginBottom:'10px'}} size="default" 
            placeholder="" 
            value={mydreamee.position}
            /> */}
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={(e)=>setPosition(e.target.value)}>
                <Option value="프론트앤드개발자">프론트앤드개발자</Option>
                <Option value="백앤드개발자">백앤드개발자</Option>
                <Option value="디자이너">디자이너</Option>
                <Option value="기획자">기획자</Option>
            </Select>

            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>기술스택</span>
                {skillData.map((row,idx)=>
                    <>
                        <input type="checkbox" name="skill" value={row.name} 
                        checked={mydreamee?.tech?.includes(row.name)}
                        />
                        <span style={{paddingLeft:'5px'}}>{row.name}</span>
                    </>
                )}
            <br />

            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>포트폴리오 웹사이트</span>
            <Input style={{ display:'block', marginBottom:'10px'}} size="default" 
            placeholder="" 
            value={mydreamee.portfolio}
            />  

            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>카카오아이디(프로젝트 수락할 경우에만 열람이 가능합니다)</span>
            <Input style={{display:'block', marginBottom:'10px'}} size="default" 
            placeholder="" 
            value={mydreamee.kakao}
            />

            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>자신에 대한 간략한 설명</span>
            <TextArea rows={4} 
            value={mydreamee.introduce}
            />
            
            <SubmitButton onClick={onModifyHandler}>수정하기</SubmitButton>
        </Resultdiv>
    }

    {updatetoggle && mydreamee &&
    //마이페이지의 내 드림이소개에서 접근한 경우, 수정버튼 누른경우
        <Resultdiv>
            <ResultHead>Tell me more detail <br/>about yourself</ResultHead>
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>사진</span>
            <FileUpload refreshFunction={updateImages}/>
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>닉네임 수정</span>
            <input style={{ display:'block', marginBottom:'10px'}} size="default" 
            placeholder="" 
            defaultValue={mydreamee.nickname}
            onChange={(e)=>setNickname(e.target.value)}
            />

            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>지원예정/현재 직군</span>
            {/* <input style={{ display:'block', marginBottom:'10px'}} size="default" 
            placeholder="" 
            defaultValue={mydreamee.position}
            onChange={(e)=>setPosition(e.target.value)}
            /> */}
            <Select defaultValue="lucy" style={{ width: 120 }} onChange={(e)=>setPosition(e.target.value)}>
                <Option value="프론트앤드개발자">프론트앤드개발자</Option>
                <Option value="백앤드개발자">백앤드개발자</Option>
                <Option value="디자이너">디자이너</Option>
                <Option value="기획자">기획자</Option>
            </Select>

            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>기술스택</span>
                {skillData.map((row,idx)=>
                    <>
                        <input type="checkbox" name="skill" defaultValue={row.name} 
                        onChange={checkHandler} checked={mydreamee?.tech?.includes(row.name)}
                        />
                        <span style={{paddingLeft:'5px'}}>{row.name}</span>
                    </>
                )}
            <br />

            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>포트폴리오 웹사이트</span>
            <input style={{ display:'block', marginBottom:'10px'}} size="default" 
            placeholder="" onChange={(e)=>setPortfolio(e.target.value)}
            defaultValue={mydreamee.portfolio}
            
            />  

            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>카카오아이디(프로젝트 수락할 경우에만 열람이 가능합니다)</span>
            <input style={{display:'block', marginBottom:'10px'}} size="default" 
            placeholder=""  onChange={(e)=>setKakao(e.target.value)}
            defaultValue={mydreamee.kakao}
            />

            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>자신에 대한 간략한 설명</span>
            <textarea rows={4}  onChange={(e)=>setSelfintro(e.target.value)}
            defaultValue={mydreamee.introduce}
            />
            
            <SubmitButton onClick={onModifyCompleteHandler}>수정완료</SubmitButton>
        </Resultdiv>
    }


    {!updatetoggle && !mydreamee &&
    //드림이 신규작성의 경우
        <Resultdiv>
            <ResultHead>Tell me more detail <br/>about yourself</ResultHead>
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>닉네임 신규작성</span>
            <Input style={{ display:'block', marginBottom:'10px'}} size="default" 
            placeholder="" onChange={(e)=>setNickname(e.target.value)}
            />

            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>지원예정/현재 직군</span>
            <br />
            <Select style={{ width: 120 }} onChange={handleChange}>
                <Option value="프론트앤드개발자">프론트앤드개발자</Option>
                <Option value="백앤드개발자">백앤드개발자</Option>
                <Option value="디자이너">디자이너</Option>
                <Option value="기획자">기획자</Option>
            </Select>

            <br />
            <span style={{marginLeft:'10px', fontWeight: 'bold'}}>기술스택</span>
            <br />
            {skillData.map((row,idx)=>
                <>
                    <input type="checkbox" value={row.name} 
                    onChange={checkHandler}
                    />
                    <span style={{paddingLeft:'5px'}}>{row.name}</span>
                </>
            )}
            <br />

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
    }
    </>

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