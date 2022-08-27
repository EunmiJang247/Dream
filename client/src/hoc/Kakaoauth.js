import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const REST_API_KEY = '2adc3d5d075b87f7fc982551735f9c37'
  const REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback'
  const CLIENT_SECRET = 'priOvdE3FHb6PvbcAr3wS2nxGuMNU2F6'

  const code = new URL(window.location.href).searchParams.get('code')
  // 카카오에서 코드를 돌려준다.

  const navigate = useNavigate()

  //이 페이지에 들어오면 geToken이라는 함수가 실행된다.
  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: 'authorization_code',
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: CLIENT_SECRET
    })

    try {
      // access token 가져오기
      const res = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        payload
      )

      // Kakao Javascript SDK 초기화
      window.Kakao.init(REST_API_KEY)
      // access token 설정
      window.Kakao.Auth.setAccessToken(res.data.access_token)

      localStorage.setItem('kakaotoken', res.data.access_token)
      navigate('/profile')
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  return <div>코드는!! {code}</div>
}
export default Auth
