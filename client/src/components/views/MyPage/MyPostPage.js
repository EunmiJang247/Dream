import React from 'react'
import { useParams } from 'react-router-dom';
import ProjectLists from '../ProjectPage/Sections/ProjectLists';
import SubMenus from './Sections/SubMenus';

function MyPostPage() {
  const {userid} = useParams();

  return (
    <> 
      <SubMenus />
      <ProjectLists MyPostProject userid={userid}/>
    </>
  )
}

export default MyPostPage;

