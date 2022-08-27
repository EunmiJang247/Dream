import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function ApplierAcceptButton({ DreameeUserFrom, projectid }) {
  const [buttonBright, setButtonBright] = useState('')
  // console.log(DreameeUserFrom,projectid)
  const variables = {
    DreameeUserFrom,
    projectid
  }
  useEffect(() => {
    axios
      .post(`/api/apply/acceptedornot`, variables)
      .then((response) => {
        setButtonBright(response.data.doc[0].Acceptornot)
      })
      .catch((err) => alert(err))
  }, [buttonBright])

  function Accept(dreameeUserId) {
    const variables = {
      dreameeUserId,
      projectid
    }
    axios
      .post('/api/apply/accept', variables)
      .then((response) => {
        console.log(response)
        setButtonBright(response)
      })
      .catch((err) => alert(err))
  }

  function Deny(dreameeUserId) {
    //해당 사용자 미수락버튼 눌렀을 때.
    const variables = {
      dreameeUserId,
      projectid
    }
    axios
      .post('/api/apply/deny', variables)
      .then((response) => {
        console.log(response)
        setButtonBright(response)
      })
      .catch((err) => alert(err))
  }

  return (
    <>
      {buttonBright && (
        //수락이 되어있다면
        <>
          <AcceptDenyBox>
            <p>수락되었습니다!</p>
            <AcceptDenyButton onClick={() => Deny(DreameeUserFrom)}>
              수락취소
            </AcceptDenyButton>
          </AcceptDenyBox>
        </>
      )}

      {!buttonBright && (
        //수락이 안되어있다면
        <AcceptDenyBox>
          <p>
            <br />
          </p>
          <AcceptDenyButton onClick={() => Accept(DreameeUserFrom)}>
            수락하기
          </AcceptDenyButton>
        </AcceptDenyBox>
      )}
    </>
  )
}

export default ApplierAcceptButton
const AcceptDenyButton = styled.button`
  background-color: red;
  border-radius: 5px;
  border: none;
  padding: 5px 10px;
  color: white;

  height: 30px;
`

const AcceptDenyBox = styled.div`
  position: absolute;
  right: 30px;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 48px;

  p {
    font-size: 7px;
    color: gray;
    margin-bottom: 0;
  }
`
