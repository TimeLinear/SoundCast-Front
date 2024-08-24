import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useMemo, useRef, useState } from "react";
import Pagination from "../components/Pagination";
import "./css/myPageBanner.css";
import FollowingModal from "../components/FollowingModal";
import ModifyMyPageModal from "../components/ModifyMyPageModal"; 

const MyPageBanner = () => {
    const member = useSelector((state: RootState) => state.member);

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

    const commentItems = [
        {nickName:"박구건",comment:"국회는 헌법개정안이 공고된 날로부터 60일 이내에 의결하여야 하며, 국회의 의결은 재적의원 3분의 2 이상의 찬성을 얻어야 한다.광물 기타 중요한 지하자원·수산자원·수력과 경제상 이용할 수 있는 자연력은 법률이 정하는 바에 의하여 일정한 기간 그 채취·개발 또는 이용을 특허할 수 있다."},
        {nickName:"박구건",comment:"comment?"},
        {nickName:"박구건",comment:"comment?"},
        {nickName:"박구건",comment:"comment?"},
        {nickName:"박구건",comment:"comment?"},
        {nickName:"박구건",comment:"comment?"},
        {nickName:"박구건",comment:"comment?"},
        {nickName:"박구건",comment:"comment?"},
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
    const requestStartWith = "/SoundCAST_resources/";

    // console.log(serverImagePath + user.banner.slice(user.banner.indexOf('/images/') + 8));
    return (
        <>
            <div className='banner-box' style={{ width: "100%", height: "270px", position: "relative", display: "flex", alignItems: "center" }}>
                <img src={serverImagePath + member.banner.slice(member.banner.indexOf(requestStartWith) + requestStartWith.length)} 
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <img src={serverImagePath + member.profile.slice(member.banner.indexOf(requestStartWith) + requestStartWith.length)}
                    alt="User Profile" className="ProfileImage" 
                    style={{ objectFit: "cover", width: "170px", height: "170px", borderRadius: "100px", position: "absolute", top: "60%", left: "250px", border: "2px solid #770ABF" }} />
            </div>
            <div className="UserIntroduce" style={{ width: "630px", height: "200px", marginLeft: "250px", marginTop: "80px" }}>
                <span style={{ fontWeight: "bolder", fontSize: "28px" }}>{member.nickName}<span style={{ fontSize: "15px", fontWeight: "normal", marginLeft: "10px" }}>{member.email}</span></span>
                <img src="images/profilemodify-image.png" style={{ marginLeft: "90px" }}></img>
                <span style={{ marginLeft: "10px", fontWeight: "bold" ,cursor:"pointer" }} onClick={modifyHandler} >내 정보 수정</span>
                <div style={{ display: "flex" }}>
                    <p style={{ margin: "0 10px 0 0", fontWeight: "bold" }}>팔로워</p><p style={{ margin: 0 }}>0{/*user.follow.follower*/}</p>
                    <p style={{ margin: "0 10px 0 20px", fontWeight: "bold",cursor:"pointer" }} onClick={followingHandler} >팔로잉</p><p style={{ margin: 0 }}>10{/*user.follow.following.length*/}</p>
                </div>
                <div className="introduce">
                    <span>{member.introduce}</span>
                </div>
                <ModifyMyPageModal show={showModifyModal} Close={modifyCloseHandler} />
                <FollowingModal show={showFollingModal} Close={followingCloseHandler} />
            </div>

            <div className="button-and-content" style={{boxSizing:"border-box", alignSelf:"center", width:"1280px", display:"flex", justifyContent:"center", flexDirection:"column", margin:"0 auto"}}>
                <div>
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

                    <div className={`rest ${isShow === 'comment' ? 'selectSac' : ''}`} style={{minWidth:"1280px", height: "50px", backgroundColor: "black", display: "flex", alignItems: "center", borderTopRightRadius: "7px" }}>
                        {
                            isShow === "song" ? (
                                <div className="uploadButton" style={{ marginLeft: "90%", height: "55%", width: "7%", backgroundColor: "lightgrey", borderRadius: "5px", display: "flex", alignItems: "center" }}>
                                    <img src="images/upload-image.png" style={{ marginLeft: "7px", width: "20%", marginTop: "3px" }} />
                                    <span style={{ marginLeft: "8px", fontWeight: "bolder", fontSize: "17px", cursor: "pointer" }}>업로드</span>
                                </div>
                            ) : (
                                <div style={{display:"flex", justifyContent:"space-between", padding:"0 10px", width:"100%"}}>
                                    <span style={{color:"white", font:"bold 20px Inter",marginLeft:"25px"}}>댓글 {commentItems.length}개</span>
                                    <button style={{ fontWeight: "bolder", fontSize: "17px", marginRight:"23px",width:"90px" ,cursor: "pointer",borderRadius:"7px",backgroundColor:"white"}} >삭제</button>
                                </div>
                            )
                        }
                        
                    </div>
                </div>

                {isShow === 'song' ? (
                    <div className="mysong" style={{ border: "1px solid lightgrey", display: "flex", flexWrap: "wrap"}}>

                        {currentItems.map((item) => (
                            <div style={{ margin: "20px 2.39%", width: "194px", height: "220px", display: "flex", flexDirection: "column" }}>

                                <div className="hoverImage" style={{ width: "100%", height: "154px", boxSizing: "border-box", flexGrow: "1", position:"relative" }}>
                                    <img className="modifyImage" src="/images/mypage-hover.png" style={{position:"absolute",width:"30px",height:"30px",top:"10px",left:"10px"}} />
                                    <img src={item.profileImg} style={{ width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: "7px", borderTopRightRadius: "7px" }} />
                                </div>

                                <div style={{
                                    border: "1px solid black", width: "100%", height: "46px", boxSizing: "border-box",
                                    fontWeight: "bolder", display: "flex", justifyContent: "center", alignItems: "center",
                                    borderBottomLeftRadius: "7px", borderBottomRightRadius: "7px"
                                }}>
                                    <p style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "60%" }}>{item.title}</p>
                                </div>
                            </div>
                        ))}
                        <div style={{ display: "flex", justifyContent: "center", width: "100%", flexShrink: "0" }}>
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        </div>
                    </div>
                    
                ) : (
                    
                    <div style={{ backgroundColor:"#CECCCC", }}>
                        
                        {commentItems.map((commnetitem,index)=>(
                            
                            <div className="writeComment" style={{ width:"100%",display:"flex",alignItems:"center",marginTop:"10px"}}>
                                <input type="checkbox" style={{marginLeft:"10px",zoom:"1.3" }} />
                                <img src="/images/reactLogo.png" style={{width:"45px", height:"45px", borderRadius:"100px", marginLeft:"10px", flexShrink:"0"}}/>
                                <div className="more-article" style={{marginLeft:"22px", paddingRight:"22px"}}>
                                    <div style={{fontWeight:"bold"}}>{commnetitem.nickName}</div>
                                    <div className="more-article-text" style={{wordBreak:"break-all"}} >{commnetitem.comment}</div>
                                </div>
                            </div>
                        ))}

                    </div>
                )}
            </div>



        </>
    );
}
export default MyPageBanner;