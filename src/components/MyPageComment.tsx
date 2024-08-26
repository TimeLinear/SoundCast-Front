import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { updateComments } from "../features/memberSlice";

const MyPageComment = () =>{
    const member = useSelector((state:RootState)=>state.member);
    const serverImagePath = "http://localhost:8087/soundcast/resource/";
    
    const [checkedComments, setCheckedComments] =  useState<number[]>([])

    const dispatch = useDispatch();

    const handleCheckboxChange = (commentNo: number) => {
        setCheckedComments(prevState => {
            if (prevState.includes(commentNo)) {
                return prevState.filter(id => id !== commentNo);
            } else {
                return [...prevState, commentNo];
            }
        });
    };


    const commentDeleteHandler = async () => {
        try {
            const promises = checkedComments.map(commentNo => {
                const commentToDelete = member.comment.find(c => c.commentNo === commentNo);
    
                // commentToDelete가 존재하는지 확인
                if (!commentToDelete) {
                    console.warn(`Comment with commentNo ${commentNo} not found`);
                    return Promise.resolve(); // 해당 댓글이 없으므로 요청을 무시합니다.
                }
    
                return axios.delete(`http://localhost:8087/soundcast/member/comment/delete`, {
                    data: {
                        commentNo: commentNo,
                        writerNo: commentToDelete.writerNo
                    }
                });
            });
    
            // 모든 삭제 요청을 병렬로 처리
            await Promise.all(promises);
            
            const updatedComments = member.comment.filter(comment => !checkedComments.includes(comment.commentNo));
            dispatch(updateComments(updatedComments));

            setCheckedComments([]); // 선택된 체크박스 초기화

            // 댓글 목록 갱신 또는 UI 업데이트
            alert('선택한 댓글이 삭제되었습니다.');

        } catch (error) {
            console.error('댓글 삭제에 실패했습니다', error);
            
        }
    };


    return(
        <>
            <div style={{ minWidth: "1300px", height: "50px", backgroundColor: "#1C003B", display: "flex", alignItems: "center", borderTopRightRadius: "7px", justifyContent: "space-between", width: "100%" }}>
                <span style={{ color: "white", font: "bold 20px Inter", marginLeft: "25px" }}>댓글 { member.comment.length}개</span>
                <button style={{ fontWeight: "bolder", fontSize: "17px", marginRight:"23px",width:"90px" ,cursor: "pointer",borderRadius:"7px",backgroundColor:"white"}} onClick={commentDeleteHandler}>삭제</button>
            </div>

            <div className="commentBox" style={{  width: "1300px", backgroundColor: "#FFFFFF", }}>
              
             {member.comment.map((reply) => (
                            <div className="writedComment" key={reply.commentNo}  style={{ width: "100%", display: "flex", alignItems: "center", marginTop: "10px" }}>
                                <input type="checkbox" 
                                    checked={checkedComments.includes(reply.commentNo)}
                                    onChange={() => handleCheckboxChange(reply.commentNo)}
                                    style={{marginLeft:"10px",zoom:"1.3" }} />
                                <img src={serverImagePath+reply.writerInfo.profile} style={{ width: "45px", height: "45px", borderRadius: "100px", marginLeft: "10px", flexShrink: "0" }} />
                                <div className="more-article" style={{ marginLeft: "22px", paddingRight: "22px" }}>
                                    <div style={{ fontWeight: "bold" }}>{reply.writerInfo.nickName}</div>
                                    <div className="more-article-text" style={{ wordBreak: "break-all" }}>
                                    <div dangerouslySetInnerHTML={{ __html: reply.content }} />
                                    </div>
                                </div>
                            </div>
                        ))}

            </div>    
        </>
    )


}

export default MyPageComment;
