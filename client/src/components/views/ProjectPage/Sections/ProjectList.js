import React, { useCallback, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";


function ProjectList(props) {
  return (
    <List_body>
    <div style={{width:'20%'}}>{props.project.projecttitle}</div>
    <div style={{width:'45%'}}>
        <Link  to={{pathname: `/project/detail/${props.project._id}`}}>
        {props.project.projectdesc}
        </Link>
    </div>
    <div style={{width:'15%'}}>{props.project.position}</div>
    <div style={{width:'10%'}}>{props.project.meetingcycle}</div>
    <div style={{width:'10%'}}>
        <p>지원하기</p>
        <p>{props.project.duedate}</p>
        <span>{props.project.regidate}일전 등록</span>
    </div>
</List_body>
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
        width: 220px;
        text-align: center;
        color: #333;
        padding: 8px 0 5px;
        min-height: 51px;
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
        width: 52px;
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