import { useSelector } from "react-redux";
import { Props } from "../type/SongType";
import { RootState } from "../store/store";

function Player(props:Props){
    
    //스타일
    const playerFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"16px", lineHeight:"18px", fontWeight:"700", color :"#000000"};
    const playerBoxStyle = {display: "flex", alignItems : "center", justifyContent: "center"}
    
    //매개변수로 클릭한 activeItemNo 받음.
    const {activeSongNo, setActiveSongNo} = props;
    const songs = useSelector((state:RootState)=>state.song)
    
    const licenseCopy = (license:string) => {
        navigator.clipboard.writeText(license)
            .then(()=>{alert("음원의 라이선스가 복사되었습니다!")})
            .catch((err)=>{console.log(err)})
    }

    return (

        activeSongNo !== null ? (
        <div className="player" 
            style={{...playerBoxStyle, position:"fixed", bottom:0 ,boxSizing:"border-box", width:"100%", height:"70px", background:"rgba(255, 255, 255, 0.95)", border:"1px solid #D4D4D4", borderRadius:"7px"}}>
        
            <div className='play-icon' style={{width:"45px", height:"45px", paddingRight: "25px"}}>
                <img src={activeSongNo === songs.currentSong.songNo ? "images/song/pause-button-icon-black.png" : "images/song/play-icon-black.png"} 
                    style={{height:"100%", width:"100%"}}
                    onClick={()=>setActiveSongNo(activeSongNo === songs.currentSong.songNo ? 0 : songs.currentSong.songNo)} />
            </div>
            
            {/* 이미지 있는 경우 해당 이미지 보여주기, 없는 경우 default image */}
            <div className='song-image' style={{width:"50px", height:"50px", marginRight: "25px"}}>
                <img src='/images/song/song-image.png' style={{height:"100%", width:"100%", borderRadius:"2px"}}/>
            </div>
            
            <div className='song-content' style={{boxSizing:"border-box", width:"300px", height:"50px", padding: "0 25px", textAlign:"start"}}>
                <div className='song-title' style={{height:"50%"}}>
                    <span style={{...playerFontStyle, fontSize:"22px", lineHeight:"24px"}}>{songs.currentSong.songTitle}</span>
                </div>
                <div className='artist-name' style={{height:"50%"}}>
                    <span style={{...playerFontStyle}}>{songs.currentSong.songMemberNo}</span>
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
                    <img src="/images/song/audio-control-icon-black.png" style={{height:"100%", width:"100%"}}/>
                </div>
                <div className="volume-control" style={{width:"150px"}}>
                    <span>볼륨바</span>
                </div>
            </div>

            <div className='download-icon' style={{width:"25px", height:"25px", marginRight:"5px"}}>
                <img src="/images/song/download-icon-black.png" style={{height:"100%", width:"100%"}}/>
            </div>

            <div className='license-copy-icon' 
                    onClick={()=> {if(songs.currentSong.songLicense!==null){licenseCopy(songs.currentSong.songLicense)}}}
                    style={{width:"25px", height:"25px"}}>
                    {songs.currentSong.songLicense !== null ? 
                        (<img src="/images/song/copy-Icon-black.png" style={{height:"100%", width:"100%"}}/>)
                        : null
                    }
            </div>
         </div>
        )
        : null
    )
}

export default Player;