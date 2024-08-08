
const MusicDetail = () => {

    return (
        <div style={{padding:"10px"}}>
            <div style={{paddingTop:"30px", backgroundColor:"#1B0140", borderRadius:"10px", display:"flex", flexDirection:"column", alignItems:"center"}}>
                <div style={{display:"flex", justifyContent:"flex-start", width:"1440px"}}>
                    <h1 style={{margin:"0", fontFamily:"sans-serif", fontStyle:"italic", fontSize:"35px", color:"white"}}>Official</h1>
                </div>
                <div style={{display:"flex", width:"1260px", flexShrink:0}}>
                    <div style={{display:"flex", flexDirection:"column", boxSizing:"border-box", width:"50%", paddingRight:"13%"}}>
                        <div style={{margin:"30px 0", display:"flex", justifyContent:"flex-start"}}>
                            <img style={{width:"410px"}}
                                src="/images/default/music_default.png" alt="음원 커버 기본 이미지" />
                        </div>
                        <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", margin:"10px 0", padding:"0 5px"}}>
                            <img style={{width:"30px", margin:"0 5px"}}
                                src="/images/music/play_button.png" alt="재생 버튼" />
                            <span style={{color:"white", margin:"0 10px"}}>1:58</span>
                            <div style={{flexGrow:"1"}}></div>
                            <img style={{width:"30px", margin:"0 10px"}}
                                src="/images/music/share_icon.png" alt="공유 버튼" />
                        </div>
                    </div>
                    <div style={{display:"flex", boxSizing:"border-box", width:"50%"}}>
                        <h2 style={{margin:"0", fontFamily:"sans-serif", color:"white", fontSize:"30px"}}>우주공원</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicDetail;