import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

function Apply(props) {
    const user = useSelector(state => state.user)
    const [Applied, setApplied] = useState(false)
    const [ApplyPassResult, setApplyPassResult] = useState("미수락됨")

    let variables = {
        userFrom : user.userData._id,
        projectId : props.projectId,
        Acceptornot : false,
    }

    useEffect(()=>{
        axios.post('/api/apply/applied', variables)
            .then(response => {
                if(response.data.success){
                    if(response.data.applied){//지원한 프로젝트임
                        setApplied(response.data.applied) 
                        if(response.data.info[0].Acceptornot){
                            setApplyPassResult("수락됨")
                        }else{
                            setApplyPassResult("미수락됨")
                        }
                    }
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
    <div>
        {Applied
        ?<Applybutton onClick={onClickApply}>지원완료<div style={{fontSize:'8px', color:'white'}}>({ApplyPassResult})</div></Applybutton>
        :<Applybutton onClick={onClickApply}>지원하기</Applybutton>
        }
    </div>
  )
}

export default Apply
const Applybutton = styled.button`
    border-radius: 5px;
    color: white;
    padding: 8px 12px;
    border: none;
    background: rgb(232,52,78);
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
`

