import { useSelector } from "react-redux";
import { Props, Song } from "../type/SongType";
import { RootState } from "../store/store";
import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import axios from "../utils/CustomAxios";


interface PlayerState {
    played: number;
    duration: number;
    volume: number;
    showVolumeBar: boolean;
}


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

    const [playerState, setPlayerState] = useState<PlayerState>({
        played: 0,
        duration: 0,
        volume: 0.8,
        showVolumeBar: false,
    });

    const playerRef = useRef<ReactPlayer | null>(null);


    const handleProgress = (state: { played: number }) => {
        setPlayerState(prevState => ({
            ...prevState,
            played: state.played,
        }));
    };

    const handleDuration = (duration: number) => {
        setPlayerState(prevState => ({
            ...prevState,
            duration: duration,
        }));
    };

    const handleSeekChange = (e:ChangeEvent|DragEvent) => {
        const newPlayed = parseFloat((e.target as HTMLInputElement).value);
        setPlayerState(prev => ({
            ...prev,
            played: newPlayed,
        }));
        playerRef.current?.seekTo(newPlayed);
    };

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setPlayerState(prevState => ({
            ...prevState,
            volume: newVolume,
        }));
    };

    const currentSong = activeSongNo ? songs.list.filter((song) => song.songNo === activeSongNo)[0] : null;

    const serverResourePath = "http://localhost:8087/soundcast/resource/";

    const member = useSelector((state:RootState) => state.member);
    
    const handleDownload = (currentSong:Song) => {
        //console.log(member.memberNo);
        
        try{
            axios.get(`http://localhost:8087/soundcast/song/download/${currentSong.songNo}`, { params : {memberNo : member.memberNo} , responseType: 'blob'})
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
    
                link.setAttribute('download', currentSong.songFile.songFileOriginName);
                
                document.body.appendChild(link);
                link.click();
                
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch(err => console.log(err))
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

    }, [songs.currentSong]);

    const serverImagePath = "http://localhost:8087/soundcast/resource/";

    return (

        currentSong !== null ? (
        <div className="player" 
            style={{...playerBoxStyle, position:"fixed", bottom:0 ,boxSizing:"border-box", width:"100%", height:"70px", background:"rgba(255, 255, 255, 0.95)", border:"1px solid #D4D4D4", borderRadius:"7px"}}>
        
            <ReactPlayer
                ref={playerRef}
                url={serverResourePath + currentSong.songFile.songFileSongPathName + currentSong.songFile.songFileChangeName}
                playing={activeSongNo ? true : false}
                volume={playerState.volume}
                onProgress={handleProgress}
                onDuration={handleDuration}
                width="0" // 화면에 비디오가 표시되지 않도록 설정합니다.
                height="0"
            />

            <div className='play-icon' style={{width:"45px", height:"45px", paddingRight: "25px"}}>
                <img src={serverImagePath + (activeSongNo === songs.currentSong.songNo ? "public/song/pause-button-icon-black.png" : "public/song/play-icon-black.png")} 
                    style={{height:"100%", width:"100%"}}
                    onClick={()=>setActiveSongNo(activeSongNo === songs.currentSong.songNo ? 0 : songs.currentSong.songNo)} />
            </div>
            
            {/* 이미지 있는 경우 해당 이미지 보여주기, 없는 경우 default image */}
            <div className='song-image' style={{width:"50px", height:"50px", paddingRight: "25px"}}>
                <img 
                src={serverImagePath + (currentSong.songImage.songImageName ? 
                currentSong.songImage.songImagePathName + currentSong.songImage.songImageName 
                : 'public/song/song-image.png')} 
                style={{height:"100%", width:"100%", borderRadius:"2px"}}/>
            </div>
            
            <div className='song-content' style={{width:"300px", height:"50px", paddingRight: "25px"}}>
                <div className='song-title' style={{height:"50%"}}>
                    <span style={{...playerFontStyle, fontSize:"22px", lineHeight:"24px"}}>{songs.currentSong.songTitle}</span>
                </div>
                <div className='artist-name' style={{height:"50%"}}>
                    <span style={{...playerFontStyle}}>{songs.currentSong.memberNickname}</span>
                </div> 
            </div>

            <div className="play-status-box" style={{...playerBoxStyle, width:"45%", paddingRight: "25px"}}>
                <div className="now-playing" style={{...playerBoxStyle, justifyContent:"center", width:"60px"}} >
                    <span style={{...playerFontStyle}}>{formatTime(playerState.played * playerState.duration)}</span>
                </div>
                <div className="play-bar" style={{width:"80%"}}>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={playerState.played}
                    onChange={handleSeekChange}
                    onDrag={handleSeekChange}
                    style={{width:"100%", height:"100%", accentColor:"#BA9FCC"}}
                />
                </div>
                <div className="play-time" style={{...playerBoxStyle, justifyContent:"center",width:"60px"}}>
                    <span style={{...playerFontStyle}}>{formatTime(playerState.duration - playerState.played * playerState.duration)}</span>
                </div>
            </div>

            <div className="volume-box" style={{...playerBoxStyle, width:"15%", paddingRight: "25px"}}>
                <div className="volume-icon" style={{width:"25px", height:"25px"}}>
                    <img 
                        src={serverImagePath + "public/song/audio-control-icon-black.png"}
                        onMouseEnter={() => setPlayerState(prev => ({ ...prev, showVolumeBar: true }))}
                        onMouseLeave={() => setPlayerState(prev => ({ ...prev, showVolumeBar: false }))}
                        style={{height:"100%", width:"100%"}}/>
                </div>
                <div className="volume-control" 
                    onMouseEnter={() => setPlayerState(prev => ({ ...prev, showVolumeBar: true }))}
                    onMouseLeave={() => setPlayerState(prev => ({ ...prev, showVolumeBar: false }))}
                    style={{width:"150px"}}>
                    {playerState.showVolumeBar && (
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step="any"
                            value={playerState.volume}
                            onChange={handleVolumeChange}
                            style={{accentColor:"#1C003B"}}
                            className="volume-bar"
                        />
                    )}
                </div>
            </div>

            <div className='download-icon' style={{width:"25px", height:"25px", paddingRight: "25px"}}>
                <img src={serverImagePath + "public/song/download-icon-black.png"} 
                    style={{height:"100%", width:"100%"}}
                    onClick={()=>handleDownload(currentSong)}/>
            </div>

            <div className='license-copy-icon' 
                    onClick={()=> {if(songs.currentSong.songLicense!==null){licenseCopy(songs.currentSong.songLicense)}}}
                    style={{width:"25px", height:"25px"}}>
                    {songs.currentSong.songLicense !== null ? 
                        (<img src={serverImagePath + "public/song/copy-Icon-black.png"} style={{height:"100%", width:"100%"}}/>)
                        : null
                    }
            </div>
         </div>
        )
        : null
    )
}

export default Player;