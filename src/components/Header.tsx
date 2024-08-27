import { useEffect, useState } from "react";


import { Member } from "../type/memberType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login, logout } from "../features/memberSlice";

import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import axios from "../utils/CustomAxios";
import { getCookie } from "../utils/Cookie";




function Header() {
    const member = useSelector((state:RootState)=>state.member );
    const dispatch = useDispatch();
    const [showModal, setShowModal]=useState(false);
    const navi = useNavigate();

    useEffect(() => {
        let cookie = getCookie("accessToken");
        
        cookie && !(member.nickName) && (
          axios
                .post("http://localhost:8087/soundcast/auth/login",{
                    accessToken:cookie
                })
                .then(res => {
                    console.log("헤더 res");
                    console.log(res.data);
                    
                  if (!res) {
                    return;
                  }
                  
                  dispatch(login(res.data.member));
                })
                .catch(error => {
                  console.log(error);
                })
        );
      }, []);
      console.log("헤더로그인");
      console.log(member);

    //회원 로그인창 핸들러
    const loginHandler = () =>{
        setShowModal(true);
    }

    const loginCloseHandler = () =>{
        setShowModal(false);
    }
    

    const logoutHandler = () => {
        dispatch(logout());
        mainGo();
      }
    
      const mainGo = () => {
        navi("/");
      }
    
      const myPageHandler = () => {
        navi("/myPage");
      }

    //회원가입 모달창
    const [showSignUp, setShowSignUp] = useState(false);
    const openSignUp = () => setShowSignUp(true);
    const closeSignUp = () => setShowSignUp(false);


  const serverImagePath = "http://localhost:8087/soundcast/resource/";
  const requestStartWith = "/SoundCAST_resources/";

  console.log(member.profile)
  console.log( member.profile.slice(member.profile.indexOf(requestStartWith) ))
  
    return(
        <>
            <div className="Header">
                <div className="Logo">
                    <img src="\images\defaultLogo.png" onClick={mainGo} style={{cursor:"pointer"}}/>
                </div>
                <div className="DivideBox"></div>
                <div className="SiteMap">
                    <button>
                        <span>Sitemap</span>
                        <span>
                            <img src="\images\Chevron_down.png"/>
                        </span>
                    </button>

                </div>
                {member.nickName === "" ? (
                    <div className="Login">
                        <button onClick={loginHandler}>
                            
                            <span>
                                <img src="\images\default\Login.png"/>
                            </span>
                            <span>Login</span>
                        </button>
                    </div>
                    

                 ):(
                    <>
                 <div className="Header-profile">
                                {member.profile && (
                                    <img
                                    src={serverImagePath + 
                                      member.profile}
                                    alt="User Profile"
                                    className="ProfileImage"
                                    onClick={myPageHandler}
                                    style={{ cursor: "pointer" }}
                                  />
                                )}
                            </div>




                 <div className="Logout">
                    <button onClick={logoutHandler}>
                        <span>
                            <img src="\images\default\logout.png"/>
                        </span>
                        <span>Logout</span>
                    </button >
                </div>

                
                 </>
                )}



      <LoginModal show={showModal} handleClose={loginCloseHandler} onSignupRequest={openSignUp}  />
      
      <SignUpModal showSignUp={showSignUp} openSignUp={openSignUp} closeSignUp={closeSignUp} /> 
            </div>
        </>

    );
}
export default Header;