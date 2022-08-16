import React from 'react'
import { useParams } from 'react-router-dom';

function DreameeDetail() {
    const {id} = useParams();
    console.log(id)
  return (
    <>
    {id}
    </>
  )
}

export default DreameeDetail