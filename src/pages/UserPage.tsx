import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { CSSProperties, useEffect, useState } from "react";
import Player from "../components/PlayBar";
//import { initSongs, Props } from "../type/SongType";
import { setPlaySong, setSongList } from "../features/songSlice";
import "./css/UserPage.css";
import axios from "axios";
import { login, initialState, followInit, addFollowing, removeFollowing } from "../features/memberSlice";
import { useNavigate, useParams } from "react-router-dom";
// import MemberSongs from "../components/MemberSongs";
import MemberComments from "../components/MemberComments";
import CustomAxios from "../utils/CustomAxios";
import { getCookie } from "../utils/Cookie";
import SongItem from "../components/SongItem";
import { Props } from "../type/SongType";


const UserPage = () => {
    const song = useSelector((state: RootState) => state.song);
    const member = useSelector((state: RootState) => state.member);
    const [isShow, setIsShow] = useState('song');
    const { memberNo } = useParams();
    const NumbMemberNo = Number(memberNo);
    const serverImagePath = "http://localhost:8087/soundcast/resource/";
    const navi = useNavigate();
    const dispatch = useDispatch();
    const [selectMember, setSelectMember] = useState(initialState);

    //팔로우리스트 프론트
    const [showFollingModal, setShowFollingModal] = useState(false);
    const followingHandler = () => {
        setShowFollingModal(true);
    }

    const followingCloseHandler = () => {
        setShowFollingModal(false);
    }

    //팔로우 임시
    console.log("팔로우변수체크");
    const followingCheck = member.follow.following.filter((following) => following.memberNo === NumbMemberNo) ? false : true;

    console.log(member.follow.following);
    console.log(NumbMemberNo);
    console.log(followingCheck);
    const [isFollowing, setIsFollowing] = useState(followingCheck);
    const [followList, setFollowList] = useState(followInit);
    //isFollowing == false  -- 팔로우버튼
    //isFollowing == true -- 팔로우 취소 버튼

    const handleFollowClick = () => {
        const accessToken = getCookie("accessToken");
        const followerMno = member.memberNo

        if (accessToken && !(selectMember.memberNo == member.memberNo)) {
            if (isFollowing) {
                CustomAxios
                    .delete(`http://localhost:8087/soundcast/member/unfollow/${memberNo}`, {
                        params: {
                            followerMno
                        }
                    })
                    .then(response => {
                        console.log(response)
                        dispatch(removeFollowing(NumbMemberNo));
                        setIsFollowing(!isFollowing)
                    })
            }
            else {
                CustomAxios
                    .post(`http://localhost:8087/soundcast/member/follow/${memberNo}`, {
                        followerMno
                    })
                    .then(response => {
                        alert(response.data.msg)
                        setIsFollowing(!isFollowing)
                        dispatch(addFollowing({
                            memberNo:response.data.newFollowing.memberNo,
                            nickName:response.data.newFollowing.memberNickname,
                            profile:response.data.newFollowing.profileImage.profileImagePath
                        }))
                    })
            }

        }

        else {

            if (selectMember.memberNo == member.memberNo) {
                window.alert("자신을 팔로우할 수 없습니다")
            } else {

                window.alert("로그인이 필요한 메뉴입니다.")
            }

        }
    };

    const [filteredMembers, setFilteredMembers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    //댓글
    const [deletingCommentNo, setDeletingCommentNo] = useState(0);
    //멤버 인포불러오기 
    useEffect(() => {
        axios
            .get(`http://localhost:8087/soundcast/member/memberInfo/${memberNo}`)
            .then(response => {
                if (response.data === "" || response.data === null) {
                    navi("/");
                }
                setSelectMember({
                    memberNo: response.data.memberNo,
                    profile: response.data.profileImage.profileImagePath,
                    nickName: response.data.memberNickname,
                    email: response.data.memberEmail,
                    banner: response.data.memberBanner.memberBannerPath,
                    introduce: response.data.memberIntroduce,
                    follow: {
                        follower: response.data.follower,
                        following: response.data.following
                    },
                    comment: response.data.commentList.map((comment: any) => ({
                        commentNo: comment.comment.commentNo,
                        writerNo: comment.comment.commentWriterMemberNo,
                        content: comment.comment.commentText,
                        writerInfo: {
                            profile: comment.profileImage.profileImagePath,
                            nickName: comment.memberNickname
                        }
                    }))
                })
                setFollowList({
                    follower: response.data.follower,
                    following: response.data.following
                });


            })
            .catch(error => {
                console.error('Error fetching member info:', error);
            })
            .finally(() => {
                member.follow.following.find((following) => following.memberNo === NumbMemberNo) &&
                    setIsFollowing(true)
            })
        // .finally(() => {
        //     member.follow.following.filter((target) => target.memberNo === NumbMemberNo).length && setIsFollowing(true);

        // });

    }, [member, NumbMemberNo, isFollowing, isShow, isSubmitting, deletingCommentNo]);


    const divStyle: React.CSSProperties = selectMember.memberNo === member.memberNo ? { display: "none" } : { display: "flex", position: "absolute", top: "50px", left: "80px" };

    //음원


    const [activeSongNo, setActiveSongNo] = useState<number | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:8087/soundcast/song/memberSongList/${memberNo}`)
            .then((response) => {
                //키워드로 db에 저장된 노래 불러와 리스트 전역에 저장
                console.log(response.data);
                dispatch(setSongList(response.data));
            })
            .catch((err) => console.log(err));

    }, [member])


    useEffect(() => {
        if (activeSongNo !== null) {
            dispatch(setPlaySong(activeSongNo));
        }
    }, [activeSongNo])

    const props: Props = {
        activeSongNo,
        setActiveSongNo,
        song,
        searchSong: function (): void {
            throw new Error("Function not implemented.");
        }
    }

    // 스타일
    const searchListFontStyle: CSSProperties = { fontFamily: "Inter", fontStyle: "normal", fontSize: "20px", fontWeight: "700", lineHeight: "24px", color: "#000000" };


    return (

        <>
            <div className='banner-box' style={{ width: "100%", height: "270px", position: "relative", display: "flex", alignItems: "center" }}>
                <img src={selectMember.banner ? serverImagePath + selectMember.banner : serverImagePath + "images/member/banner/default-banner.png"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />

            </div>

            <div className='userinfo' style={{ boxSizing: "border-box", alignSelf: "center", width: "1280px", display: "flex", position: "relative", justifyContent: "center", flexDirection: "column", margin: "0 auto" }}>
                <img src={serverImagePath + selectMember.profile} alt="selectMember Profile" className="ProfileImage" style={{ objectFit: "cover", width: "170px", height: "170px", borderRadius: "100px", position: "absolute", top: "-100px", border: "2px solid #770ABF" }} />


                <div style={divStyle}>


                    <img
                        src={isFollowing ? serverImagePath + "public/member/unfollow.png" : serverImagePath + "public/member/follow.png"}
                        alt={isFollowing ? "Unfollow" : "Follow"}
                        onClick={handleFollowClick}
                        style={{ marginLeft: "90px", cursor: "pointer", height: "20px", width: "auto" }}
                    />


                    <span
                        style={{
                            marginLeft: "10px",
                            fontWeight: "bold",
                            cursor: "pointer",
                            color: isFollowing ? "red" : "black"  // 팔로우 상태에 따라 색상 변경
                        }}
                        onClick={handleFollowClick}
                    >
                        {isFollowing ? "팔로우 취소" : "팔로우"}

                    </span>

                </div>



                <div className="UserIntroduce" style={{ width: "630px", height: "160px", marginTop: "80px" }}>
                    <span style={{ fontWeight: "bolder", fontSize: "28px" }}>{selectMember.nickName}<span style={{ fontSize: "15px", fontWeight: "normal", marginLeft: "10px" }}>{selectMember.email}</span></span>

                    <div style={{ display: "flex" }}>
                        <p style={{ margin: "0 10px 0 0", fontWeight: "bold" }} onClick={followingHandler}>팔로잉 중 </p><p style={{ margin: 0 }}>{followList.following.length}</p>
                        <p style={{ margin: "0 10px 0 20px", fontWeight: "bold" }}>팔로워</p><p style={{ margin: 0 }}>{followList.follower}</p>

                    </div>


                    <div className="introduce" style={{ width: "450px", marginTop: "12px" }}>
                        <span>{selectMember.introduce}</span>
                    </div>
                </div>

            </div>

            <div className="button-and-content" style={{ boxSizing: "border-box", alignSelf: "center", width: "1280px", display: "flex", justifyContent: "center", flexDirection: "column", margin: "0 auto" }}>
                <div className="songandcomment1">
                    <div className="songandcomment" style={{ width: "150px", height: "40px", display: "flex" }}>
                        <div key={"song"} className={`songButton ${isShow === 'song' ? 'selectSac' : ''}`} style={{
                            width: "50%", height: "100%", fontWeight: "bold",
                            display: "flex", justifyContent: "center", alignItems: "center", borderTopRightRadius: "8px", borderTopLeftRadius: "8px",
                            backgroundColor: isShow === 'song' ? "#1C003B" : "#FFFFFF",
                            color: isShow === 'song' ? "#FFFFFF" : "#1C003B",
                            cursor: "pointer"
                        }}
                            onClick={() => { setIsShow('song'); }}>
                            <p style={{ margin: 0, fontSize: "20px", marginBottom: "4px", cursor: "pointer" }}>음원</p>
                        </div>

                        <div key={"comment"} className={`commentButton ${isShow === 'comment' ? 'selectSac' : ''}`} style={{
                            width: "50%", height: "100%", fontWeight: "bold", display: "flex", justifyContent: "center",
                            alignItems: "center", borderTopRightRadius: "8px", borderTopLeftRadius: "8px",
                            backgroundColor: isShow === 'comment' ? "#1C003B" : "#FFFFFF",
                            color: isShow === 'comment' ? "#FFFFFF" : "#1C003B",
                            cursor: "pointer"
                        }}
                            onClick={() => { setIsShow('comment'); }}>
                            <p style={{ margin: 0, fontSize: "20px", marginBottom: "4px", cursor: "pointer" }}>댓글</p>
                        </div>

                    </div>

                    <div key={"comment"} className={`rest ${isShow === 'comment' ? 'selectSac' : ''}`}>
                        {isShow === "song" ? (
                            null
                        ) : (
                            <></>
                        )}

                    </div>
                </div>

                {isShow === 'song' ? (
                    song.list.length > 0 ?
                        (<SongItem {...props} />)
                        : (
                            <>
                                <div className='search-list-non' style={{ width: "100%", height: "80vw", display: "flex", alignContent: "center", justifyContent: "center" }}>
                                    <p style={{ ...searchListFontStyle, fontSize: "22px" }}> 해당 회원의 음원 목록이 존재하지 않습니다. </p>
                                </div>
                            </>
                        )
                ) : (
                    <MemberComments selectMember={selectMember} isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting} deletingCommentNo={deletingCommentNo} setDeletingCommentNo={setDeletingCommentNo} />
                )}
            </div>
            {/* <FollowingModal show={showFollingModal} Close={followingCloseHandler} /> */}
            <Player {...props} />
        </>
    );
}

export default UserPage;