import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useMemo, useRef, useState } from "react";
import Pagination from "../components/Pagination";
import "./css/myPageBanner.css";
import FollowingModal from "../components/FollowingModal";
import ModifyMyPageModal from "../components/ModifyMyPageModal"; 
import MyPageComment from "../components/MyPageComment";

const MyPageBanner = () => {
    const member = useSelector((state: RootState) => state.member);
    console.log("팔로잉배열")
    console.log(member.follow.following)
    const [isShow, setIsShow] = useState('song');

    const [showFollingModal, setShowFollingModal] = useState(false);
    const [showModifyModal,setShowModifyModal] = useState(false);


    const followingHandler = () => {
        setShowFollingModal(true);
    }

    const followingCloseHandler = () => {
        setShowFollingModal(false);
    }

    const modifyHandler = () => {
        setShowModifyModal(true);
    }

    const modifyCloseHandler = () => {
        setShowModifyModal(false);
    }

    

    const songItems = [
        { profileImg: "/images/defaultLogo.png", title: "cass" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "grandmother" },
        { profileImg: "/images/defaultLogo.png", title: "caaasasssssssssssssfffffffffffffffffffffff" },
        { profileImg: "/images/defaultLogo.png", title: "ffffffffffffffff" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" },
        { profileImg: "/images/defaultLogo.png", title: "hite" }
    ]

  

    /* 페이지네이션 시작 */

    // 한 페이지당 항목 수
    const itemsPerPage = 20;

    const [currentPage, setCurrentPage] = useState<number>(1); /* 현재 페이지, Pagination.tsx로 넘김 */
    const totalPages: number = Math.ceil(songItems.length / itemsPerPage); /* 페이지 (버튼) 수, Pagination.tsx로 넘김 */

    const handlePageChange = (pageNumber: number) => { /* pageNumber는 Pagination.tsx에서 기술 , Pagination.tsx로 넘김 */
        setCurrentPage(pageNumber); /* 현재 페이지의 state를 Pagination.tsx에서 받아온 pageNumber로 변경,
currentPage의 state값에 따라서 동적으로 화면상에 표기할 currentItems(memberListItems의 현재페이지의 첫번째부터 마지막 아이템들을 표시)가
실시간으로 바뀐다. */

        // 페이지 변경 시 데이터 가져오기 또는 화면 갱신 로직 추가
    };

    // 현재 페이지의 항목을 계산
    const indexOfLastItem = currentPage * itemsPerPage; // 현재 페이지에서 가장 마지막 리스트 아이템의 인덱스 + 1
    const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 현제 페이지에서 가장 첫번째 리스트 아이템의 인덱스
    const currentItems = songItems.slice(indexOfFirstItem, indexOfLastItem);
    // 현재 페이지에서 표시해야할 리스트 아이템들 [{no: "11", profileImg: "/images/mimikyu.png", artist: "Gun" , email: "parkyo@gmail.com"}]

    /* 페이지네이션 끝 */
    console.log("-----------------------------------------")
    console.log(member.banner);
    console.log(member.email);
    console.log(member.introduce);
    console.log(member.nickName);
    console.log(member.profile);
    console.log("-----------------------------------------")

    useEffect(() => {

    }, [member]);


    const serverImagePath = "http://localhost:8087/soundcast/resource/";

    console.log(member.follow);
    // console.log(serverImagePath + user.banner.slice(user.banner.indexOf('/images/') + 8));
    return (
        <>
            <div className='banner-box' style={{ width: "100%", height: "270px", position: "relative", display: "flex", alignItems: "center" }}>
                <img src={member.banner ? serverImagePath+member.banner : serverImagePath+"images/member/banner/default-banner.png"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            
            <div className='userinfo' style={{ boxSizing:"border-box", alignSelf: "center", width: "1280px", display: "flex", position:"relative", justifyContent: "center", flexDirection: "column", margin: "0 auto" }}>
                <img src={serverImagePath+member.profile} alt="selectMember Profile" className="ProfileImage" style={{ objectFit: "cover", width: "170px", height: "170px", borderRadius: "100px", position: "absolute", top: "-100px", border: "2px solid #770ABF" }} />
                    <div style={{display:"flex", position: "absolute", top: "50px", left: "80px", cursor:"pointer"}} onClick={modifyHandler}>
                        <img src="images/profilemodify-image.png" alt="modifiyIcon" style={{ marginLeft: "90px", cursor: "pointer" ,height:"20px", width:"auto"}}/>
                        내 정보 수정
                    </div>
            
                    <div className="UserIntroduce" style={{ width: "630px", height: "160px", marginTop: "80px" }}>
                        <span style={{ fontWeight: "bolder", fontSize: "28px" }}>{member.nickName}<span style={{ fontSize: "15px", fontWeight: "normal", marginLeft: "10px" }}>{member.email}</span></span>
                             <div style={{ display: "flex" }}>
                                <p style={{ marginLeft:"10px", fontWeight: "bold" }}>팔로워</p><p style={{ marginLeft:"5px" }}>{member.follow.follower}</p>
                                <p style={{ marginLeft:"10px", fontWeight: "bold", cursor:"pointer" }} onClick={followingHandler}>팔로잉 중</p><p style={{ marginLeft:"5px" }}>{member.follow.following.length}</p>
          
                    </div>
                 
                    <div className="introduce" style={{width:"450px", marginTop:"12px"}}>
                        <span>{member.introduce}</span>
                    </div>
                </div>
                <ModifyMyPageModal show={showModifyModal} Close={modifyCloseHandler} />
                <FollowingModal show={showFollingModal} Close={followingCloseHandler} />
            </div>

            <div className="button-and-content" style={{boxSizing:"border-box", alignSelf:"center", width:"1280px", display:"flex", justifyContent:"center", flexDirection:"column", margin:"0 auto"}}>
                <div className="songandcomment" >
                    <div className="songandcomment" style={{ width: "150px", height: "40px", display: "flex"}}>
                        <div className={`songButton ${isShow === 'song' ? 'selectSac' : ''}`} style={{
                            width: "50%", height: "100%", fontWeight: "bold",
                            display: "flex", justifyContent: "center", alignItems: "center", borderTopRightRadius: "8px", borderTopLeftRadius: "8px"
                        }}
                            onClick={() => { setIsShow('song') }}>
                            <p style={{ margin: 0, fontSize: "20px", marginBottom: "4px", cursor: "pointer" }}>음원</p>
                        </div>

                        <div className={`commentButton ${isShow === 'comment' ? 'selectSac' : ''}`} style={{
                            width: "50%", height: "100%", fontWeight: "bold", display: "flex", justifyContent: "center"
                            , alignItems: "center", borderTopRightRadius: "8px", borderTopLeftRadius: "8px"
                        }}
                            onClick={() => { setIsShow('comment') }} >
                            <p style={{ margin: 0, fontSize: "20px", marginBottom: "4px", cursor: "pointer" }}>댓글</p>
                        </div>

                    </div>

                    <div key={"comment"}  className={`rest ${isShow === 'comment' ? 'selectSac' : ''}`}>
                        {isShow === "song" ? (
                           null
                        ) : (
                            <></>
                        )}

                    </div>
                </div>

                {isShow === 'song' ? (
                   null
                ) : (
                    <MyPageComment/>
                )}
            </div>


            
        </>
    );
}
export default MyPageBanner;