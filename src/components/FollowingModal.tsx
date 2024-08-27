import { act, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Followings } from "../type/memberType";
import axios from "axios";
import { getCookie } from "../utils/Cookie";
import CustomAxios from "../utils/CustomAxios";
import { useNavigate, useParams } from "react-router-dom";
import { login, logout } from "../features/memberSlice";

const FollowingModal = ({ show, Close }: { show: boolean, Close: () => void}) => {
    const member = useSelector((state:RootState) => state.member);

    const dispatch = useDispatch();

    const navi = useNavigate();

    const showHide = show ? "modal display-block" : "modal display-none";

    const backGroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            Close();
        }
    };

    // const followerItems = [
    //     { profileImage: "images/reactLogo.png", nickName: "김길동" },
    //     { profileImage: "images/reactLogo.png", nickName: "김길동" },
    //     { profileImage: "images/reactLogo.png", nickName: "김길동" },
    //     { profileImage: "images/reactLogo.png", nickName: "홍길동" }
    // ]
    //팔로잉 리스트 검색 필터
    const followerItems:Followings[] = member.follow.following;

    const [text,setText] = useState('');
    const onChange = (event:any) => {
        setText(event.target.value);
        console.log(event.target.value)
    }

    const filteredItems = followerItems.filter((item) => //모든 문자열은 빈 문자열을 가지고 있음. 그러니 검색창에 아무것도 안해도 모든 팔로잉리스트가 뜸.
        item.nickName.toLowerCase().includes(text.toLowerCase())
    );
    // ------------------------------------------------------------------------
    //팔로우 리스트 창에서 Delete버튼 누르면 삭제 기능
    const deleteFollowingHandle = (targetMemberNo:number) => {
        const accessToken = getCookie("accessToken");
        const followerMno = member.memberNo;
        

        if(!accessToken) {
            alert("세션이 만료되었습니다. 재로그인 해주세요.");
            dispatch(logout());
            navi("/");
        }

        CustomAxios.
        // unfollow 뒤에는 팔로잉 목록에서 삭제할 회원 번호가 들어가야함
            delete(`http://localhost:8087/soundcast/member/unfollow/${targetMemberNo}`,{
                params:{
                    followerMno
                }
            })
            .then(response => {
                console.log(response)
                
                // 로그인 된 멤버 스테이트의 follow 객체 안의 following 배열 내용을 바꿔줘야함.
            })

    }
    // ------------------------------------------------------------------------

    const [selectBoxState, setSelectBoxState] = useState('Date followed: Latest');

    const selectBoxSelect = (e: React.MouseEvent) => { /* 클릭시 해당 div묶음의 value가 state로 되게 지정*/
        e.stopPropagation();
        const { value } = e.currentTarget as HTMLButtonElement;
        setSelectBoxState(value);
        dropChange(e);
    }


    const [dropShow, setDropShow] = useState(false);
    const [animateDropdown, setAnimateDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null); // 드롭다운 버튼에 대한 참조 추가

    const dropChange = (e: React.MouseEvent) => {
        e.stopPropagation();  // 이벤트 전파를 막음
        if (!dropShow) {
            setDropShow(true);
            setTimeout(() => setAnimateDropdown(true), 10); // 애니메이션 시작
        } else {
            setAnimateDropdown(false);
            setDropShow(false);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => { // 이벤트 타입을 MouseEvent로 설정
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setDropShow(false);
                setAnimateDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef, buttonRef, member]);

    const selectBoxItems = [
        { key: "list1", name: "Date followed: Latest " },
        { key: "list2", name: "Date followed: Oldest " },
        { key: "list3", name: "Date followed: Most Popular" }
    ]

    const serverImagePath = "http://localhost:8087/soundcast/resource/";

    return (
        <div className={showHide} onClick={backGroundClick}>
            <div className="fw-modal" style={{ backgroundColor: "#F0ECFD", borderRadius: "10px", width: "600px", height: "530px", margin: "auto", position: "relative" }}>
                <button className="close-button" style={{ color: "black" }} onClick={Close}>X</button>
                <p style={{ fontSize: "30px", fontWeight: "bolder", textAlign: "center" }}>Following</p>
                <div style={{position:"relative"}}>
                    {/* 검색바와 정렬기준 */}
                    <div style={{ display: "flex" }}>
                        { /* 누를 시 나오는 커스텀 드롭다운 */
                                (dropShow &&
                                
                                    <div className={`selectbox-dropdown ${animateDropdown ? 'show' : ''}`}
                                    ref={dropdownRef} style={{right:"0",position:"absolute",width:"220px" ,height:"100px",top:"52px",boxSizing:"border-box",flexDirection:"column",display:"flex",justifyContent:"center",alignItems:"center",zIndex:"1" }}>

                                        {selectBoxItems.map((item) => (

                                            <button
                                            className={`selectList-${item.key}-button ${
                                            selectBoxState === item.name ? "selected2" : ""
                                            }`}
                                            value={item.name}
                                            onClick={selectBoxSelect}
                                            style={{width:"200px",backgroundColor:"white",borderRadius:"20px",cursor:"pointer",marginRight:"20px",border:"1px solid black"}}
                                            >                           
                                                <p className={`selectList-${item.key}`}>{item.name}</p>
                                            </button>
                                        ))}
                                     </div>
                                )
                                
                            }
                        <div className="search" style={{ marginLeft: "15px", width: "350px", height: "40px", display: "flex", backgroundColor: "white", borderRadius: "20px" }}>
                            <img src="images/fw-search-icon.png" style={{ marginLeft: "15px", marginTop: "10px", width: "20px", height: "20px" }}></img>
                            <input type="text" value={text} style={{ marginLeft: "15px", fontWeight: "bold",border:"none",outline:"none" }} placeholder="Search following" onChange={onChange}></input>
                        </div>
                        <div className={`selectList ${dropShow ? 'selected3' : ''}`} style={{ marginLeft: "7px", width: "220px", height: "40px", backgroundColor: "white", borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center",cursor:"pointer"}}
                            onClick={dropChange} ref={buttonRef}>
                            <div style={{ position: "relative", width: "90%", display: "flex", alignItems: "center"}}>
                                <span style={{ fontWeight: "bold" }}>{selectBoxState}</span>
                                <p style={{ position: "absolute", width: "30px", right: "0" }} >{dropShow ? '▲' : '▼'}</p>
                            </div>

                        </div>
                    </div>


                    {/* 팔로잉 목록 */}
                    <div className="following list" style={{ marginLeft: "15px", marginTop: "10px", width: "575px", height: "68%", backgroundColor: "white", borderRadius: "15px" }}>
                        {filteredItems .map((followerItems, index) => (
                            <div style={{ display: "flex", alignItems: "center",position:"relative" }} key={index}>
                                <img src={serverImagePath + followerItems.profile} style={{ marginLeft: "10px", width: "60px", height: "60px", borderRadius: "100px" }} />
                                <div style={{ fontWeight: "bold", marginLeft: "10px", fontSize: "20px" }}>{followerItems.nickName}</div>
                                <div style={{ display: "flex", alignItems: "center"}}>
                                    <div onClick={() => deleteFollowingHandle(followerItems.memberNo)} style={{ position: "absolute", marginRight: "15px", right: "0", borderRadius: "10px", width: "90px", height: "30px", backgroundColor: "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center"}}>
                                        <span style={{ fontWeight: "bold",cursor:"pointer" }}>Delete</span>
                                    </div>
                                </div>    
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
    );


};

export default FollowingModal;