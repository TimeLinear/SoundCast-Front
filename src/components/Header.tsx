import { useEffect, useRef, useState } from "react";

import { Member } from "../type/memberType";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { login, logout } from "../features/memberSlice";

import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import axios from "../utils/CustomAxios";
import { getCookie } from "../utils/Cookie";
import "../pages/css/siteMap.css";
import { setGenreList, setMoodList } from "../features/songSlice";
import { setGenre, setKeyword, setMood, setPlaceNo } from "../features/searchSlice";



function Header() {
  const member = useSelector((state: RootState) => state.member);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navi = useNavigate();

  //장르 전역 저장
  useEffect(() => {
    axios.get("http://localhost:8087/soundcast/song/genres")
      .then((response) => dispatch(setGenreList(response.data)))
      .catch((err) => console.log(err))
  }, []);

  //분위기 전역 저장
  useEffect(() => {
    axios.get("http://localhost:8087/soundcast/song/moods")
      .then((response) => dispatch(setMoodList(response.data)))
      .catch((err) => console.log(err))

  }, []);

  
  useEffect(() => {
    let cookie = getCookie("accessToken");

    cookie && !(member.nickName) && (
      axios
        .post("http://localhost:8087/soundcast/auth/login", {
          accessToken: cookie
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
  const loginHandler = () => {
    setShowModal(true);
  }

  const loginCloseHandler = () => {
    setShowModal(false);
  }


  const logoutHandler = () => {
    dispatch(logout());
    mainGo();
  }

  const mainGo = () => {
    dispatch(setKeyword(""));
    dispatch(setGenre(0));
    dispatch(setMood(0));
    navi("/");
  }

  const myPageHandler = () => {
    navi("/member/myPage");
  }

  //회원가입 모달창
  const [showSignUp, setShowSignUp] = useState(false);
  const openSignUp = () => setShowSignUp(true);
  const closeSignUp = () => setShowSignUp(false);

  //sitemap 클릭 버튼
  const [dropShow, setDropShow] = useState(false);
  const [animateDropdown, setAnimateDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const dropChange = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 전파 방지
    if (!dropShow) {
      setDropShow(true);
      setTimeout(() => setAnimateDropdown(true), 10); // 애니메이션 시작
    } else {
      setAnimateDropdown(false);
      setTimeout(() => setDropShow(false), 300); // 애니메이션 종료 후 드롭다운 숨김
    }
  }


  //네비바

  const handleNavigation = (section: String) => {
    navi(`/introduce/${section}`);
    setDropShow(false);
  };

  const handleNavi = () => {
    navi('/community');
    setDropShow(false);
  };

  const serverImagePath = "http://localhost:8087/soundcast/resource/";

  return (
    <>
      <div className="Header">
        <div className="Logo">
          <img src={serverImagePath + "public/main/defaultLogo.png"} onClick={mainGo} style={{ cursor: "pointer" }} />
        </div>
        <div className="DivideBox"></div>
        <div className="SiteMap">
          <button onClick={dropChange} ref={buttonRef}>
            <span>SiteMap</span>
            <span>
              <img src={dropShow ? serverImagePath + "public/main/Chevron_down.png" : serverImagePath + "public/main/Chevron_up.png"} />
            </span>
          </button>
          {dropShow && (
            <div ref={dropdownRef} className={`dropdown-menu ${animateDropdown ? "show" : "hide"}`} style={{ position: "absolute", top: "35px", right: 0, zIndex: "1", opacity: "90%" }}>
              <div className="big stiemapdiv" style={{ display: "flex", backgroundColor: "#460373", width: "500px", borderRadius: "10px" }}>

                <div className="sitemap-place" style={{ width: "33%", color: "#B59AC7" }}>
                  <div style={{ fontSize: "17px", fontWeight: "bolder", color: "white", marginLeft: "20px", marginTop: "10px" }}>플레이스</div>
                  <div style={{ marginLeft: "20px", marginTop: "15px", fontWeight: "bold" }}>
                    <li onClick={() => { dispatch(setPlaceNo(0)); navi("/"); setDropShow(false); }} style={{ cursor: "pointer" }}>공식 무료 음원</li>
                    <li onClick={() => { dispatch(setPlaceNo(1)); navi("/"); setDropShow(false); }} style={{ cursor: "pointer" }}>창작 음원</li>
                  </div>
                </div>

                <div className="sitemap-com" style={{ paddingLeft: "5px", width: "33%", color: "#B59AC7", borderLeft: "solid #FFFFFF thin" }}>
                  <div style={{ fontSize: "17px", fontWeight: "bolder", color: "white", marginTop: "10px", marginLeft: "10px" }}>커뮤니케이션</div>
                  <div style={{ marginTop: "15px", fontWeight: "bold", marginLeft: "10px" }}>
                    <li onClick={() => handleNavi()} style={{ cursor: "pointer" }}>자주 묻는 질문</li>
                  </div>
                </div>

                <div className="sitemap-intro" style={{ paddingLeft: "5px", width: "33%", color: "#B59AC7", borderLeft: "solid #FFFFFF thin" }}>
                  <div style={{ fontSize: "17px", fontWeight: "bolder", color: "white", marginTop: "10px", marginLeft: "10px" }}>소개</div>
                  <div style={{ marginTop: "15px", fontWeight: "bold", marginLeft: "10px", marginBottom: "20px" }}>
                    <li onClick={() => handleNavigation('soundcast')} style={{ cursor: "pointer" }}>SoundCast 소개</li>
                    <li onClick={() => handleNavigation('license')} style={{ cursor: "pointer" }}>라이선스 요약</li>
                    <li onClick={() => handleNavigation('terms')} style={{ cursor: "pointer" }}>서비스 약관</li>
                    <li onClick={() => handleNavigation('privacy')} style={{ cursor: "pointer" }}>개인정보 보호 정책</li>
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>
        {member.nickName === "" ? (
          <div className="Login">
            <button onClick={loginHandler}>

              <span>
                <img src={serverImagePath + "public/main/Login.png"} />
              </span>
              <span>Login</span>
            </button>
          </div>


        ) : (
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
                  <img src={serverImagePath + "public/main/Logout.png"} />
                </span>
                <span>Logout</span>
              </button >
            </div>

          </>
        )}



        <LoginModal show={showModal} handleClose={loginCloseHandler} onSignupRequest={openSignUp} />

        <SignUpModal showSignUp={showSignUp} openSignUp={openSignUp} closeSignUp={closeSignUp} />
      </div>
    </>

  );
}
export default Header;