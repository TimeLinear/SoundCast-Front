
function Header() {
    
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
                    <button>
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

            </div>
        </>

    );
}
export default Header;