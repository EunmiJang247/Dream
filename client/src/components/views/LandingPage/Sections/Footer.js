import React from 'react'
import styled from 'styled-components'

function Footer() {
  return (
    <>
      <FooterDiv>
        <Inner>
          <InnderDiv>
            Made By JENNY
            <br />
            If you are interested to make this website together, you can text me
          </InnderDiv>
        </Inner>
      </FooterDiv>
    </>
  )
}

export default Footer

const FooterDiv = styled.div`
  width: 100%;
  background-color: #333;
  height: 120px;
`
const Inner = styled.div`
  width: 1100px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
const InnderDiv = styled.div`
  color: white;
  font-weight: 600;
`
