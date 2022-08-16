import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from "react-redux";
import styled from "styled-components";
import ProjectList from './ProjectList';

function ProjectLists() {
    const dispatch = useDispatch();
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(2)
    const [Products, setProducts] = useState([])

    useEffect(()=>{
        let body = {
          skip: Skip,
          limit: Limit
        }
        getProducts(body)
      },[])

      const getProducts = (body) => {
        axios.post('/api/project', body)
          .then(response => { 
            if(response.data.success){
                setProducts(response.data.projectInfo)
            }
          })
      }

  return (
    <>  
    <ChamyeoWrap>
        <Inner>
            <div style={{height:'50px', position:'relative'}}>
                <h5 style={{fontWeight : '600'}}>사이드프로젝트에 참여해볼래요? 😀 </h5>
                <Dreambutton>드림프로젝트등록</Dreambutton>
            </div>
            <List_head>
                <div style={{width:'20%'}}>프로젝트명</div>
                <div style={{width:'45%'}}>이름</div>
                <div style={{width:'15%'}}>지원자격</div>
                <div style={{width:'10%'}}>회의주기</div>
                <div style={{width:'10%'}}>마감일 . 등록일</div>
            </List_head>
            {Products.map((result)=>(
                <ProjectList key={result._id} project={result}/>
            ))}


        </Inner>
    </ChamyeoWrap>
    </>
  )
}

export default ProjectLists

const ChamyeoWrap = styled.div`
    width: 100%;
    margin-top: 30px;
`
const Inner = styled.div`
    width: 1100px;
    margin: 0 auto;
`
const List_head = styled.div`
    border-top: 1px solid #eaeaea;
    height: 38px;
    line-height: 38px;
    box-sizing: border-box;
    color: #888;
    background: rgb(212, 212, 212);;
    display: flex;

    font-size: 13px;
    & div {
        background: #FAFAFA;
        width: 20% ;
        text-align: center;
    }
`
const Dreambutton = styled.button`
    position: absolute;
    top: 0;
    right: 20px;

    margin: auto;
    border-radius: 5px;
    color: white;
    padding: 10px 21px;
    border: none;
    background: rgb(232,52,78);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;    
`