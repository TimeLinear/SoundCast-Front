import KakaoLogin from "react-kakao-login";
import { LoginResponse } from "../type/memberType";
import axios from "../utils/CustomAxios";
import { setCookie, setSessionCookie } from "../utils/Cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login } from "../features/memberSlice";
import { Member } from "../type/memberType";
import { Cookies } from "react-cookie";

interface KakaoLoginFormProps{
    setUser : (data:any) => void;
}

export default function KakaoLoginForm({onSignupRequest, handleClose}:{onSignupRequest:()=>void, handleClose:()=>void}){
    const kakaoJavascriptKey = process.env.REACT_APP_KAKAO_API_KEY as string;
    const member = useSelector((state:RootState) => state.member);
    const dispatch = useDispatch();
    
    const kakaoOnSucess = (data:{response:LoginResponse}) => {
        console.log('카카오전달 데이터',data)

        const ACCESS_TOKEN = data.response.access_token;

        axios 
            .post("http://localhost:8087/soundcast/auth/login/kakao",{
                accessToken:ACCESS_TOKEN
            })
            .then(res => { 
                console.log(res);
                if(!res.data.member){
                    new Cookies().set("ACCESS_TOKEN", ACCESS_TOKEN, {maxAge: 60 * 3, path:'/'});
                    
                    onSignupRequest();
                   }

                console.log("-------------------------")
                console.log(ACCESS_TOKEN);
                console.log("kakao res: "+res.data);
                const JwtToken = res.data.jwtToken;
                setSessionCookie("accessToken", JwtToken); // 필수 사항
             
                dispatch(login(res.data.member));
                console.log(res.data.member);

                handleClose();
            })
            .catch(error => {
                console.log(error);
            })


    }

    const kakaoOnFail =(error:any)=>{
        console.log(error);
    }

    return(
       
        <KakaoLogin 
            token={kakaoJavascriptKey}
            onSuccess={kakaoOnSucess}
            onFail={kakaoOnFail}
        />
      
    )
}