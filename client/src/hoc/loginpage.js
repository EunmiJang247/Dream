import React from 'react'

function Loginpage(props) {
    const KAKAO_AUTH_URL = props.KAKAO_AUTH_URL
  return (
    <>
    <h1><a href={KAKAO_AUTH_URL}>Kakao Login</a></h1>
    </>
  )
}

export default Loginpage