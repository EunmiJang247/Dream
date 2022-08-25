import { Modal } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ApplyModal from "./SeeApplierModal";
import Like from "./Like";
import dayjs from 'dayjs';
import SeeApplierModal from "./SeeApplierModal";


function ProjectList(props) {
    const user = useSelector(state => state.user.userData)

    const [Applied, setApplied] = useState(false)
    const [ApplyPassResult, setApplyPassResult] = useState("미수락됨")

    useEffect(()=>{
        if(user){
            let variables = {
                userFrom : user._id,
                projectId : props.project._id
            }
            axios.post('/api/apply/applied', variables)
            .then(response => {
                if(response.data.applied){
                    setApplied(true)
                    if(response.data.info[0].Acceptornot){
                        setApplyPassResult("수락됨")
                    }else{
                        setApplyPassResult("미수락됨")
                    }
                }
            }) 
        }
    },[user])
    
    var now = dayjs();
    const remaindays = dayjs(props.project.duedate).diff(dayjs(now.format()),"days")
    const projectId = props.project._id;
  return (
    <>
    {props.MyPostProject && (
        //마이페이지에서 접근한 경우 
    <ListBody>
        <div style={{width:'20%'}}><ProjectPleft>{props.project.teamname}</ProjectPleft></div>
        <div style={{width:'45%'}}>
            <Link  to={{pathname: `/project/detail/${props.project._id}`}}>
            <ProjectPleft>[{props.project.servicecate}] {props.project.projectdesc}</ProjectPleft>
            </Link>
            <ProjectSubdesc>
            {props.project.dreameeInfo.map((dreamee)=>(
                <>
                   {dreamee.position} {dreamee.Number}명 /
                </>
            ))
            }
            </ProjectSubdesc>
        </div>
        <div style={{width:'15%'}}>
            {/* <ProjectCenter style={{width:'inherit'}}> */}
            {props.project.dreameeInfo.map((dreamee)=>{
                    return dreamee.skill.map((skill)=>(
                        <Span>{skill} /</Span>
                    ))
                })
            }
            {/* </ProjectCenter> */}
        </div>
        <div style={{width:'10%'}}><ProjectCenter>{props.project.meetingcycle}</ProjectCenter></div>
        <div style={{width:'10%'}}>
            <SeeApplierModal projectid={props.project._id}/>
            {/* 지원자선택하는 부분 */}
            <Link to={{pathname:`/project/modify/${projectId}`}}><ProjectModifyButton>프로젝트<br />수정하기</ProjectModifyButton></Link>
        </div>
    </ListBody>
    )}
    {!props.MyPostProject && (
        //마이페이지 외 경로로 접근한 경우
    <ListBody>
        <div style={{width:'20%'}}><ProjectPleft>{props.project.teamname}</ProjectPleft></div>
        <div style={{width:'45%'}}>
            <Link  to={{pathname: `/project/detail/${props.project._id}`}}>
            <ProjectPleft>[{props.project.servicecate}] {props.project.projectdesc}</ProjectPleft>
            </Link>
            <ProjectSubdesc>
            {props.project.dreameeInfo.map((dreamee)=>(
                <>
                   {dreamee.position} {dreamee.Number}명 /
                </>
            ))
            }
            </ProjectSubdesc>
        </div>
        
        <div style={{width:'15%'}}>
            {/* <ProjectCenter style={{width:'inherit'}}> */}
            {props.project.dreameeInfo.map((dreamee)=>{
                    return dreamee.skill.map((skill)=>(
                        <Span>{skill} /</Span>
                    ))
                })
            }
            {/* </ProjectCenter> */}
        </div>
        <div style={{width:'10%'}}><ProjectCenter>{props.project.meetingcycle}</ProjectCenter></div>
        <div style={{width:'10%'}}>
            <RegiDueP>{Applied
            ?<Link  to={{pathname: `/project/detail/${props.project._id}`}}>
                <ApplyButton><p>지원완료</p><span>({ApplyPassResult})</span></ApplyButton>
             </Link>
            :<Link  to={{pathname: `/project/detail/${props.project._id}`}}><ApplyButton><p>자세히보기</p></ApplyButton></Link>}
            </RegiDueP>
            <RegiDueP>~{dayjs(props.project.duedate).format("YYYY-MM-DD")}</RegiDueP>
            <RegiDueP>{remaindays}일 남음</RegiDueP>
        </div>
    </ListBody>
    )}
    </>
  )
}

export default ProjectList

const ListBody = styled.div`
    border-bottom: 1px solid #ebebeb;
    display: flex;
    transition: .2s;
    
    & a {
        color: #333;
    }
    & div {
        padding: 12px 0 12px;
        color: #333;

    }
    & span {
        color: #777;
        font-size: 12px;
    }
    &:hover{
        background-color: #FAFAFA ;
        & a {
            text-decoration: underline;
        }
    }
`
const ApplyButton = styled.button`
    width: 79px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    p {
        display: block;
        margin:0 auto ;
        border: 1px solid #ff5656;
        color: #dc3434;
        font-size: 12px;
    }
    span{
        font-size: 7px;
    }
`
const ProjectPleft = styled.p`
    text-align: left;
    padding-left: 20px;

`
const ProjectCenter = styled.p`
    text-align: center;
    color: #777;
    font-size: 12px;
    margin-top: 12px;
`
const ProjectSubdesc = styled.p`
    padding-left: 20px;
    color: #777;
    font-size: 12px;
    line-height: 14px;
`
const RegiDueP = styled.p`
    margin: 0;
    text-align:center ;
    color: #777;
    font-size: 8px;
`
const Span = styled.span`
    white-space: normal;

`
const ProjectModifyButton = styled.button`
    width: 65px;
    border: none;
    background-color: transparent;
    cursor: pointer;

    display: block;
    margin: 5px auto 0;
    border: 1px solid blue;
    color: blue;

    font-size: 10px;
`