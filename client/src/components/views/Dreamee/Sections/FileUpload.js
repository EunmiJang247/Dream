import React, { useState } from 'react'
import Dropzone from 'react-dropzone' //npm install react-dropzone --save
import { PlusOutlined } from '@ant-design/icons'
import axios from 'axios'

function FileUpload(props) {
  const [Images, setImages] = useState(props.dreameeImages)
  const dropHandler = (files) => {
    //사진이 들어오면 작동이 되는 함수이다.
    // console.log(files) 파일에 대한 정보가 담겨져있다.
    let formData = new FormData()
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }
    formData.append('file', files[0])

    //formData랑 config를 같이 넣어주지 않으면 파일 보낼 때 에러발생된다
    //formData : 파일정보 갖고있음. config은 어떤파일인지 알려줌.
    axios.post('/api/dreamee/image', formData, config).then((response) => {
      if (response.data.success) {
        console.log('패쓰는', response.data.filePath)
        setImages(response.data.filePath)
        props.refreshFunction(response.data.filePath)
      } else {
        alert('파일저장하는데 실패')
      }
    })
  }

  const deleteHandler = (Images) => {
    let newImages = ''
    setImages(newImages)
    props.refreshFunction(newImages)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler} multiple={false} maxSize={1000000000}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: '300px',
              height: '240px',
              border: '1px solid lightgray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {/* <AliwangwangOutlined style={{fontSize: '3rem'}} */}
            <PlusOutlined style={{ fontSize: '30px', color: 'gray' }} />
          </div>
        )}
      </Dropzone>

      {/* 파일오면 이미지가 뜰수있게 조치하는 코드 */}
      <div style={{ display: 'flex', width: '300px', height: '240px' }}>
        <div onClick={() => deleteHandler(Images)}>
          {Images && (
            <img
              style={{ minWidth: '300px', width: '300px', height: '240px' }}
              src={`http://localhost:5000/${Images}`}
              alt="이미지"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default FileUpload
