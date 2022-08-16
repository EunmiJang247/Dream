import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";

function Dreamee(props) {
    const postid = props.dreamee._id;
  return (
    <Dongryowrapli>
    <DongryowrapliDiv>
        <Link to={{
        pathname: `/dreamee/detail/${postid}`}}
        >
        <span><img src="" alt="" /></span>
        <strong>{props.dreamee.nickname}</strong>
        <p>{props.dreamee.position}</p>
        <em>{props.dreamee.tech}</em>
        </Link>
    </DongryowrapliDiv>
</Dongryowrapli>
  )
}

export default Dreamee
const Dongryowrapli = styled.li`
    width: 24%;
    height: 170px;
    margin-right: 1%;
    margin-bottom : 12px;
    position: relative;
`
const DongryowrapliDiv = styled.div`
    width: 100%;
    height: 170px;
    position: absolute;
    left : 0;
    top : 0;
    padding: 0 20px 10px; 
    background: #fff;
    overflow: hidden;
    border: 1px solid #ebebeb;
    transition: .1s;
    &::before {
        background: rgb(232,52,78);
        position: absolute;
        top: 0;
        left: 0;
        /* z-index: 1; */
        width: 100%;
        height: 4px;
        content: "";
    }
    & span {
        margin: 31px auto 31px;
        display: block;
        width : 56px;
        height: 56px;
        background-color: yellow;
    }
    & strong {
        display: block;
        text-align: center;
    }
    & p {
        text-align: center;
    }
    & em {
        display: none;
        padding-bottom: 20px;
    }
    &:hover {
        z-index: 2;
        height: auto;
        border: 2px solid rgb(232,52,78);;
        
        & em {
        display: block;
        text-align: center;
        
        }
    }
`