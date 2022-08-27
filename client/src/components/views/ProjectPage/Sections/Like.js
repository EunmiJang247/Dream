import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

function Like(props) {
  console.log(props.dreameeId)
  const user = useSelector((state) => state.user)
  const [LikeNumber, setLikeNumber] = useState(0)
  const [Liked, setLiked] = useState(false)

  useEffect(() => {
    if (props.ProjectLike) {
      let variables = {
        userFrom: user.userData._id,
        projectId: props.projectId
      }

      axios.post('/api/like/projectlikeNumber', variables).then((response) => {
        if (response.data.success) {
          setLikeNumber(response.data.LikeNumber)
        } else {
          alert('like정보 가져오는데 실패')
        }
      })

      axios.post('/api/like/projectliked', variables).then((response) => {
        if (response.data.success) {
          setLiked(response.data.liked)
        } else {
          alert('정보 가져오는데 실패')
        }
      })
    } else if (props.DreameeLike) {
      let variables = {
        userFrom: user.userData._id,
        dreameeId: props.dreameeId
      }
      console.log(variables)
      axios.post('/api/like/dreameelikeNumber', variables).then((response) => {
        if (response.data.success) {
          console.log(response.data)
          setLikeNumber(response.data.LikeNumber)
        } else {
          alert('like정보 가져오는데 실패')
        }
      })

      axios.post('/api/like/dreameeliked', variables).then((response) => {
        if (response.data.success) {
          setLiked(response.data.liked)
        } else {
          alert('정보 가져오는데 실패')
        }
      })
    }
  }, [])

  const onClickLike = () => {
    if (props.ProjectLike) {
      let variables = {
        userFrom: user.userData._id,
        projectId: props.projectId
      }

      if (props.userid) {
        if (Liked) {
          axios
            .post('/api/like/projectremovefromLike', variables)
            .then((response) => {
              if (response.data.success) {
                setLikeNumber(LikeNumber - 1)
                setLiked(!Liked)
              } else {
                alert('Like빼기 실패')
              }
            })
        } else {
          axios
            .post('/api/like/projectaddToLike', variables)
            .then((response) => {
              if (response.data.success) {
                setLikeNumber(LikeNumber + 1)
                setLiked(!Liked)
              } else {
                alert('Like추가 실패')
              }
            })
        }
      } else {
        alert('로그인이 필요한 기능입니다')
      }
    } else if (props.DreameeLike) {
      let variables = {
        userFrom: user.userData._id,
        dreameeId: props.dreameeId
      }

      if (props.userid) {
        if (Liked) {
          axios
            .post('/api/like/dreameeremovefromLike', variables)
            .then((response) => {
              if (response.data.success) {
                setLikeNumber(LikeNumber - 1)
                setLiked(!Liked)
              } else {
                alert('Like빼기 실패')
              }
            })
        } else {
          axios
            .post('/api/like/dreameeaddToLike', variables)
            .then((response) => {
              if (response.data.success) {
                setLikeNumber(LikeNumber + 1)
                setLiked(!Liked)
              } else {
                alert('Like추가 실패')
              }
            })
        }
      } else {
        alert('로그인이 필요한 기능입니다')
      }
    }
  }

  return (
    <>
      <LikeSpan style={{ cursor: 'pointer' }} onClick={onClickLike}>
        {Liked ? '❤️' : '🤍'}
        {LikeNumber}
      </LikeSpan>
    </>
  )
}

export default Like
const LikeSpan = styled.span`
  margin-left: 3px;
  margin-top: 3px;
`
