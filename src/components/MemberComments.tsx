import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import CustomAxios from "../utils/CustomAxios";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Member } from "../type/memberType";

const MemberComments = ({selectMember, isSubmitting, setIsSubmitting}:{selectMember:Member, isSubmitting:boolean, setIsSubmitting:(bool:boolean) => void}) => {
    const member = useSelector((state: RootState) => state.member);//로그인한사용자
    const writerNo = member.memberNo;
    const {memberNo} = useParams();
    const [comment, setComment] = useState('');
    
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const totalComment = selectMember.comment.length;
    //댓글 임시
    

     //컴포넌트가 마운트된 후에 참조를 사용하여 높이 조정
    useEffect(() => {
        if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // 기본 높이 제거
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 콘텐츠에 맞게 높이 조절
        }
    }, [comment,totalComment]);
   

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value);
        if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // 기본 높이 제거
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 콘텐츠에 맞게 높이 조절
        }  
    };
    
    console.log("사용자의 현 코멘트 개수 : %d", totalComment);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        if (comment.trim()) {
          setIsSubmitting(true); // 버튼 비활성화 상태를 시뮬레이션

          try{
              await CustomAxios
              .post(`http://localhost:8087/soundcast/member/comment/${memberNo}`,{
                  comment,writerNo
              })
              .then(response =>{
                  alert(response.data.msg);
              })
              .catch((error) => {
                console.log(error);
            }).finally(()=>{
                setComment('');
                setIsSubmitting(false);
            })
        } catch(error){
            console.log(error);
        }
    }
    
   
    console.log(isSubmitting);
};
    

    return(
        <>
        <div style={{ minWidth: "1300px", height: "50px", backgroundColor: "#1C003B", display: "flex", alignItems: "center", borderTopRightRadius: "7px", justifyContent: "space-between", width: "100%" }}>
                                <span style={{ color: "white", font: "bold 20px Inter", marginLeft: "25px" }}>댓글 {selectMember.comment.length}개</span>

        </div>
            
          <div className="commentBox" style={{  width: "1300px", backgroundColor: "#FFFFFF", }}>
                        <div className="commentWrite" style={{marginTop:"10px", position:"relative", display:"flex"}}>
                        <img src={member.profile} style={{ width: "45px", height: "45px", borderRadius: "100px", marginLeft: "10px", marginRight: "10px", flexShrink: "0" }} />
                        <form onSubmit={handleSubmit} style={{display:"flex", width:"100%"}}>
                            <textarea className="textarea-style" placeholder="댓글 작성..." 
                            ref={textareaRef}
                            value={comment}
                            onChange={handleChange}/>
                        
                            <button type="submit" className="submit-button" disabled={isSubmitting} style={{border: "none", width:"10%", height:"45px", padding:"0px", marginLeft:"10px",marginBottom:"10px", borderRadius:"50px", fontSize:"20px"}}>
                                {isSubmitting ? '등록...' : '댓글'}
                                </button>
                        </form>
                        </div>
                        


                        {selectMember.comment.map((reply) => (
                            
                            <div className="writedComment" key={reply.commentNo}  style={{ width: "100%", display: "flex", alignItems: "center", marginTop: "10px" }}>
                               
                                <img src={reply.writerInfo.profile} style={{ width: "45px", height: "45px", borderRadius: "100px", marginLeft: "10px", flexShrink: "0" }} />
                                <div className="more-article" style={{ marginLeft: "22px", paddingRight: "22px" }}>
                                    <div style={{ fontWeight: "bold" }}>{reply.writerInfo.nickName}</div>
                                    <div className="more-article-text" style={{ wordBreak: "break-all" }}>{reply.content}</div>
                                </div>
                            </div>
                        ))}

                    </div>    

        </>
    )
}

export default MemberComments;