import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd'
import axios from 'axios'
import { useSelector } from 'react-redux'

const { TextArea } = Input
function SingleComment(props) {
  const user = useSelector((state) => state.user)

  const [OpenReply, setOpenReply] = useState(false)
  const [CommentValue, setCommentValue] = useState('')

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply)
  }

  const onHandleChange = (e) => {
    setCommentValue(e.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      projectId: props.projectId,
      responseTo: props.comment._id //답글이기때문에 이게 있음
    }

    axios.post('/api/comment/saveComment', variables).then((response) => {
      if (response.data.success) {
        console.log('대댓글달기성공')
        props.refreshFunction(response.data.result)
        setCommentValue('')
        setOpenReply(false)
      } else {
        alert('코멘트저장실패')
      }
    })
  }

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      Reply to
    </span>
  ]

  return (
    <div>
      {props.comment.writer && (
        <Comment
          //이거는 엔트디자인
          actions={actions}
          author={props.comment.writer.email}
          avatar={<Avatar src={props.comment.writer.image} alt />}
          content={<p>{props.comment.content}</p>}
        />
      )}
      {OpenReply && (
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={onHandleChange}
            value={CommentValue}
            placeholder="대댓글을 작성해주세요"
          />
          <br />
          <button style={{ width: '25%', height: '52px' }} onClick={onSubmit}>
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default SingleComment
