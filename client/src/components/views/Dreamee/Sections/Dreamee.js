import React from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";

function Dreamee(props) {
    const postid = props.dreamee._id;
    const dreammtech = ""
  return (
    <Dongryowrapli>
        <DongryowrapliDiv>
            <Link to={{
            pathname: `/dreamee/detail/${postid}`}}
            >
            <span><img src="" alt="" /></span>
            <strong>{props.dreamee.nickname}</strong>
            <p>{props.dreamee.position}</p>            
            
            <div style={{display:'flex', flexWrap:'wrap',justifyContent:'center', 
            }}>
                {props.dreamee.tech && props.dreamee.tech.map((tech)=>(
                <SkillButton danger><p>{tech}</p></SkillButton>
                ))}
            </div>

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

const SkillButton = styled.button`
    margin: 2px 2px;
    border-radius: 30px;
    border: none;
    background: rgb(232,52,78);
    cursor: pointer;

    p{
        color: white;
        font-size: 12px;
        font-weight: 700;
        margin-bottom: 0;
        padding: 5px 10px;
    }
`    