import axios from "axios";
import React, { useEffect } from "react";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {auth} from '../_action/user_action';


export default function Auth(SpecificComponent, option, adminRoute=null){
    const navigate = useNavigate();

    function AuthenticationCheck(props){
        const dispatch = useDispatch();
        useEffect(()=>{
            dispatch(auth()).then(response => {
                //null 아무나 출입가능
                //true 로그인한 유저만 출입가능
                //false 로그인한 유저는 출입 불가능

                if(!response.payload.isAuth){
                    //로그인 안한상태라면,
                    if(option){
                        navigate('/login');
                    }

                }else{
                    //로그인 한상태라면,
                    if(adminRoute && !response.payload.isAdmin){
                        // 어드민만들어갈수있는라우터고, 어드민유저가 아닐때
                        navigate('/');
                    }else{
                        if(option === false){
                            //로그인한 유저가 안한유저만 들어가는데 들어갈려고할때
                            navigate('/');
                        }
                    }
                }
            });
        },[])
        return (SpecificComponent)
    }
    return AuthenticationCheck
}

//----------------------------------------kakao
// import React from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import qs from "qs";
// import { useNavigate } from "react-router-dom";

// const Auth = () => {
//     const REST_API_KEY = "2adc3d5d075b87f7fc982551735f9c37";
//     const REDIRECT_URI = "http://localhost:3000/oauth/kakao/callback";
//     const CLIENT_SECRET = "priOvdE3FHb6PvbcAr3wS2nxGuMNU2F6";

//     const code = new URL(window.location.href).searchParams.get("code");

//     const navigate = useNavigate();

//     const getToken = async () => {
//         const payload = qs.stringify({
//           grant_type: "authorization_code",
//           client_id: REST_API_KEY,
//           redirect_uri: REDIRECT_URI,
//           code: code,
//           client_secret: CLIENT_SECRET,
//         });

//         try {
//             // access token 가져오기
//             const res = await axios.post(
//               "https://kauth.kakao.com/oauth/token",
//               payload
//             );
            
//             // Kakao Javascript SDK 초기화
//             window.Kakao.init(REST_API_KEY);
//             // access token 설정
//             window.Kakao.Auth.setAccessToken(res.data.access_token);
//             navigate('/profile');
//           } catch (err) {
//             console.log(err);
//           }
//         };

//         useEffect(() => {
//             getToken();
//           }, []);

//     return (
//         <div>
//             코드는!! { code }
//         </div>
//     );
// };
// export default Auth;