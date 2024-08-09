
import { useState } from "react";
import { Song } from "../type/SongType";
import { Props } from "../type/SongType";
import Player from "./PlayBar";

function SearchList(){

    // 스타일
    const searchListBoxStyle = {width: "100%", height: "80px", display: "flex", alignItems : "center", justifyContent: "space-evenly", 
                                background: "#1C003B", borderTop: "1px solid #FFFFFF"};
    const searchListFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"20px", fontWeight:"700", lineHeight:"24px", color :"#000000"};
    const itemBoxStyle = {display: "flex", alignItems: "center", justifyContent: "center", width: "120px", height: "38px", background: "#FFFFFF", borderRadius: "10px"};
    const iconBoxSizeStyle = { height: "35px", width: "35px"};
    
    const songs: Song[] = [
        {songNo: 1, songMemberNo : 0, songTitle : 'song1', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : null},
        {songNo: 2, songMemberNo : 0, songTitle : 'song2', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스2'},
        {songNo: 3, songMemberNo : 0, songTitle : 'song3', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : null},
        {songNo: 4, songMemberNo : 0, songTitle : 'song4', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스4'},
        {songNo: 5, songMemberNo : 0, songTitle : 'song5', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스5'},
        {songNo: 6, songMemberNo : 0, songTitle : 'song6', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스6'},
        {songNo: 7, songMemberNo : 0, songTitle : 'song7', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스7'},
        {songNo: 8, songMemberNo : 0, songTitle : 'song8', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스8'},
      ];
    
    //선택한 요소
    const [activeSongNo, setActiveSongNo] = useState<number | null>(null);
    const handleIconClick = (id: number) => {
        setActiveSongNo(id === activeSongNo ? 0 : id);
    };

    const props:Props = {
        activeSongNo,
        setActiveSongNo
    }
    
 


    const [licenseItem, setLicenseItem] = useState<number | null>(null); 
    const handleLicenseClick = (id:number) => {    
        setLicenseItem(id === licenseItem ? null : id);
    }

    
    return (
        <>
            <div className='search-list-title' style={{height: "50px", padding:"0 10%", width:"80%"}}>
                <p style={{...searchListFontStyle, fontSize:"24px"}}>다운로드 TOP 20</p>
            </div>
            <div className='search-list-content' style={{padding : "0 10%", width: "80%"}}>
                {

                songs.map( Song => (
                //검색결과를 플레이리스트로 반환 (반복)
                <>
                <div className='search-list' key={Song.songNo} style={{...searchListBoxStyle}}>
            
                    <div className='play-icon' style={{...iconBoxSizeStyle}} >
                        <img src={Song.songNo === activeSongNo ? "images/pause-button-icon-white.png" : "images/play-icon-white.png"} 
                            style={{height:"100%", width:"100%"}}
                            onClick={()=>handleIconClick(Song.songNo)}/>
                    </div>
                    {/* 이미지 있는 경우 해당 이미지 보여주기, 없는 경우 default image */}
                    <div className='song-image' style={{width:"50px", height:"50px"}}>
                        <img src='images/song-image.png' style={{height:"100%", width:"100%"}}/>
                    </div>
                    <div className='song-content' style={{width:"300px", height:"50px"}}>
                        <div className='song-title' style={{height:"50%"}}>
                            <span style={{...searchListFontStyle, color:"#FFFFFF"}}>Time is Eating</span>
                        </div>
                        <div className='artist-name' style={{height:"50%"}}>
                            <span style={{...searchListFontStyle, fontSize:"15px", lineHeight:"18px", color:"#FFFFFF"}}>아티스트명</span>
                        </div> 
                    </div>

                    {/* 재생중일 때 나타나는 헤드폰 아이콘 */}
                    <div className='headphone-icon' style={{...iconBoxSizeStyle}}>
                        {activeSongNo === Song.songNo && (<img src="images/headphone-icon.png" style={{height:"100%", width:"100%"}}/>)}
                    </div>

                    <div className='genre-box' style={{...itemBoxStyle}}>
                        <span style={{...searchListFontStyle}}>장르</span>
                    </div>
                    <div className='mood-box' style={{...itemBoxStyle}}>
                        <span style={{...searchListFontStyle}}>분위기</span>
                    </div>
                    
                    {/* 라이센스가 있을 경우 나타나는 아이콘 */}
                    <div className='license-icon' style={{...iconBoxSizeStyle}}>
                        {  Song.songLicense !== null && 
                            (<img src='images/license-icon.png' style={{height:"100%", width:"100%"}}/>)
                        }
                    </div>
                    
                    <div className='play-time-box' style={{display:"flex", alignItems:"center", height: "38px"}}>
                        <div className='clock-icon' style={{...iconBoxSizeStyle, paddingRight:"7px"}}>
                            <img src='images/clock-icon.png' style={{height:"100%", width:"100%"}}/>
                        </div>
                        <div className='play-time'>
                            <span style={{...searchListFontStyle, color:"#FFFFFF"}}>1:58</span>
                        </div>
                    </div>

                    <div className='download-box' style={{...itemBoxStyle}}>
                        <span style={{...searchListFontStyle}}>다운로드</span>
                    </div>

                    <div className='share-icon' style={{...iconBoxSizeStyle}}>
                        <img src='images/share-icon.png' style={{height:"100%", width:"100%"}}/>
                    </div>

                    {/* 클릭했을 경우 아래 박스가 라이선스 표기 영역이 표시됨 */}
                    <div className='open-icon' style={{...iconBoxSizeStyle}} >
                        {  Song.songLicense !== null && 
                            (<img src={licenseItem===Song.songNo ? "images/open-icon-now.png" : "images/open-icon.png"} 
                                style={{height:"100%", width:"100%"}} 
                                onClick={()=>{handleLicenseClick(Song.songNo)}}/>)
                        }   
                    </div>
                </div>
                
                {   licenseItem === Song.songNo && 
                     (<div className="license-box" style={{...searchListBoxStyle, alignItems:"", border : 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px"}}>
                     <div className="license-text-box" style={{...searchListBoxStyle, width:"98%", height:"85%", background: "#FFFFFF", borderRadius: "10px"}}>
                         <p style={{...searchListFontStyle, fontSize:"18px", width:"85%", height:"85%"}}>{Song.songLicense}</p>
                         <div className='license-copy-icon' style={{...itemBoxStyle, background: "#1C003B", width:"10%", height:"65%"}} >
                             <img src="images/copy-Icon-white.png"/>
                         </div>
                     </div>
                     </div>)
                }
                </>
                ) )
            }
            </div>
            

            <Player {...props} />
        </>
    );
}

export default SearchList;