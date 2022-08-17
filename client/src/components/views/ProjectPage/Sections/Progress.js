import React from 'react'
import styled from 'styled-components'

function Progress({page, maxPage}) {
  return (
    <>
    <ProgressPart>
        <div className='page'>
            {page+1}/{maxPage}
        </div>
        <Gauge>
            <Fill style={{width:`${page / maxPage * 100}%`}}></Fill>
        </Gauge>
    </ProgressPart>
    </>
  )
}

export default Progress
const ProgressPart = styled.div`
    margin-top:60px;
    width: 400px;
    margin: 0 auto;
`
const Gauge = styled.div`
    width: 100%;
    height: 10px;
    background: #f7f7f7;
    margin-top: 10px;
    text-align: left;
    position: relative;

`
const Fill = styled.span`
    background: #449ce2;
    display: inline-block;
    height: inherit;
    position: absolute;
    top: 0;
`