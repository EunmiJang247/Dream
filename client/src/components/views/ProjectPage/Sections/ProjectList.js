import { Modal } from "antd";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ApplyModal from "./ApplyModal";


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

  return (
    <>
    {props.MyPostProject && (
        //마이페이지에서 접근한 경우 
    <List_body>
        <div style={{width:'20%'}}>{props.project.teamname}</div>
        <div style={{width:'45%'}}>
            <Link  to={{pathname: `/project/detail/${props.project._id}`}}>
            {props.project.projectdesc}
            </Link>
        </div>
        <div style={{width:'15%'}}>{props.project.position}</div>
        <div style={{width:'10%'}}>{props.project.meetingcycle}</div>
        <div style={{width:'10%'}}>
            
            <ApplyModal />

        </div>
    </List_body>
    )}
    {!props.MyPostProject && (
        <List_body>
        <div style={{width:'20%'}}>{props.project.teamname}</div>
        <div style={{width:'45%'}}>
            <Link  to={{pathname: `/project/detail/${props.project._id}`}}>
            {props.project.projectdesc}
            </Link>
        </div>
        <div style={{width:'15%'}}>{props.project.position}</div>
        <div style={{width:'10%'}}>{props.project.meetingcycle}</div>
        <div style={{width:'10%'}}>
            <p>{Applied
            ?<Link  to={{pathname: `/project/detail/${props.project._id}`}}>
                <ApplyButton>지원완료<span style={{fontSize:'2px', color:'red'}}>({ApplyPassResult})</span></ApplyButton>
             </Link>
            :<Link  to={{pathname: `/project/detail/${props.project._id}`}}><ApplyButton>자세히보기</ApplyButton></Link>}
            </p>
            <p>{props.project.duedate}</p>
            <span>{props.project.regidate}일전 등록</span>
        </div>
    </List_body>
    )}
    </>
  )
}

export default ProjectList

const List_body = styled.div`
    border-bottom: 1px solid #ebebeb;
    display: flex;
    transition: .2s;
    & a {
        color: #555;
    }
    & div {
        /* width: 220px; */
        text-align: center;
        color: #333;
        padding: 8px 0 5px;
        display: flex;
        justify-content:center;
        align-items: center;
        flex-direction: column;
        color: #555;
    }
    & p:first-child {
        color: #777;
        font-size: 10px;
        padding: 2px 5px;
    }
    & p {
        color: #777;
        font-size: 12px;
        margin-bottom: 0;
    }
    & span {
        color: #777;
        font-size: 12px;
    }
    & p:first-child {
        display: block;
        margin:0 auto ;
        border: 1px solid #ff5656;
        color: #dc3434;
    }
    &:hover{
        background-color: #FAFAFA ;
        & a {
            color: #555;
            text-decoration: underline;
        }
    }
`
const ApplyButton = styled.button`
    width: 65px;
    border: none;
    background-color: transparent;
    cursor: pointer;
`