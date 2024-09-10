import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { initSong, Props } from "../type/SongType";
import { useEffect, useState } from "react";
import { setPlaySong } from "../features/songSlice";

const MemberSongs = () =>{
        // 스타일
        const searchListBoxStyle = {width: "100%", height: "80px", display: "flex", alignItems : "center", justifyContent: "space-evenly", 
            background: "#1C003B", borderTop: "1px solid #FFFFFF"};
        const searchListFontStyle = {fontFamily:"Inter", fontStyle:"normal", fontSize:"20px", fontWeight:"700", lineHeight:"24px", color :"#000000"};
        const itemBoxStyle = {display: "flex", alignItems: "center", justifyContent: "center", width: "120px", height: "38px", background: "#FFFFFF", borderRadius: "10px"};
        const iconBoxSizeStyle = { height: "35px", width: "35px"};
    
        const song = useSelector((state:RootState)=>state.song);
        const dispatch = useDispatch();
        const songs = initSong
    
        //선택한 요소
        const [activeSongNo, setActiveSongNo] = useState<number|null>(null);
    
        const handleIconClick = (id: number) => {
        setActiveSongNo(id === activeSongNo ? 0 : id);
        };
        useEffect(()=>{
        if(activeSongNo!==null){
        dispatch(setPlaySong(activeSongNo));
        }
        },[activeSongNo])
    
        const [licenseItem, setLicenseItem] = useState<number | null>(null); 
        const handleLicenseClick = (id:number) => {    
            setLicenseItem(id === licenseItem ? null : id);
        }
        const licenseCopy = (license:string) => {
            navigator.clipboard.writeText(license)
                .then(()=>{alert("음원의 라이선스가 복사되었습니다!")})
                .catch((err)=>{console.log(err)})
        }
    


    return(
     null

    );
}

export default MemberSongs;



// {/* <>      
// <div className='search-list-content' >
// {
// songs.map(Props => (
// //검색결과를 플레이리스트로 반환 (반복)
// <div key={Props.songNo}>
// <div className='search-list'  style={{...searchListBoxStyle}}>

//    <div className='play-icon' style={{...iconBoxSizeStyle}} >
//        <img src={Props.songNo === activeSongNo ? "images/pause-button-icon-white.png" : "images/play-icon-white.png"} 
//            style={{height:"100%", width:"100%"}}
//            onClick={()=>handleIconClick(Props.songNo)}/>
//    </div>
//    {/* 이미지 있는 경우 해당 이미지 보여주기, 없는 경우 default image */}
//    <div className='song-image' style={{width:"50px", height:"50px"}}>
//        <img src='images/song-image-default.png' style={{height:"100%", width:"100%"}}/>
//    </div>
//    <div className='song-content' style={{width:"300px", height:"50px"}}>
//        <div className='song-title' style={{height:"50%"}}>
//            <span style={{...searchListFontStyle, color:"#FFFFFF"}}>{Props.songTitle}</span>
//        </div>
//        <div className='artist-name' style={{height:"50%"}}>
//            <span style={{...searchListFontStyle, fontSize:"15px", lineHeight:"18px", color:"#FFFFFF"}}>{Props.songMemberNo}</span>
//        </div> 
//    </div>

//    {/* 재생중일 때 나타나는 헤드폰 아이콘 */}
//    <div className='headphone-icon' style={{...iconBoxSizeStyle}}>
//        {activeSongNo === Props.songNo && (<img src="images/headphone-icon.png" style={{height:"100%", width:"100%"}}/>)}
//    </div>

//    <div className='genre-box' style={{...itemBoxStyle}}>
//        <span style={{...searchListFontStyle}}>{Props.songGenreNo}</span>
//    </div>
//    <div className='mood-box' style={{...itemBoxStyle}}>
//        <span style={{...searchListFontStyle}}>{Props.songMoodNo}</span>
//    </div>
   
//    {/* 라이센스가 있을 경우 나타나는 아이콘 */}
//    <div className='license-icon' style={{...iconBoxSizeStyle}}>
//        {  Props.songLicense !== null && 
//            (<img src='images/license-icon.png' style={{height:"100%", width:"100%"}}/>)
//        }
//    </div>
   
//    <div className='play-time-box' style={{display:"flex", alignItems:"center", height: "38px"}}>
//        <div className='clock-icon' style={{...iconBoxSizeStyle, paddingRight:"7px"}}>
//            <img src='images/clock-icon.png' style={{height:"100%", width:"100%"}}/>
//        </div>
//        <div className='play-time'>
//            <span style={{...searchListFontStyle, color:"#FFFFFF"}}>1:58</span>
//        </div>
//    </div>

//    <div className='download-box' style={{...itemBoxStyle}}>
//        <span style={{...searchListFontStyle}}>다운로드</span>
//    </div>

//    <div className='share-icon' style={{...iconBoxSizeStyle}}>
//        <img src='images/share-icon.png' style={{height:"100%", width:"100%"}}/>
//    </div>

//    {/* 클릭했을 경우 아래 박스가 라이선스 표기 영역이 표시됨 */}
//    <div className='open-icon' style={{...iconBoxSizeStyle}} >
//        {  Props.songLicense !== null && 
//            (<img src={licenseItem===Props.songNo ? "images/open-icon-now.png" : "images/open-icon.png"} 
//                style={{height:"100%", width:"100%"}} 
//                onClick={()=>{handleLicenseClick(Props.songNo)}}/>)
//        }   
//    </div>
// </div>

// {   licenseItem === Props.songNo && 
//     (<div className="license-box" style={{...searchListBoxStyle, alignItems:"", border : 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: "10px", borderBottomLeftRadius: "10px"}}>
//     <div className="license-text-box" style={{...searchListBoxStyle, width:"98%", height:"85%", background: "#FFFFFF", borderRadius: "10px"}}>
//         <p style={{...searchListFontStyle, fontSize:"18px", width:"85%", height:"85%"}}>{Props.songLicense}</p>
//         <div className='license-copy-icon' 
//            onClick={()=> {if(Props.songLicense!==null){licenseCopy(Props.songLicense)}}}
//            style={{...itemBoxStyle, background: "#1C003B", width:"10%", height:"65%"}} >
//            <img src="images/copy-Icon-white.png"/>
//         </div>
//     </div>
//     </div>)
// }
// </div>
// ) )
// }
// </div>

// </> */}



