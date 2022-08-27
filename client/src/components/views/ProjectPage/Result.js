import { Calendar, DatePicker, Input } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import Peopleneed from './Sections/Peopleneed'
import dayjs from 'dayjs'

function Result(props) {
  const { projectid } = useParams()
  const purposeArray = [
    { id: 1, name: '커리어와 능력향상을 위한 포트폴리오 제작' },
    { id: 2, name: '불로소득을 위한 첫걸음, 창업' }
  ]

  const cateArray = [
    { id: 1, name: '웹사이트' },
    { id: 2, name: '애플리케이션' },
    { id: 3, name: '웹/앱 둘다' }
  ]

  const meetingArray = [
    { id: 1, name: '온라인,매주' },
    { id: 2, name: '오프라인,매주' },
    { id: 3, name: '온.오프라인혼합,매주' },
    { id: 4, name: '온.오프라인혼합,격주' },
    { id: 5, name: '협의 후 조율' }
  ]

  const metorArray = [
    { id: 1, name: '멘토링도 고려하고있다' },
    { id: 2, name: '필요하지 않다' }
  ]

  console.log(!props.ProjectModifyPage)

  const selectedanswer = useSelector((state) => state.project.selectedanswer)
  const navigate = useNavigate()

  const [purpose, setPurpose] = useState('')
  const [servicecate, setServicecate] = useState('')
  const [meetingcycle, setMeetingcycle] = useState('')
  const [mentoring, setMentoring] = useState('')

  const [teamname, setTeamname] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [dreameeInfo, setDreameeInfo] = useState([])
  const [kakaoaddress, setKakaoaddress] = useState('')
  const [longDesc, setLongDesc] = useState('')
  const [duedate, setDuedate] = useState('')

  useEffect(() => {
    if (!props.ProjectModifyPage) {
      //내가올린프로젝트에서 접근하지 않은 경우
      console.log('하이')
      setPurpose(selectedanswer[0].answer)
      setServicecate(selectedanswer[1].answer)
      setMeetingcycle(selectedanswer[2].answer)
      setMentoring(selectedanswer[3].answer)
    } else if (props.ProjectModifyPage) {
      //내가올린프로젝트에서 접근한 경우
      //axios에서 프로젝트 정보를 가져온다.
      axios
        .get(`/api/project/${projectid}`)
        .then((response) => {
          console.log('response.data', response.data)
          setPurpose(response.data.purpose)
          setServicecate(response.data.servicecate)
          setMeetingcycle(response.data.meetingcycle)
          setMentoring(response.data.mentoring)

          setDreameeInfo(response.data.dreameeInfo)

          setTeamname(response.data.teamname)
          setShortDesc(response.data.projectdesc)
          setKakaoaddress(response.data.kakaoaddress)
          setLongDesc(response.data.projectcontent)
          setDuedate(response.data.duedate)
        })
        .catch((err) => alert(err))
    }
  }, [])

  const body = {
    dreameeInfo: dreameeInfo,
    kakaoaddress: kakaoaddress,
    meetingcycle: meetingcycle,
    mentoring: mentoring,
    projectcontent: longDesc,
    projectdesc: shortDesc,
    purpose: purpose,
    servicecate: servicecate,
    teamname: teamname,
    writer: props.user._id,
    duedate: duedate,
    views: 0
  }

  const onClickHandler = () => {
    axios.post(`/api/project/post`, body).then((response) => {
      if (response.data.success) {
        alert('프로젝트 업로드 성공!')
        navigate('/')
      } else {
        alert('업로드 실패')
      }
    })
  }

  const onClickModifyHandler = () => {
    console.log('수정하기 버튼이 눌렸다')
    console.log(body)
  }

  const onChange = (date, dateString) => {
    setDuedate(dateString)
  }

  var datecc = dayjs(duedate).format('YYYY-MM-DD')
  return (
    <>
      {!props.ProjectModifyPage ? (
        //신규등록하는부분
        <Resultdiv>
          <ResultHead>Tell me more detail </ResultHead>
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>팀이름</span>
          <Input
            style={{ display: 'block', marginBottom: '10px' }}
            size="default"
            placeholder=""
            onChange={(e) => setTeamname(e.target.value)}
          />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            드림프로젝트 단어로 설명
          </span>
          <Input
            style={{ marginBottom: '10px' }}
            showCount
            maxLength={20}
            onChange={(e) => setShortDesc(e.target.value)}
          />

          <Peopleneed setDreameeInfo={setDreameeInfo} />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            오픈카톡방 주소
          </span>
          <Input
            style={{ display: 'block', marginBottom: '10px' }}
            size="default"
            placeholder=""
            onChange={(e) => setKakaoaddress(e.target.value)}
          />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            드림프로젝트 상세 설명
          </span>
          <TextArea rows={6} onChange={(e) => setLongDesc(e.target.value)} />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            Due date
          </span>
          <br />
          <DatePicker onChange={onChange} />

          {teamname === '' ||
          shortDesc === '' ||
          dreameeInfo.length === 0 ||
          kakaoaddress === '' ||
          longDesc === '' ||
          duedate === '' ? (
            <SubmitButtonDisable>등록하기</SubmitButtonDisable>
          ) : (
            <SubmitButton onClick={onClickHandler}>등록하기</SubmitButton>
          )}
        </Resultdiv>
      ) : (
        //수정하는부분
        <Resultdiv>
          <ResultHead>Tell me more detail </ResultHead>
          <span>드림프로젝트 진행 목적은?</span>
          {purposeArray.map((row) => (
            <>
              <div>
                <input
                  type="radio"
                  name="purpose"
                  value={row.name}
                  onChange={(e) => setPurpose(e.target.value)}
                  checked={row.name === purpose}
                />
                <span>{row.name}</span>
              </div>
            </>
          ))}

          <span>만들고자하는 서비스의 카테고리?</span>
          {cateArray.map((row) => (
            <>
              <div>
                <input
                  type="radio"
                  name="servicecate"
                  value={row.name}
                  onChange={(e) => setServicecate(e.target.value)}
                  checked={row.name === servicecate}
                />
                <span>{row.name}</span>
              </div>
            </>
          ))}

          <span>회의주기는?</span>
          {meetingArray.map((row) => (
            <>
              <div>
                <input
                  type="radio"
                  name="meetingcycle"
                  value={row.name}
                  onChange={(e) => setMeetingcycle(e.target.value)}
                  checked={row.name === meetingcycle}
                />
                <span>{row.name}</span>
              </div>
            </>
          ))}

          <span>멘토가 필요하신가요?</span>
          {metorArray.map((row) => (
            <>
              <div>
                <input
                  type="radio"
                  name="mentoring"
                  value={row.name}
                  onChange={(e) => setMentoring(e.target.value)}
                  checked={row.name === mentoring}
                />
                <span>{row.name}</span>
              </div>
            </>
          ))}
          <br />
          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            팀이름 수정부분
          </span>
          <Input
            style={{ display: 'block', marginBottom: '10px' }}
            size="default"
            placeholder=""
            onChange={(e) => setTeamname(e.target.value)}
            value={teamname}
          />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            드림프로젝트 단어로 설명
          </span>
          <Input
            style={{ marginBottom: '10px' }}
            showCount
            maxLength={20}
            onChange={(e) => setShortDesc(e.target.value)}
            value={shortDesc}
          />

          <Peopleneed
            setDreameeInfo={setDreameeInfo}
            dreameeInfo={dreameeInfo}
          />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            오픈카톡방 주소
          </span>
          <Input
            style={{ display: 'block', marginBottom: '10px' }}
            size="default"
            placeholder=""
            onChange={(e) => setKakaoaddress(e.target.value)}
            value={kakaoaddress}
          />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            드림프로젝트 상세 설명
          </span>
          <TextArea
            rows={6}
            onChange={(e) => setLongDesc(e.target.value)}
            value={longDesc}
          />

          <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
            Due date
          </span>
          <br />
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={datecc}
            onChange={(e) => setDuedate(e.target.value)}
          />
          {teamname === '' ||
          shortDesc === '' ||
          dreameeInfo.length === 0 ||
          kakaoaddress === '' ||
          longDesc === '' ||
          duedate === '' ? (
            <SubmitButtonDisable>수정하기</SubmitButtonDisable>
          ) : (
            <SubmitButton onClick={onClickModifyHandler}>수정하기</SubmitButton>
          )}
        </Resultdiv>
      )}
    </>
  )
}

export default Result
const Resultdiv = styled.div`
  width: 600px;
  margin: 40px auto;
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
