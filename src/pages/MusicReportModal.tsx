import '../index.css'

const MusicReportModal = () => {
    return (
        <div style={{position:"fixed", left:"50%", top:"50%", transform:"translate(-50%, -50%)", display:"flex", backgroundColor:"#1C003B",
                borderRadius:"10px", flexDirection:"column", minWidth:"600px", alignSelf:"center", minHeight:"450px", padding:"10px"}}>
            <div style={{textAlign:"start", color:"white", font:"bolder 34px Inter", paddingLeft:"5px"}}>
                신고
            </div>
            <div style={{flexGrow:"1", backgroundColor:"#F0ECFD", borderRadius:"10px", padding:"15px 20px", display:"flex", flexDirection:"column"}}>
                <div style={{textAlign:"start", font:"bolder 36px Inter"}}>
                    신고사유
                </div>
                <div style={{flexGrow:"1", display:"flex", flexDirection:"column", paddingLeft:"30px", alignItems:"flex-start"}}>
                    <div style={{marginTop:"20px"}}>
                        <input style={{margin:"0 10px"}} type="radio" name="reportReason" id="report_reason1" defaultChecked/>
                        <label style={{font:"bold 16px Inter"}} htmlFor="report_reason1">음원이 아닌 파일 업로드</label>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <input style={{margin:"0 10px"}} type="radio" name="reportReason" id="report_reason2" />
                        <label style={{font:"bold 16px Inter"}} htmlFor="report_reason2">타인의 저작물 도용</label>
                    </div>
                    <div style={{marginTop:"20px"}}>
                        <input style={{margin:"0 10px"}} type="radio" name="reportReason" id="report_reason3" />
                        <label style={{font:"bold 16px Inter"}} htmlFor="report_reason3">폭력적 혹은 혐오스러운 컨텐츠</label>
                    </div>
                    <div style={{marginTop:"20px", display:"flex", flexDirection:"column", width:"100%", flexGrow:"1", paddingBottom:"5px"}}>
                        <div style={{display:"flex"}}>
                            <input style={{margin:"0 10px"}} type="radio" name="reportReason" id="report_reason4" />
                            <label style={{font:"bold 16px Inter"}} htmlFor="report_reason4">기타</label>
                        </div>
                        <div style={{paddingLeft:"30px", flexGrow:"1", display:"flex", flexDirection:"column"}}>
                            <textarea name="etcReason" style={{boxSizing:"border-box", width:"100%", 
                                resize:"none", flexGrow:"1", outline:"none"}}></textarea>
                        </div>
                    </div>
                </div>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <span style={{font:"12px Inter", color:"gray"}}>※ 반복된 허위 신고 시 제제를 받을 수 있습니다</span>
                    <button style={{backgroundColor:"#1C003B", border:"2px solid #770ABF", 
                        color:"white", font:"18px Inter", padding:"5px 24px", borderRadius:"10px"}}>
                            보내기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MusicReportModal;