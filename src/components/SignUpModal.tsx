import { CredentialResponse } from '@react-oauth/google';
import '../pages/css/Signup.css';
import axios from '../utils/CustomAxios';
import { getCookie, setSessionCookie } from '../utils/Cookie';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/memberSlice';
import { RootState } from '../store/store';
import { useState } from 'react';

const SignUpModal = ({showSignUp, openSignUp, closeSignUp } : {showSignUp:boolean; openSignUp:()=>void; closeSignUp:()=>void}) => {
  
    const showHideClassName = showSignUp ? "modal display-block" : "modal display-none";
    const dispatch= useDispatch();
    const member = useSelector((state:RootState)=>state.member );
    
    //이용약관 체크박스 
    const [isAllAgreed, setIsAllAgreed] = useState(false);
    const [isPrivacyPolicyAgreed, setIsPrivacyPolicyAgreed] = useState(false);
    const [isTermsAgreed, setIsTermsAgreed] = useState(false);
    const [isEventAgreed, setIsEventAgreed] = useState(false);

    const handleAllAgreeChange =(event: { target: { checked: any; }; })=>{
        const checked = event.target.checked;
        setIsAllAgreed(checked);
        setIsPrivacyPolicyAgreed(checked);
        setIsTermsAgreed(checked);
        setIsEventAgreed(checked);

    };
    
    const handlePrivacyPolicyChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsPrivacyPolicyAgreed(event.target.checked);
    };

    const handleTermsChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsTermsAgreed(event.target.checked);
    };

    const handleEventChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setIsEventAgreed(event.target.checked);
    };
    const canSignUp = isPrivacyPolicyAgreed && isTermsAgreed;

   
    
    const Credential = getCookie('Credential');
    const kktCredential = getCookie('ACCESS_TOKEN');

    const checkCre = Credential || kktCredential;
    const enroll =()=>{
        console.log("enroll Credential:"+ Credential);
        console.log("enroll accessToken : "+ kktCredential);

        if(!Credential && kktCredential){
            axios
                .post("http://localhost:8087/soundcast/auth/enroll/kakao",{
                    accessToken: kktCredential
                })
                .then(res =>{
                    console.log("카카오톡enroll : " +res);
                    const JwtToken = res.data.jwtToken;
                    console.log("카톡jwttoken : " + JwtToken);
                    setSessionCookie("accessToken",JwtToken);
                    
                    dispatch(login(res.data.member));
                    closeSignUp();
                })     
        } else if(Credential){
            axios
                .post("http://localhost:8087/soundcast/auth/enroll/google", {
                    Credential
                })
                .then(res =>{
    
                    console.log("google enroll res: "+ res.data.jwtToken);
                    const JwtToken = res.data.jwtToken;
                    setSessionCookie("accessToken",JwtToken);
                    console.log(res);
                    dispatch(login(res.data.member));
                    closeSignUp();
                   
                })
                
                .catch(error => {
                    console.log(error);
                })

        }


    }
    
    const serverImagePath = "http://localhost:8087/soundcast/resource/";

    return (
        <div className={showHideClassName}>
            <div className="signup-main">
                <button className="close-button" onClick={closeSignUp}>X</button>
                <div className='signup-serve'>
                    <h2 className='h2' style={{ color: 'black' }}>이용약관</h2>
                    <p style={{ color: '#BBBBBB' }}>SoundCast 약관 동의가 필요해요.</p>
                    <div className='agree'>
                        <h4 className='allagree'><input type='checkbox' checked={isAllAgreed} onChange={handleAllAgreeChange} />전체 동의</h4>
                        <hr style={{width:"95%", border:"1px solid black"}}/>
                        <li className='필수약관'><input type='checkbox' required checked={isPrivacyPolicyAgreed} onChange={handlePrivacyPolicyChange} />개인정보처리방침 약관에동의<a style={{color:'red'}}>(필수)</a></li>
                        <li className='필수약관2'><input type='checkbox' required checked={isTermsAgreed} onChange={handleTermsChange} />이용약관에 동의<a style={{color:'red'}}>(필수)</a></li>
                        <li className='필수약관3'> <input type='checkbox' checked={isEventAgreed} onChange={handleEventChange} />이벤트,혜택 알림 수신 동의(선택)</li>
                        <div className='heighline'><p>체크하지 않으실 경우<br/> 이벤트,혜택 제공이 제외될 수 있습니다.</p></div>
                    </div>
                    <div className="signup-buttons">
                   
                    {checkCre === Credential && (
                        <img 
                            src={serverImagePath+"public/member/google_Login.svg"}
                            alt="Google Icon" 
                            onClick={() => {
                                if (canSignUp) {
                                    enroll();
                                }
                            }} 
                        />
                    )}

                    {checkCre === kktCredential && (
                        <img 
                            src={serverImagePath+"public/member/kakao_Login.png"}
                            alt="Kakao Icon" 
                            onClick={() => {
                                if (canSignUp) {
                                    enroll();
                                }
                            }} 
                        />
                    )}
                    </div>
                </div>
            </div>
        </div>
    );

};
export default SignUpModal;