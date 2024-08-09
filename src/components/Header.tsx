import { useState } from "react";
import Modal from "./Modal";
import { User } from "../type/user";


function Header() {
    const [user, setUser] = useState<User | null>(null);



    const [showModal, setShowModal]=useState(false);

    const loginHandler = () =>{
        setShowModal(true);
    }

    const loginCloseHandler = () =>{
        setShowModal(false);
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

                <div className="Login">
                    <button onClick={loginHandler}>
                        
                        <span>
                            <img src=".\images\default\Login.png"/>
                        </span>
                        <span>Login</span>
                    </button>
                </div>
              
                {/* <div className="Logout">
                    <button>
                        <span>
                            <img src=".\images\default\logout.png"/>
                        </span>
                        <span>Logout</span>
                    </button>
                </div>

                <div className="Header-profile">
                   
                    <img src=".\images\member\profile\profile_default.png"/>
                    
                    
                </div>
                 */}



      <Modal show={showModal} handleClose={loginCloseHandler} />
      
     
      {/* <Signup showSign={showSignup} Close={closeSignup} /> */}

            </div>
        </>

    );
}
export default Header;