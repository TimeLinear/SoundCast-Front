import { useState } from "react";
import { initGenres, initMoods, initSong, Song } from "../type/SongType";

function UpdateMySong(){

    const updateSongFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"12.5px", fontWeight:"700"};
    const genres = initGenres;
    const moods = initMoods;
    
    const [song, setSong] = useState(initSong);
    const [title, setTitle] = useState(song.songTitle);
    const [artist, setArtist] = useState(song.songMemberNo);
    const [license, setLicense] = useState(song.songLicense);
    const [detail, setDetail] = useState(song.songDetail);
    const [genre, setGenre] = useState(song.songGenreNo);
    const [mood, setMood] = useState(song.songMoodNo);
    const [color, setColor] = useState("#FFFFFF"); 

    const changeColor = () => {
        setColor("#DDDDDD")
    }


   function updateSong(){

     const renewSong:Song = {
        songNo : song.songNo,
        songTitle : title,
        songMemberNo : artist,
        songDetail : detail,
        songGenreNo : genre,
        songMoodNo : mood,
        songLicense : license,
        songFileNo : 0,
        songImageNo : 0
     }
     setSong(renewSong);
   }

    return (
        <div className="update-modal" style={{position : "fixed", zIndex: 10, height: "100vh", width:"100%", backgroundColor:"rgba(0, 0, 0, 0.7)", display: "flex", alignItems:"center", justifyContent: "center"}}>
        <div className="update-my-song-modal"
            style={{width:"935px", height:"690px", borderRadius:"10px", display:"flex", border:"0.3px solid "}}>
            
            <div className="song-head" 
                style={{width:"32%", height:"100%", borderRadius:"10px 0px 0px 10px", background:"#323641", display: "flex", flexDirection:"column", justifyContent:"center"}}>
                
                {/* 이미지 있는 경우 해당 이미지 보여주기, 없는 경우 default image */}
                <div className="song-image-box"
                    style={{width:"100%", height:"35%", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <img src="images/song-image-custom.png" style={{width:"50%", opacity:"60%", borderRadius:"10px"}} />
                </div>
                <div className="song-play-box"
                    style={{width:"100%", height:"15%"}}>
                    <div className="song-play"
                        style={{width:"90%", height:"65%", margin:"auto", display:"flex", alignItems:"center", justifyContent: "center" ,backgroundColor:"#656871", borderRadius:"40px"}}>
                        <div className="play-icon-box"
                            style={{width:"25px", height:"25px"}}> 
                            <img src="images/play-icon-white.png"
                                style={{width:"100%", height:"100%"}}/>
                        </div>
                        <div style={{width:"10px"}}></div>
                        <div className="play-status-box"
                            style={{height:"25px"}}>
                            <img src="images/play-status-icon-white.png" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="song-body" style={{width:"68%", height:"100%", borderRadius:"0px 10px 10px 0px", backgroundColor:"#FFFFFF", display:"flex", alignItems:"center", justifyContent: "center"}}>
                <div className="update-my-song" 
                    style={{width:"85%", height:"90%", display: "flex", flexDirection:"column", justifyContent:"center"}}>
                    <div className="title"
                        style={{width:"100%", height:"10%"}}>
                        <p style={{...updateSongFontStyle, fontSize:"20px",lineHeight:"24px"}}>내 음원 수정하기</p>
                    </div>
                    <div className="my-song-info"
                        style={{width:"100%", height:"40%"}}>
                        <div className="info-1" style={{width:"100%", height:"50%", display: "flex"}}>
                            <div className="info-3"
                                style={{width:"50%", height:"100%"}}> 
                                <div className="update-song-title"
                                    style={{width:"100%", height:"50%"}}>
                                    <div className="song-title"
                                        style={{width:"100%"}}>
                                        <span style={{...updateSongFontStyle, fontWeight:"900", fontSize:"15px"}}>제목</span>
                                    </div>
                                    <div className="update-title"
                                        style={{width:"100%"}}>
                                        <input type="text" 
                                            value={title}
                                            onChange={(e)=>{setTitle(e.target.value)}}
                                            style={{border:0, width:"80%", color:"#3D3D3D", ...updateSongFontStyle}} />
                                    </div>
                                </div>
                                <div className="update-artist-name"
                                    style={{width:"100%", height:"50%"}}>
                                    <div className="song-artist"
                                        style={{width:"100%"}}>
                                        <span style={{...updateSongFontStyle, fontWeight:"900", fontSize:"15px"}}>제작자</span>
                                    </div>
                                    <div className="update-artist"
                                        style={{width:"100%"}}>
                                        <input type="text"
                                            value={artist}
                                            // onChange={(e)=>{if(e.target.value!){setArtist(e.target.value as Number)}}}
                                            style={{border:0, width:"80%", color:"#3D3D3D", ...updateSongFontStyle}} />
                                    </div>
                                </div>
                            </div>
                            <div className="info-4"
                                style={{width:"50%", height:"100%"}}> 
                                <div className="update-song-license"
                                    style={{width:"100%", height:"70%"}}>
                                    <div className="song-license"
                                        style={{width:"100%"}}>
                                        <span style={{...updateSongFontStyle, fontWeight:"900", fontSize:"15px"}}>라이센스</span>
                                    </div>
                                    <div className="update-license"
                                        style={{width:"95%"}}>
                                        <textarea rows={6} 
                                            onChange={(e)=>{setLicense(e.target.value)}}
                                            style={{width:"100%", resize:"none", border:0, ...updateSongFontStyle, color:"#3D3D3D"}}>{license}</textarea>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <div className="info-2" style={{width:"100%", height:"50%"}}>
                            <div className="update-song-detail"
                                style={{width:"100%", height:"100%"}}>
                                
                                <div className="song-detail"
                                    style={{width:"100%", height:"20%"}}>
                                    <span style={{...updateSongFontStyle, fontWeight:"900", fontSize:"15px"}}>곡 설명</span>
                                </div>
                                <div className="update-detail"
                                    style={{width:"100%", height:"80%"}}>
                                    <textarea rows={5}
                                        onChange={(e)=>{setDetail(e.target.value)}}
                                        style={{border:0, width:"90%", resize:"none", ...updateSongFontStyle, color:"#3D3D3D"}}>{detail}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="genre-select-box"
                        style={{width:"100%", height:"20%"}}>
                    
                        <div className="update-genre-box"
                            style={{width:"100%", height:"20%"}}>
                                <span style={{...updateSongFontStyle, fontWeight:"900", fontSize:"15px"}}>장르를 선택해주세요.</span>
                        </div>
                        <div className="select-genre"
                            style={{width:"100%", height:"80%", display:"flex", flexWrap:"wrap", justifyContent:"center", alignContent:"space-evenly"}}>
                            {
                                genres.map( genre => (
                                <div className='genre'
                                    key={genre.genreNo}
                                    onClick={changeColor}
                                    style={{width:"80px", height:"25px", marginRight:"5px", backgroundColor:color, borderRadius:"6px", display:"flex",alignItems:"center", justifyContent:"center"}}>
                                    <span style={{...updateSongFontStyle, fontSize:"12px"}}>{genre.genreName}</span>
                                </div>
                                ))  
                            }
                        </div>

                    </div>
                    <div className="mood-select-box"
                        style={{width:"100%", height:"20%"}}>
                        <div className="update-mood-box"
                            style={{width:"100%", height:"20%"}}>
                                <span style={{...updateSongFontStyle, fontWeight:"900", fontSize:"15px"}}>분위기를 선택해주세요.</span>
                        </div>
                        <div className="select-mood"
                            style={{width:"100%", height:"80%", display:"flex", flexWrap:"wrap", justifyContent:"center", alignContent:"space-evenly"}}>
                            {
                                moods.map( mood => (
                                <div className='genre'
                                    key={mood.moodNo}
                                    onClick={()=>{}}
                                    style={{width:"80px", height:"25px", marginRight:"5px", borderRadius:"6px", display:"flex",alignItems:"center", justifyContent:"center"}}>
                                    <span style={{...updateSongFontStyle, fontSize:"12px"}}>{mood.moodName}</span>
                                </div>
                                ))  
                            }
                        </div>

                    </div>
                    <div className="update-button-box"
                        style={{width:"100%", height:"10%", display:"flex",alignItems:"center", justifyContent:"center"}}>
                        <input type="button" 
                            value={"수정"}
                            onClick={()=>updateSong}
                            style={ {width:"120px",height:"25px", backgroundColor:"#460373", border:"0.4px solid #303030", borderRadius:"10px",
                                    color:"#FFFFFF", ...updateSongFontStyle, fontSize:"15px"
                            }}/>
                    </div>
                </div>
            </div>
        
        </div>
        
        </div>
    );
}

export default UpdateMySong;