import { CredentialResponse } from '@react-oauth/google';
import '../pages/css/Signup.css';
import axios from '../utils/CustomAxios';
import { setSessionCookie } from '../utils/Cookie';
import { useDispatch } from 'react-redux';
import { login } from '../features/memberSlice';
import GoogleLoginForm from './GoogleLoginForm';

const Signup = ({ showSign, Close } : {showSign:boolean, Close:()=>void}) => {

    const showHideClassName = showSign ? "modal display-block" : "modal display-none";
    const dispatch=useDispatch();


    // const googleOnSuccess =(data:CredentialResponse)=>{
    //     const Credential = data.credential;
    //     console.log("크리덴셜"+Credential);
    //     axios
    //         .post("http://localhost:8087/soundcast/enroll/google",{
    //             Credential
    //         })
    //         .then(res => {
    //                 const JwtToken = res.data.jwtToken;
    //                 setSessionCookie("accessToken",JwtToken);
    //                 dispatch(login(res.data.member));

    //             })

    //         .catch(error => {
    //             console.log(error);
    //         })

    // }

    // const googleOnFail = () =>{
    //     console.log("오류");
    //  }
 





    return (
        <div className={showHideClassName}>
            <div className="signup-main">
                <button className="close-button" onClick={Close}>X</button>
                <div className='signup-serve'>
                    <h2 className='h2' style={{ color: 'black' }}>이용약관</h2>
                    <p style={{ color: '#BBBBBB' }}>SoundCast 약관 동의가 필요해요.</p>
                    <div className='agree'>
                        <h4 className='allagree'><input type='checkbox' />전체 동의</h4>
                        <hr style={{width:"95%", border:"1px solid black"}}/>
                        <li className='필수약관'><input type='checkbox' required />개인정보처리방침 약관에동의<a style={{color:'red'}}>(필수)</a></li>
                        <li className='필수약관2'><input type='checkbox' required />이용약관에 동의<a style={{color:'red'}}>(필수)</a></li>
                        <li className='필수약관3'><input type='checkbox'/>이벤트,혜택 알림 수신 동의(선택)</li>
                        <div className='heighline'><p>체크하지 않으실 경우<br/> 이벤트,혜택 제공이 제외될 수 있습니다.</p></div>
                    </div>
                    <div className="signup-buttons">
                        <GoogleLoginForm />
                        <button className="signup-btn kakao">카카오로 간편가입</button>
                        <button className="signup-btn naver">네이버로 간편가입</button>
                        
                    </div>
                </div>
            </div>
        </div>
    );

};
export default Signup;