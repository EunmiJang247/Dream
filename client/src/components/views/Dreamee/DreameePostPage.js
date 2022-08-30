import { Input, Select } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import FileUpload from './Sections/FileUpload'
const { Option } = Select

const skillData = [
  { id: 1, name: 'React' },
  { id: 2, name: 'Node' },
  { id: 3, name: 'Vue' },
  { id: 4, name: 'fourth' },
  { id: 5, name: 'fifth' },
  { id: 6, name: 'sixth' },
  { id: 7, name: 'seventh' },
  { id: 8, name: 'eighth' }
]
function DreameePostPage({ mydreamee, userid }) {
  const [isChecked, setIsChecked] = useState(false)
  const [checkedItems, setCheckedItems] = useState(new Set())

  const navigate = useNavigate() //이게안들어갔음
  const [nickname, setNickname] = useState('')
  const [position, setPosition] = useState('')
  const [tech, setTech] = useState([])
  const [portfolio, setPortfolio] = useState('')
  const [kakao, setKakao] = useState('')
  const [selfintro, setSelfintro] = useState('')

  const [updatetoggle, setUpdatetoggle] = useState(false)
  const [Images, setImages] = useState('')

  const onClickHandler = () => {
    //드림이신규등록
    const body = {
      userFrom: localStorage.getItem('userId'),
      nickname: nickname,
      position: position,
      tech: tech,
      introduce: selfintro,
      portfolio: portfolio,
      kakao: kakao,
      selfintro: selfintro,
      Images: Images
    }
    axios.post(`/api/dreamee/post`, body).then((response) => {
      if (response.data.success) {
        alert('프로젝트 업로드 성공!')
        navigate('/')
      } else {
        alert('업로드 실패')
      }
    })
  }

  //skill 체크 부분 - 신규작성의경우
  const checkHandlerNewregi = (event) => {
    setIsChecked(!isChecked)
    checkedItemHandlerNewregi(event.target.value, event.target.checked)
  }
  const checkedItemHandlerNewregi = (Id, isChecked) => {
    if (isChecked) {
      checkedItems.add(Id)
      setCheckedItems(checkedItems)
    } else if (!isChecked && checkedItems.has(Id)) {
      checkedItems.delete(Id)
      setCheckedItems(checkedItems)
    }
    setTech([...checkedItems])
    // setResult(details)
    return checkedItems
  }
  //skill 체크 부분 - 신규작성의경우

  const onModifyHandler = () => {
    //마이페이지에서 자기소개 페이지에서 수정하기 버튼을 누른 경우.
    setNickname(mydreamee.nickname)
    setPosition(mydreamee.position)
    setPortfolio(mydreamee.portfolio)
    setKakao(mydreamee.kakao)
    setSelfintro(mydreamee.introduce)
    //setTech설정하는 부분!
    setTech(mydreamee.tech)
    setCheckedItems(mydreamee.tech)
    setUpdatetoggle((prev) => !prev)
    setImages(mydreamee.Images)
  }

  const checkHandler = (event) => {
    setIsChecked(!isChecked)
    checkedItemHandler(event.target.value, event.target.checked)
  }
  const checkedItemHandler = (Id, isChecked) => {
    if (isChecked) {
      checkedItems.push(Id)
      setCheckedItems(checkedItems)
    } else if (!isChecked && checkedItems.includes(Id)) {
      //Id가 추가된 인덱스 = 배열의 맨 끝. ==> 중간에 누른거 삭제하는 경우 안됨..
      //--> 추가된 Id의 인덱스값을 찾은다음에 그것을 돌려주어야 한다.
      const option = checkedItems.indexOf(Id)
      checkedItems.splice(option, 1)
      setCheckedItems(checkedItems)
    }
    setTech([...checkedItems])
    // setResult(details)
    return checkedItems
  }

  const onModifyCompleteHandler = () => {
    const body = {
      userFrom: localStorage.getItem('userId'),
      nickname: nickname,
      position: position,
      tech: tech,
      introduce: selfintro,
      portfolio: portfolio,
      kakao: kakao,
      Images: Images
    }

    //수정하는 부분
    axios.put(`/api/dreamee/${mydreamee._id}`, body).then((response) => {
      if (response.data.success) {
        alert('드림이 정보가 수정되었습니다')
        navigate('/')
      } else {
        alert('업로드 실패')
      }
    })
    setUpdatetoggle((prev) => !prev)
  }

  const updateImages = (newImages) => {
    //props.refreshFunction(response.data.filePath)로 보내준 부분
    //newImages에는 사진이 담긴 경로가 있다.
    setImages(newImages)
  }

  const handleChange = (value) => {
    setPosition(value)
  }

  return (
    <>
      {!updatetoggle && mydreamee && (
        //마이페이지의 내 드림이소개에서 접근한 경우, 수정버튼 안누른경우
        <Resultdiv>
          <ResultHead>
            Tell me more detail <br />
            about yourself
          </ResultHead>
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>사진</span>
          <br />
          {mydreamee.Images && (
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={mydreamee.Images}
              alt="이미지"
            />
          )}
          <br />

          <br />
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>닉네임</span>
          <br />
          {mydreamee.nickname}

          <br />
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            지원예정/현재 직군
          </span>
          <br />
          {mydreamee.position}
          <br />
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            기술스택
          </span>
          {skillData.map((row, idx) => (
            <React.Fragment key={idx}>
              <input
                type="checkbox"
                name="skill"
                value={row.name}
                checked={mydreamee?.tech?.includes(row.name)}
              />
              <span style={{ paddingLeft: '5px' }}>{row.name}</span>
            </React.Fragment>
          ))}
          <br />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            포트폴리오 웹사이트
          </span>
          <br />
          {mydreamee.portfolio}
          <br />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            카카오아이디(프로젝트 수락할 경우에만 열람이 가능합니다)
          </span>
          <br />
          {mydreamee.kakao}
          <br />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            자신에 대한 간략한 설명
          </span>
          <br />
          {mydreamee.introduce}

          <SubmitButton onClick={onModifyHandler}>수정하기</SubmitButton>
        </Resultdiv>
      )}

      {updatetoggle && mydreamee && (
        //마이페이지의 내 드림이소개에서 수정하기 버튼 누른경우
        <Resultdiv>
          <ResultHead>
            Tell me more detail <br />
            about yourself
          </ResultHead>
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>사진</span>
          <FileUpload
            refreshFunction={updateImages}
            dreameeImages={mydreamee.Images}
          />
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            닉네임 수정
          </span>
          <input
            style={{ display: 'block', marginBottom: '10px' }}
            size="default"
            placeholder=""
            defaultValue={mydreamee.nickname}
            onChange={(e) => setNickname(e.target.value)}
          />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            지원예정/현재 직군
          </span>
          <br />
          <Select
            style={{ width: 120 }}
            onChange={handleChange}
            value={mydreamee.position}
          >
            <Option value="프론트앤드개발자">프론트앤드개발자</Option>
            <Option value="백앤드개발자">백앤드개발자</Option>
            <Option value="디자이너">디자이너</Option>
            <Option value="기획자">기획자</Option>
          </Select>
          <br />
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            기술스택
          </span>
          <br />
          {skillData.map((row, idx) => (
            <>
              <input
                type="checkbox"
                value={row.name}
                name="skill"
                onChange={checkHandler}
                // checked={mydreamee?.tech?.includes(row.name)}
                defaultChecked={mydreamee.tech.includes(row.name)}
              />
              <span style={{ paddingLeft: '5px' }}>{row.name}</span>
            </>
          ))}
          <br />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            포트폴리오 웹사이트
          </span>
          <input
            style={{ display: 'block', marginBottom: '10px' }}
            size="default"
            placeholder=""
            onChange={(e) => setPortfolio(e.target.value)}
            defaultValue={mydreamee.portfolio}
          />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            카카오아이디(프로젝트 수락할 경우에만 열람이 가능합니다)
          </span>
          <input
            style={{ display: 'block', marginBottom: '10px' }}
            size="default"
            placeholder=""
            onChange={(e) => setKakao(e.target.value)}
            defaultValue={mydreamee.kakao}
          />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            자신에 대한 간략한 설명
          </span>
          <br />
          <textarea
            rows={4}
            onChange={(e) => setSelfintro(e.target.value)}
            defaultValue={mydreamee.introduce}
          />

          {nickname === '' ||
          position === '' ||
          tech === '' ||
          portfolio === '' ||
          kakao === '' ||
          selfintro === '' ||
          Images === '' ? (
            <SubmitButtonDisable>수정완료</SubmitButtonDisable>
          ) : (
            <>
              <SubmitButton onClick={onModifyCompleteHandler}>
                수정완료
              </SubmitButton>
              <Link to={{ pathname: `/mypage/mydreamee/${userid}` }}>
                <SubmitButton>돌아가기</SubmitButton>
              </Link>
            </>
          )}
        </Resultdiv>
      )}

      {!updatetoggle && !mydreamee && (
        //드림이 신규작성의 경우
        <Resultdiv>
          <ResultHead>
            Tell me more detail <br />
            about yourself
          </ResultHead>
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>사진</span>
          <FileUpload refreshFunction={updateImages} />
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            닉네임 신규작성
          </span>
          <Input
            style={{ display: 'block', marginBottom: '10px' }}
            size="default"
            placeholder=""
            onChange={(e) => setNickname(e.target.value)}
          />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            지원예정/현재 직군
          </span>
          <br />
          <Select style={{ width: 120 }} onChange={handleChange}>
            <Option value="프론트앤드개발자">프론트앤드개발자</Option>
            <Option value="백앤드개발자">백앤드개발자</Option>
            <Option value="디자이너">디자이너</Option>
            <Option value="기획자">기획자</Option>
          </Select>

          <br />
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            기술스택
          </span>
          <br />
          {skillData.map((row, idx) => (
            <>
              <input
                type="checkbox"
                value={row.name}
                onChange={checkHandlerNewregi}
              />
              <span style={{ paddingLeft: '5px' }}>{row.name}</span>
            </>
          ))}
          <br />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            포트폴리오 웹사이트
          </span>
          <Input
            style={{ display: 'block', marginBottom: '10px' }}
            size="default"
            placeholder=""
            onChange={(e) => setPortfolio(e.target.value)}
          />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            카카오아이디(프로젝트 수락할 경우에만 열람이 가능합니다)
          </span>
          <Input
            style={{ display: 'block', marginBottom: '10px' }}
            size="default"
            placeholder=""
            onChange={(e) => setKakao(e.target.value)}
          />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            자신에 대한 간략한 설명
          </span>
          <TextArea rows={4} onChange={(e) => setSelfintro(e.target.value)} />

          {nickname === '' ||
          position === '' ||
          tech === '' ||
          portfolio === '' ||
          kakao === '' ||
          selfintro === '' ||
          Images === '' ? (
            <SubmitButtonDisable>최종 제출하기</SubmitButtonDisable>
          ) : (
            <SubmitButton onClick={onClickHandler}>최종 제출하기</SubmitButton>
          )}
        </Resultdiv>
      )}
    </>
  )
}

export default DreameePostPage
const Resultdiv = styled.div`
  width: 600px;
  margin: 80px auto;
`
const ResultHead = styled.h1`
  font-size: 50px;
  text-align: center;
`
const SubmitButton = styled.button`
  width: 150px;
  display: block;
  margin: 30px auto;
  border-radius: 5px;
  color: white;
  padding: 10px 21px;
  border: none;
  background: rgb(232, 52, 78);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
`

const SubmitButtonDisable = styled.button`
  width: 150px;
  display: block;
  margin: 30px auto;
  border-radius: 5px;
  color: #333;
  padding: 10px 21px;
  border: none;
  background: #e2e2e2;
  font-size: 14px;
  font-weight: 700;
`
