import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Like from '../ProjectPage/Sections/Like';

function DreameeDetail() {
    const userid = useSelector((state) => state.user)
    const {id} = useParams();
    const [Dreamee, setDreamee] = useState([])

    useEffect(()=>{
      axios.get(`/api/dreamee/${id}`)
        .then(response =>{
          setDreamee(response.data)
          console.log(response.data)
        })
        .catch(err => alert(err))
    },[])
  return (
    <>
    <Userdiv>
      <UserInner>
        <UserInfo>
          <UserInfoUpper>
            <div style={{display:'flex'}}>
              <Myface>
                <img src={`http://localhost:5000/${Dreamee.Images}`} alt="Mypicture" />

              </Myface>
              <MyIntroduce>
                <Myname>{Dreamee.nickname}</Myname>
                <Myposition>{Dreamee.position}</Myposition>
              </MyIntroduce>
              <Like DreameeLike dreameeId={id} 
              userid={userid.userData._id}
              />
            </div>
          </UserInfoUpper>

        </UserInfo>
        <UserMiddle>
          <UserMiddleHead>기술스택</UserMiddleHead>
          {Dreamee.tech && Dreamee.tech.map((skill, idx)=>(
            <React.Fragment key={idx}>
            <SkillButton danger style={{marginRight:'10px'}} >{skill}</SkillButton>
            </React.Fragment>
          ))}
          <UserMiddleHead>포트폴리오 주소</UserMiddleHead>
          <div>{Dreamee.portfolio}</div>
        </UserMiddle>
        <UserMiddle>
          <UserMiddleHead>자기소개</UserMiddleHead>
          <div>{Dreamee.introduce}</div>
        </UserMiddle>
      </UserInner>
    </Userdiv>
    </>
  )
}

export default DreameeDetail;
const Userdiv = styled.div`

  padding: 40px 0 120px;
  border-top: 1px solid #eaebed;
  background-color: #f4f5f6;
  display: flex;
  align-items: center;
`
const UserInner = styled.div`
  margin: auto;
  max-width: 942px;
  width: 100%;
  background: white;
`
const UserInfo = styled.div`
  margin: auto;
  max-width: 942px;
  width: 100%;
  padding: 32px 20px 32px;
  border-top: none;
  border-left: none;
  border-right: none;
  background-color: #fff;

  border-bottom: 1px solid #f4f5f6;
`
const UserInfoUpper = styled.div`
  display: flex;
  align-items: center;
`
const Myface = styled.div`
    width: 36px;
    height: 36px;
    border: solid 1px #adb5bd;
    background-color: #f1f1f1;
    border-radius: 100px;
    overflow: hidden;

    img{
      width: 100%;
    }

`
const MyIntroduce = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: start;
  flex-direction: column;
`
const Myname = styled.div`
    font-size: 14px;
    font-weight: 600;
    line-height: 1.5;
    color: #1c1d1e;

`
const Myposition = styled.div`
    font-size: 12px;
    font-weight: 500;
    line-height: 1.3;
    color: #838689;
`
const UserTitle = styled.div`
    margin-top: 16px;
    margin-bottom: 4px;
`
const UserTitleh1 = styled.h1`
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
    text-align: left;
    color: #1c1d1e;

`
const Badgesdiv = styled.div`
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
`
const ThreeBadges = styled.div`
  display: flex;
`
const FirstBadge = styled.div`
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    -webkit-justify-content: start;
    justify-content: start;
    gap: 4px;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    text-align: left;
    color: #838689;
`
const FirstImoti = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
`
const UserMiddle = styled.div`
    padding: 39px 40px;
    border-bottom: solid 1px #eaebed;
    background-color: #fff;
`
const UserMiddleHead = styled.div`
  font-weight: 600;
  margin: 10px 0;
`
const SkillButton = styled.button`
    margin: auto;
    border-radius: 30px;
    color: white;
    padding: 5px 21px;
    border: none;
    background: rgb(232,52,78);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    margin-bottom:20px ;
`