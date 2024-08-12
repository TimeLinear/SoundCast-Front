import { useState } from "react";
import Modal from "./Modal";

import { Member } from "../type/memberType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { logout } from "../features/memberSlice";


function Header() {
    const member = useSelector((state:RootState)=>state.member );
    const dispatch = useDispatch();
    const [showModal, setShowModal]=useState(false);

    const loginHandler = () =>{
        setShowModal(true);
    }

    const loginCloseHandler = () =>{
        setShowModal(false);
    }
    
    const logoutHandler = ()=>{
        dispatch(logout());
       
    }


    const [showSignup, setShowSignup] = useState(false);
    const openSignup = () => setShowSignup(true);
    const closeSignup = () => setShowSignup(false);




    return(
        <>
            <div className="Header">
                <div className="Logo">
                    <img src=".\images\default\defaultLogo.png"/>
                </div>
                <div className="DivideBox"></div>
                <div className="SiteMap">
                    <button>
                        <span>Sitemap</span>
                        <span>
                            <img src=".\images\default\Chevron_down.png"/>
                        </span>
                    </button>

                </div>
                {member.nickName === "" ? (
                    <div className="Login">
                        <button onClick={loginHandler}>
                            
                            <span>
                                <img src=".\images\default\Login.png"/>
                            </span>
                            <span>Login</span>
                        </button>
                    </div>
                    

                 ):(
                    <>
                 <div className="Logout">
                    <button onClick={logoutHandler}>
                        <span>
                            <img src=".\images\default\logout.png"/>
                        </span>
                        <span>Logout</span>
                    </button >
                </div>

                <div className="Header-profile">
                   
                    <img src=".\images\member\profile\profile_default.png"/>
                    
                    
                </div>
                 </>
                )}



      <Modal show={showModal} handleClose={loginCloseHandler} />
      
     
      {/* <Signup showSign={showSignup} Close={closeSignup} /> */}

            </div>
        </>

    );
}
export default Header;