import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect } from "react";
import axios from "../utils/CustomAxios";
import { Cookies } from "react-cookie";
import { setSessionCookie } from "../utils/Cookie";
import { login } from "../features/memberSlice";

const NaverLoginForm = ({onSignupRequest, handleClose}:{onSignupRequest:()=>void, handleClose:()=>void}) =>{
    const dispatch = useDispatch();
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID as String
    const callbackUrl='http://localhost:3000';
    const {naver} = window as any;

    const initializeNaverLogin = () => {
        const naverLogin = new naver.LoginWithNaverId({
          clientId,
          callbackUrl,
          isPopup: false,
          loginButton: { color: "green", type: 3, height: "48" },
        });

        naverLogin.init();
        
        naverLogin.getLoginStatus((status: boolean) => {
        if (status) {
          // 로그인 성공 시 사용자 정보 처리
            const user = naverLogin.user;
            console.log('member Info:', user);

            const token = localStorage.getItem('com.naver.nid.access_token');
            if (token) {
                const access_token = token.split('.')[1]
                    axios
                        .post("http://localhost:8087/soundcast/auth/login/naver", {
                            accessToken:access_token
                        })
                        .then(res => { 
                            console.log(res);
                            if(!res.data.member){
                                new Cookies().set("access_token", access_token, {maxAge: 60 * 3, path:'/'});
                                onSignupRequest();
                               }
                            const JwtToken = res.data.jwtToken;
                            setSessionCookie("accessToken", JwtToken); // 필수 사항
                            
                            dispatch(login(res.data.member));
                            handleClose();
                         })
                         .finally(()=>{
                            localStorage.clear();
                         })
                         .catch(error => {
                            console.log(error);
                        })
                }else {
                  console.log('Access token is not available.');
                }
              } else {
                console.log('User is not logged in');
              }
      })
    };
      
    useEffect(() => {
      initializeNaverLogin();
       }, []);


    return(
        <div id="naverIdLogin"></div>
    )

}

export default NaverLoginForm;

