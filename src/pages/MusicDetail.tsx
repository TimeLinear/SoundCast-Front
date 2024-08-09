import { CSSProperties, useState } from "react";

const MusicDetail = () => {

    const musicDetailContainer:CSSProperties = {paddingTop:"30px", backgroundColor:"#1B0140", borderRadius:"10px",
        display:"flex", flexDirection:"column", alignItems:"center", minWidth:"600px"};

    return (
        <div style={{padding:"10px", minWidth:"600px"}}>
            <div style={musicDetailContainer}>
                <div style={{width:"60%", minWidth:"590px"}}>
                    <div style={{display:"flex", justifyContent:"flex-start", marginBottom:"30px"}}>
                        <h1 style={{margin:"0", fontFamily:"sans-serif", fontStyle:"italic", fontSize:"35px", color:"white"}}>Official</h1>
                    </div>
                    <div style={{display:"flex", flexShrink:0}}>
                        <div style={{display:"flex", flexDirection:"column", boxSizing:"border-box", width:"50%"}}>
                            <div style={{marginBottom:"30px", display:"flex", justifyContent:"flex-start"}}>
                                <img style={{width:"60%"}}
                                    src="/images/default/music_default.png" alt="음원 커버 기본 이미지" />
                            </div>
                            <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", margin:"0", padding:"0 5px", width:"60%"}}>
                                <img style={{width:"40px", margin:"0 5px"}}
                                    src="/images/music/play_button.png" alt="재생 버튼" />
                                <span style={{color:"white", margin:"0 10px"}}>1:58</span>
                                <div style={{flexGrow:"1"}}></div>
                                <img style={{width:"25px", margin:"0 10px"}}
                                    src="/images/music/share_icon.png" alt="공유 버튼" />
                            </div>
                            <div style={{display:"flex", justifyContent:"center", margin:"20px 40% 20px 0"}}>
                                <button 
                                    style={{width:"95%", height:"50px", borderRadius:"10px", border:"2px solid white",
                                        backgroundColor:"transparent", color:"white", fontWeight:"bold", font:"bolder 16px sans-serif"}}>
                                다운로드</button>
                            </div>
                        </div>
                        <div style={{display:"flex", boxSizing:"border-box", width:"50%"}}>
                            <div style={{display:'flex', width:"100%", justifyContent:"space-between", alignItems:"center"}}>
                                <h2 style={{margin:"0", fontFamily:"sans-serif", color:"white", fontSize:"30px"}}>우주공원</h2>
                                <img style={{width:"30px", height:"30px"}} src="/images/music/flash.png" alt="신고 버튼" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicDetail;