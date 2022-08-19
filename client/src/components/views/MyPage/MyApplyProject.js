import React from 'react'
import { useParams } from 'react-router-dom';
import ProjectLists from '../ProjectPage/Sections/ProjectLists'
import SubMenus from './Sections/SubMenus'

function MyApplyProject() {
    const {userid} = useParams();
  return (
    <>
    <SubMenus />
    <ProjectLists MyApplyroject userid={userid}/>
    </>
  )
}

export default MyApplyProject
//MyApplyPage