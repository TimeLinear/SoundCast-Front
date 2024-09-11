import { act, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { Followings } from "../type/memberType";
import { getCookie } from "../utils/Cookie";
import CustomAxios from "../utils/CustomAxios";
import { logout } from "../features/memberSlice";

const FollowingModal = ({ show, Close }: { show: boolean, Close: () => void }) => {
    const member = useSelector((state:RootState)=>state.member);
    const dispatch = useDispatch();
    const navi = useNavigate();
    const showHide = show ? "modal display-block" : "modal display-none";

    const backGroundClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            Close();
        }
    };

    // ------------------------------------------------------------------------

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
                  window.alert("팔로우 취소 성공!");
                  window.location.reload()
                  
                  // 로그인 된 멤버 스테이트의 follow 객체 안의 following 배열 내용을 바꿔줘야함.
              })
  
      }
      // ------------------------------------------------------------------------
    const serverImagePath="http://localhost:8087/soundcast/resource/";





    return (
        <div className={showHide} onClick={backGroundClick}>
            <div className="fw-modal" style={{ backgroundColor: "#F0ECFD", borderRadius: "10px", width: "600px", height: "530px", margin: "auto", position: "relative" }}>
                <button className="close-button" style={{ color: "black" }} onClick={Close}>X</button>
                <p style={{ fontSize: "30px", fontWeight: "bolder", textAlign: "center" }}>Following</p>
                <div style={{position:"relative"}}>
                    {/* 검색바와 정렬기준 */}
                    <div style={{ display: "flex" }}>
                        <div className="search" style={{ marginLeft: "15px", width: "575px", height: "40px", display: "flex", backgroundColor: "white", borderRadius: "20px" }}>
                            <img src="../fw-search-icon.png" style={{ marginLeft: "15px", marginTop: "10px", width: "20px", height: "20px" }}></img>
                            <input type="text" style={{ marginLeft: "15px", width:"575px" ,fontWeight: "bold",border:"none",outline:"none",borderRadius:"20px" }} placeholder="Search following" onChange={onChange}></input>
                        </div>
                    </div>


                    {/* 팔로잉 목록 */}
                    <div className="following list" style={{ marginLeft: "15px", marginTop: "10px", width: "575px", height: "68%", backgroundColor: "white", borderRadius: "15px" }}>
                        {filteredItems.map((followerItems, index) => (
                            <div style={{ display: "flex", alignItems: "center",position:"relative" }} key={index}>
                                <img src={serverImagePath+followerItems.profile} style={{ marginLeft: "10px", width: "60px", height: "60px", borderRadius: "100px" }} />
                                <div style={{ fontWeight: "bold", marginLeft: "10px", fontSize: "20px" }}>{followerItems.nickName}</div>
                                <div onClick={()=> deleteFollowingHandle(followerItems.memberNo)} style={{ display: "flex", alignItems: "center"}}>
                                    <div style={{ position: "absolute", marginRight: "15px", right: "0", borderRadius: "10px", width: "90px", height: "30px", backgroundColor: "#D9D9D9", display: "flex", justifyContent: "center", alignItems: "center"}}>
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