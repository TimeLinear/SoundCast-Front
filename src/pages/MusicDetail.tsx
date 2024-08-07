
const MusicDetail = () => {

    const someState = "클래스명";


    return (
        <div className={someState} style={{padding:"10px"}}>
            <div style={{padding:"30px 10% 0 10%", backgroundColor:"#1B0140", borderRadius:"10px", display:"flex", flexDirection:"column"}}>
                <div style={{display:"flex", justifyContent:"flex-start"}}>
                    <h1 style={{margin:"0", fontFamily:"sans-serif", fontStyle:"italic", fontSize:"35px", color:"white"}}>Official</h1>
                </div>
                <div style={{display:"flex"}}>
                    <div style={{display:"flex", flexDirection:"column", boxSizing:"border-box", width:"50%", paddingRight:"13%"}}>
                        <div style={{marginBottom:"10px"}}>
                            <img style={{width:"100%"}}
                                src="/images/default/music_default.png" alt="음원 커버 기본 이미지" />
                        </div>
                        <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center", margin:"20px 0", padding:"0 5px"}}>
                            <img style={{width:"60px", margin:"0 5px"}}
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