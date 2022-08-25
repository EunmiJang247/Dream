import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DreameePostPage from '../Dreamee/DreameePostPage'
import SubMenus from './Sections/SubMenus'
import {useNavigate} from 'react-router-dom';

function Mydreameeintro() {
  const {userid} = useParams();
  const navigate = useNavigate();

  const [mydreamee, setMydreamee] = useState([])

  useEffect(()=>{
    axios.get(`/api/dreamee/mydreamee/${userid}`)
      .then(response =>{
        if(!response.data){
          alert('아직 등록된 드림이 소개가 없습니다. 등록페이지로 이동시켜드리겠습니다')
          navigate('/dreamee/post');
        }else{
        
        console.log(response.data)
        setMydreamee(response.data)
        }
      })
      .catch(err => alert(err))
  },[])

  return (
    <>
    <SubMenus />
    <DreameePostPage mydreamee={mydreamee} userid={userid} />
    </>
  )
}

export default Mydreameeintro