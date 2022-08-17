import styled from "styled-components";
import React from 'react'
import Dreamees from "./Sections/Dreamees";

function Dreamee() {
  return (
    <>
    <div style={{textAlign: 'center'}}>
        <Header>Let's find Dreamees!</Header>
    </div>
    <Dreamees Limit="20"/>

    </>
  )
}

export default Dreamee;
const Header = styled.div`
    font-size: 40px;
    font-weight: 700;
    margin: 50px 0;
`