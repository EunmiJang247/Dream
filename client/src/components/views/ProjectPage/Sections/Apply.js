import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

function Apply(props) {
    const user = useSelector(state => state.user)
    const [Applied, setApplied] = useState(false)

    let variables = {
        userFrom : user.userData._id,
        projectId : props.projectId
    }

    useEffect(()=>{
        axios.post('/api/apply/applied', variables)
            .then(response => {
                if(response.data.success){
                    setApplied(response.data.liked)
                }else{
                    alert('정보 가져오는데 실패')
                }
        })
    },[])

    const onClickApply = () => {
        if(Applied){
            axios.post('/api/apply/removefromApply',variables)
                .then(response => {
                    if(response.data.success){
                        setApplied(!Applied)
                    }else{
                        alert('Apply빼기 실패')
                    }
                })        
    
        }else{
            axios.post('/api/apply/addToApply',variables)
                .then(response => {
                    if(response.data.success){
                        setApplied(!Applied)
                    }else{
                        alert('Like추가 실패')
                    }
                })    
        }
    }

  return (
    <Applybutton onClick={onClickApply}>{Applied?"지원완료":"지원하기"}</Applybutton>
  )
}

export default Apply
const Applybutton = styled.button`
    border-radius: 5px;
    color: white;
    padding: 10px 21px;
    border: none;
    background: rgb(232,52,78);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
`