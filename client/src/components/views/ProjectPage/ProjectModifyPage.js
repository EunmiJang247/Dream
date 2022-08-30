import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import ProjectPostPage from './ProjectPostPage'
import Result from './Result'

function ProjectModifyPage() {
  // const user = useSelector((state) => state.user.userData)
  const user = useSelector((state) => {
    console.log(state)
    return state.user.userData
  })
  const { id } = useParams()

  return (
    <>
      <Result user={user} ProjectModifyPage />
    </>
  )
}

export default ProjectModifyPage
