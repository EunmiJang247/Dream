//자식컴포넌트
import React from 'react'

function PeopleList({result}) {
    console.log(result)
  return (
    <>
    {result.map((step)=>(
        <>
        <div style={{border : '1px solid red', marginBottom:'5px'}}>
            <div>{step.position}</div>
            <div>{step.skill}</div>
            <div>{step.years}</div>
        </div>
        </>
    ))}
    </>
  )
}

export default PeopleList