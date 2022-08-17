import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Like(props) {
    const user = useSelector(state => state.user)

    const [LikeNumber, setLikeNumber] = useState(0)
    const [Liked, setLiked] = useState(false)

     let variables = {
            userFrom : user.userData._id,
            projectId : props.projectId
        }

    useEffect(()=>{
        axios.post('/api/like/likeNumber', variables)
            .then(response => {
                if(response.data.success){
                    setLikeNumber(response.data.LikeNumber)
                }else{
                    alert('like정보 가져오는데 실패')
                }
        })

        axios.post('/api/like/liked', variables)
            .then(response => {
                if(response.data.success){
                    setLiked(response.data.liked)
                }else{
                    alert('정보 가져오는데 실패')
                }
        })
    },[])

  const onClickLike = () => {
    if(Liked){
        axios.post('/api/like/removefromLike',variables)
            .then(response => {
                if(response.data.success){
                    setLikeNumber(LikeNumber-1)
                    setLiked(!Liked)
                }else{
                    alert('Like빼기 실패')
                }
            })        

    }else{
        axios.post('/api/like/addToLike',variables)
            .then(response => {
                if(response.data.success){
                    setLikeNumber(LikeNumber+1)
                    setLiked(!Liked)
                }else{
                    alert('Like추가 실패')
                }
            })     


    }
  } 

  return (
    <>
    <span onClick={onClickLike}>{Liked?"❤️":"🤍"}{LikeNumber}</span>
     

    </>
  )
}

export default Like