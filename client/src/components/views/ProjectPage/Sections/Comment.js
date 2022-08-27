import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ReplyComment from './ReplyComment'
import SingleComment from './SingleComment'

function Comment(props) {
  const user = useSelector((state) => state.user)

  const { id } = useParams()
  const [commentValue, setcommentValue] = useState('')
  const handleClick = (e) => {
    setcommentValue(e.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const variables = {
      content: commentValue,
      writer: user.userData._id,
      projectId: id
    }

    axios.post('/api/comment/saveComment', variables).then((response) => {
      if (response.data.success) {
        props.refreshFunction(response.data.result)
        setcommentValue('')
      } else {
        alert('코멘트저장실패')
      }
    })
  }
  return (
    <CommentDiv>
      <br />
      <p>댓글</p>
      <hr />
      {/*Comment Lists*/}

      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              //responseTo가 없는댓글, 즉 대댓글이 아닌경우에만 출력
              <React.Fragment key={index}>
                <SingleComment
                  refreshFunction={props.refreshFunction}
                  comment={comment}
                  projectId={id}
                />
                <ReplyComment
                  refreshFunction={props.refreshFunction}
                  parentCommentId={comment._id}
                  projectId={id}
                  commentLists={props.commentLists}
                />
              </React.Fragment>
            )
        )}

      {/* Root Comment Form */}
      {user.userData.isAuth && (
        <form style={{ display: 'flex' }}>
          <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={handleClick}
            value={commentValue}
            placeholder="코멘트를 작성해주세요"
          />
          <br />
          <Submitbutton
            style={{ width: '25%', height: '52px' }}
            onClick={onSubmit}
          >
            댓글달기
          </Submitbutton>
        </form>
      )}
    </CommentDiv>
  )
}

export default Comment
const CommentDiv = styled.div`
  width: 850px;
  margin: 0 auto;
`
const Submitbutton = styled.button``
