import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Tabs, Collapse } from 'antd'
import axios from 'axios'
import ApplierAcceptButton from './ApplierAcceptButton'
import { Link } from 'react-router-dom'
const { TabPane } = Tabs

function SeeApplierModal({ projectid }) {
  const [visible, setVisible] = useState(false)
  const [dreameeInfoArray, setdreameeInfoArray] = useState([])
  const [ApplierArray, setApplierArray] = useState([])
  const [dreameeDetailArray, setdreameeDetailArray] = useState([])
  const [Tabname, setTabname] = useState('프론트앤드개발자')
  const [Id, setId] = useState('')

  const SeeApplier = () => {
    setVisible(true)
    axios
      .get(`/api/project/${projectid}`)
      .then((response) => {
        setdreameeInfoArray(response.data.dreameeInfo)
      })
      .catch((err) => alert(err))

    axios
      .get(`/api/apply/${projectid}`)
      .then((response) => {
        setApplierArray(response.data.doc)

        const userFromIdArray = response.data.doc.map((user) => user.userFrom)
        axios
          .post('/api/dreamee/finddreamee', userFromIdArray)
          .then((response) => {
            console.log('response.data/드리미', response.data)
            setdreameeDetailArray(response.data)
          })
          .catch((err) => alert(err))
      })
      .catch((err) => alert(err))
  }

  const onChange = (key) => {
    setTabname(key)
  }
  console.log(dreameeDetailArray)
  return (
    <>
      <ApplyButton onClick={SeeApplier}>지원자보기</ApplyButton>
      <Modal
        title="지원자 보기"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <Tabs defaultActiveKey="1" onChange={onChange}>
          {dreameeInfoArray.map((dreamee) => (
            <TabPane
              tab={`${dreamee.position} ${dreamee.Number}명`}
              key={dreamee.position}
            >
              {dreameeDetailArray &&
                dreameeDetailArray.map((dreamee) => {
                  if (Tabname === dreamee.position) {
                    console.log(`/dreamee/detail/${dreamee._id}`)
                    return (
                      <ApplierAcceptButtonBox>
                        <Link
                          to={{ pathname: `/dreamee/detail/${dreamee._id}` }}
                        >
                          <div style={{ width: '70%' }}>
                            <div>
                              · 닉네임 : <span>{dreamee.nickname}</span>
                            </div>
                            <div>· 담당 : {dreamee.position}</div>
                            <div>· 자기소개 : {dreamee.introduce}</div>
                            <div>· 카카오 오픈채팅방 : {dreamee.kakao}</div>
                          </div>
                        </Link>
                        <ApplierAcceptButton
                          DreameeUserFrom={dreamee.userFrom}
                          projectid={projectid}
                        />
                      </ApplierAcceptButtonBox>
                    )
                  }
                })}
            </TabPane>
          ))}
        </Tabs>
      </Modal>
    </>
  )
}

export default SeeApplierModal
const ApplyButton = styled.button`
  width: 65px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  display: block;
  margin: 0 auto;
  border: 1px solid #ff5656;
  color: #dc3434;

  font-size: 10px;
`
const ApplierAcceptButtonBox = styled.div`
  border: 1px solid black;
  position: relative;
  padding: 15px;
  cursor: pointer;

  &:hover {
    span {
      text-decoration: underline;
    }
  }
`
