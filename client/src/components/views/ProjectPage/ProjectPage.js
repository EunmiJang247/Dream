import styled from "styled-components";
import React from 'react';
import ProjectLists from './Sections/ProjectLists';

function ProjectPage() {
    
  return (
    <>
    <div style={{textAlign: 'center'}}>
        <Header>Let's find the best project!</Header>
    </div>
    <ProjectLists Limit="15" AllLanding/>
    <div style={{height:'30px'}}></div>
    </>
  )
}

export default ProjectPage;
const Header = styled.div`
    font-size: 40px;
    font-weight: 700;
    margin: 50px 0;
`