import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useState } from "react";
import axios from "axios";

const MyPageComment = () =>{
    const member = useSelector((state:RootState)=>state.member);
    const serverImagePath = "http://localhost:8087/soundcast/resource/";

    const [checkedComments, setCheckedComments] =  useState<number[]>([])

    const handleCheckboxChange = (commentNo: number) => {
        setCheckedComments(prevState => {
            if (prevState.includes(commentNo)) {
                // 체크박스가 이미 체크되어 있는 경우, 상태에서 제거
                return prevState.filter(id => id !== commentNo);
            } else {
                // 체크박스가 체크되지 않은 경우, 상태에 추가
                return [...prevState, commentNo];
            }
        });
    };




    const commentDeleteHandler= () =>{
        const updatedComments = member.comment.filter(reply => !checkedComments.includes(reply.commentNo));
        member.comment = updatedComments;
        axios
            .delete(`http://localhost:8087/soundcast/member/comment/delete`,{
                params:{
                    comments: updatedComments.map(reply => ({
                        commentNo: reply.commentNo,
                        writerNo: reply.writerNo
                    }))
                }
            })
            

        setCheckedComments([]);
    }


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
