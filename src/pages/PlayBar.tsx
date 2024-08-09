import {Song, Props } from "../type/SongType";

function Player(props:Props){
    
    const playerFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"16px", lineHeight:"18px", fontWeight:"700", color :"#000000"};
    const playerBoxStyle = {display: "flex", alignItems : "center", justifyContent: "center"}
    
    //매개변수로 클릭한 activeItemNo 받음.
    const {activeSongNo, setActiveSongNo} = props;

    //매개변수로 받은 activeItemNo로 음원 객체를 가져옴. player에 내용 반영
    const song:Song = {songNo: 4, songMemberNo : 0, songTitle : 'song4', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스4'}

    return (

        activeSongNo !== null ? (
        <div className="player" 
            style={{...playerBoxStyle, position:"fixed", bottom:0 ,boxSizing:"border-box", width:"100%", height:"70px", background:"rgba(255, 255, 255, 0.95)", border:"1px solid #D4D4D4", borderRadius:"7px"}}>
        
            <div className='play-icon' style={{width:"45px", height:"45px", paddingRight: "25px"}}>
                <img src={activeSongNo === song.songNo ? "images/pause-button-icon-black.png" : "images/play-icon-black.png"} 
                    style={{height:"100%", width:"100%"}}
                    onClick={()=>setActiveSongNo(activeSongNo === song.songNo ? 0 : song.songNo)} />
            </div>
            
            {/* 이미지 있는 경우 해당 이미지 보여주기, 없는 경우 default image */}
            <div className='song-image' style={{width:"50px", height:"50px", paddingRight: "25px"}}>
                <img src='images/song-image.png' style={{height:"100%", width:"100%", borderRadius:"2px"}}/>
            </div>
            
            <div className='song-content' style={{width:"300px", height:"50px", paddingRight: "25px"}}>
                <div className='song-title' style={{height:"50%"}}>
                    <span style={{...playerFontStyle, fontSize:"22px", lineHeight:"24px"}}>Time is Eating</span>
                </div>
                <div className='artist-name' style={{height:"50%"}}>
                    <span style={{...playerFontStyle}}>아티스트명</span>
                </div> 
            </div>

            <div className="play-status-box" style={{...playerBoxStyle, width:"45%", paddingRight: "25px"}}>
                <div className="now-playing" style={{...playerBoxStyle, justifyContent:"center", width:"60px"}} >
                    <span style={{...playerFontStyle}}>0:00</span>
                </div>
                <div className="play-bar" style={{width:"80%"}}>
                    <span>재생바</span>
                </div>
                <div className="play-time" style={{...playerBoxStyle, justifyContent:"center",width:"60px"}}>
                    <span style={{...playerFontStyle}}>1:58</span>
                </div>
            </div>

            <div className="volume-box" style={{...playerBoxStyle, width:"15%", paddingRight: "25px"}}>
                <div className="volume-icon" style={{width:"25px", height:"25px"}}>
                    <img src="images/audio-control-icon-black.png" style={{height:"100%", width:"100%"}}/>
                </div>
                <div className="volume-control" style={{width:"150px"}}>
                    <span>볼륨바</span>
                </div>
            </div>

            <div className='download-icon' style={{width:"25px", height:"25px", paddingRight: "25px"}}>
                <img src="images/download-icon-black.png" style={{height:"100%", width:"100%"}}/>
            </div>
            <div className='license-copy-icon' style={{width:"25px", height:"25px"}}>
                <img src="images/copy-Icon-black.png" style={{height:"100%", width:"100%"}}/>
            </div>

        </div>
        )
        : null
    )
}

export default Player;