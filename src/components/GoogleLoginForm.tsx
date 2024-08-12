import { CredentialResponse, GoogleCredentialResponse, GoogleLogin, GoogleOAuthProvider, TokenResponse } from "@react-oauth/google";

import axios from "../utils/CustomAxios";
import { getCookie, setCookie, setSessionCookie } from "../utils/Cookie";
import { useDispatch, useSelector } from "react-redux";
import memberSlice, { login } from "../features/memberSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { useState } from "react";
import Signup from "./Signup";


const GoogleLoginForm = () => { 
    
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
    const dispatch = useDispatch();
   //유저정보 담는 store 생성
    const member = useSelector((state:RootState)=>state.member );
    const [showSignUpModal, setShowSignUpModal] = useState(false);
    
    

    const googleOnSuccess =(data:CredentialResponse)=>{
        const Credential = data.credential;
        console.log("크리덴셜"+Credential);
        axios
            .post("http://localhost:8087/soundcast/login/google",{
                Credential
            })
            .then(res => {
               
                const JwtToken = res.data.jwtToken;
                
                setSessionCookie("accessToken",JwtToken);
                dispatch(login(res.data.member));
               
            })
            .catch(error => {
                console.log(error);
            })

    }

    
    const googleOnFail = () =>{
       console.log("오류");
    }

   
     return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={googleOnSuccess}
                    onError={googleOnFail}
                />
            </GoogleOAuthProvider>
            
        </>
    );
};


export default GoogleLoginForm;