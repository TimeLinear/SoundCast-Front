import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import "./css/myPageBanner.css";
import FollowingModal from "../components/FollowingModal";
import ModifyMyPageModal from "../components/ModifyMyPageModal"; 
import MyPageComment from "../components/MyPageComment";
import axios from "axios";
import { Props } from "../type/SongType";
import { setPlaySong, setSongList } from "../features/songSlice";
import MyPageSong from "../components/MyPageSong";
import UploadMusic from "./UploadMusic";
import { useNavigate } from "react-router-dom";


const MyPageBanner = () => {
    const member = useSelector((state: RootState) => state.member);
    const song = useSelector((state:RootState)=>state.song);
    const dispatch = useDispatch();
    const navi = useNavigate();

    const [isShow, setIsShow] = useState('song');
    const [showFollingModal, setShowFollingModal] = useState(false);
    const [showModifyModal,setShowModifyModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    
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
    
    //음원
    const [activeSongNo, setActiveSongNo] = useState<number|null>(null);
    console.log(member.memberNo);
    useEffect(()=>{

        if(!member.memberNo) {
            alert("로그인해야 이용할 수 있는 서비스입니다.");
            navi("/");
            return;
        }
      
        axios.get(`http://localhost:8087/soundcast/song/memberSongList/${member.memberNo}`)
            .then((response) => {
                  //키워드로 db에 저장된 노래 불러와 리스트 전역에 저장
                console.log("송리스트불러오기");
                console.log(response.data);
                dispatch(setSongList(response.data));
            })
            .catch((err)=>console.log(err));
    
    },[member])


    useEffect(()=>{
        if(activeSongNo!==null){
            dispatch(setPlaySong(activeSongNo));
        }
    },[activeSongNo])

    const [deleteList, setDeleteList] = useState<number[]>([]);
    
    const props = {
        activeSongNo,
        setActiveSongNo,
        song,
        deleteList,
        setDeleteList
    }

    const insertSongHandler = () =>{
        setShowUploadModal(true);
    }
    const insetHandleClose =() =>{
        setShowUploadModal(false);
    }
    
    useEffect(() => {

    }, [member]);

    const onClickDelete = () => {
        if (!deleteList.length) return;

        axios.delete(`http://localhost:8087/soundcast/song/delete`, {
            params:{
                deleteListStr : deleteList.join(",")
            }
        })
        .then((res) => {
            if(!res.data) {
                alert("삭제에 실패하였습니다");
                return;
            }

            dispatch(setSongList([...song.list.filter((song) => !deleteList.includes(song.songNo))]));
            alert("삭제되었습니다.");
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            
        })
    }


    const serverImagePath = "http://localhost:8087/soundcast/resource/";

    console.log(member.follow);
    // console.log(serverImagePath + user.banner.slice(user.banner.indexOf('/images/') + 8));
    return (
        <>
            <div className='banner-box' style={{ width: "100%", height: "270px", position: "relative", display: "flex", alignItems: "center" }}>
                <img src={member.banner ? serverImagePath + member.banner : serverImagePath+"images/member/banner/default-banner.png"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            
            <div className='userinfo' style={{ boxSizing:"border-box", alignSelf: "center", width: "1280px", display: "flex", position:"relative", justifyContent: "center", flexDirection: "column", margin: "0 auto" }}>
                <img src={serverImagePath+member.profile} alt="selectMember Profile" className="ProfileImage" style={{ objectFit: "cover", width: "170px", height: "170px", borderRadius: "100px", position: "absolute", top: "-100px", border: "2px solid #770ABF" }} />
                    <div style={{display:"flex", position: "absolute", top: "50px", left: "80px", cursor: "pointer"}} onClick={modifyHandler}>
                        <img src={serverImagePath+"public/member/modifyInfo.png"} alt="modifiyIcon" style={{ marginLeft: "90px", cursor: "pointer" ,height:"20px", width:"auto"}}/>
                        내 정보 수정
                    </div>
            
                    <div className="UserIntroduce" style={{ width: "630px", height: "160px", marginTop: "80px" }}>
                        <span style={{ fontWeight: "bolder", fontSize: "28px" }}>{member.nickName}<span style={{ fontSize: "15px", fontWeight: "normal", marginLeft: "10px" }}>{member.email}</span></span>
                             <div style={{ display: "flex" }}>
                                <p style={{ margin: "0 10px 0 0", fontWeight: "bold" }} onClick={followingHandler}>팔로잉 중 </p><p style={{ margin: 0 }}>{member.follow.following.length}</p>
                                <p style={{ margin: "0 10px 0 20px", fontWeight: "bold" }}>팔로워</p><p style={{ margin: 0 }}>{member.follow.follower}</p>
          
                    </div>
                 
                    <div className="introduce" style={{width:"450px", marginTop:"12px"}}>
                        <div dangerouslySetInnerHTML={{ __html: member.introduce }} />
                    </div>
                </div>
                <ModifyMyPageModal show={showModifyModal} Close={modifyCloseHandler}/>
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
                        {isShow === "song" &&
                           <div style={{ minWidth: "1280px", height: "50px", backgroundColor: "#1C003B", display: "flex", alignItems: "center", borderTopRightRadius: "7px", justifyContent: "flex-end", width: "100%" }}>
                                <button style={{ fontWeight: "bolder", fontSize: "17px", marginRight:"10px",  marginLeft: "auto", width:"90px" ,cursor: "pointer",borderRadius:"7px",backgroundColor:"white"}} onClick={insertSongHandler}>업로드</button>
                                <button style={{ fontWeight: "bolder", fontSize: "17px", marginRight:"15px", width:"90px" ,cursor: "pointer",borderRadius:"7px",backgroundColor:"white"}}
                                    onClick={onClickDelete}>
                                    삭제
                                </button>
                            </div>
                        }
                        <UploadMusic show={showUploadModal} handleClose={insetHandleClose} member={member}/>
                    </div>
                </div>

                {isShow === 'song' ? (
                    song.list.length > 0 ? 
                    (<MyPageSong {...props}/>) 
                    : (
                        <>
                            <div className='search-list-non' style={{width:"100%", height:"80vw", display:"flex", alignContent:"center", justifyContent:"center"}}>
                                <p style={{fontSize:"22px"}}> 해당 회원의 음원 목록이 존재하지 않습니다. </p>
                            </div>
                        </>
                    ) 
                ) : (
                    <MyPageComment/>
                )}
            </div>

        </>
    );
}
export default MyPageBanner;