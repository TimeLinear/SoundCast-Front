import React, { MouseEvent, SetStateAction, useState } from "react";
import { initGenres, initMoods, initSong, Song } from "../type/SongType";
import axios from "axios";

const ModifyMusic = ({show, handleClose}:{show:boolean, handleClose:() => void}) =>{
  
  // ==== 스타일 ====
    
  const modalStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  };

  const displayBlockStyle: React.CSSProperties = {
    display: 'flex',
  };

  const displayNoneStyle: React.CSSProperties = {
    display: 'none',
  };

  const modalOverlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const modalContentStyle: React.CSSProperties = {
    background: '#FFFFFF',
    borderRadius: '12px',
    paddingRight: '20px',
    width: '940px',
    height: '600px',
    maxWidth: '90%',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  };

  const modalHeaderStyle: React.CSSProperties = {
    display: 'flex',
    paddingTop: '20px',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  };

  const modalHeaderTextStyle: React.CSSProperties = {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '20px',
    textAlign: 'left',
  };

  const modalCloseStyle: React.CSSProperties = {
    alignSelf: 'right',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  };

  const modalBodyStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px',
  };

  const leftSectionStyle: React.CSSProperties = {
    borderRadius: '12px 0 0 12px',
    width: '40%',
    height: '600px',
    display: 'flex',
    background: '#323641',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const imagePreviewStyle: React.CSSProperties = {
    width: '250px',
    height: '250px',
    borderRadius: '8px',
    marginBottom: '20px',
  };

  const fileUploadStyle: React.CSSProperties = {
    position: "relative",
    width:"100%",
    height:"100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:"#FFFFFF",
    border: "0.5px solid #F0F0F0",
    borderRadius: "8px"    
  }

  const hoveredStyle: React.CSSProperties = {
    background: "#F0F0F0",
    color: "#333333",
    fontWeight: 700,
    cursor: "pointer",
    borderRadius: "8px"    
  }

  const filenameStyle: React.CSSProperties = {
    color: '#FFFFFF',
  };

  const rightSectionStyle: React.CSSProperties = {
    width: '60%',
    maxHeight: '600px',
    display: 'flex',
    flexDirection: 'column',
  };

  const formGroupStyle: React.CSSProperties = {
    marginBottom: '20px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#888888',
  };

  const textInputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    border: '1px solid #CCCCCC',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#333333',
  };

  const licenseInputStyle: React.CSSProperties = {
    width: '96%',
    height: 'auto',
    padding: '10px',
    border: '1px solid #CCCCCC',
    borderRadius: '8px',
    resize: 'none',
  };

  const genreOptionsStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  };

  const genreOptionStyle: React.CSSProperties = {
    background: '#F0F0F0',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#666666',
  };

  const genreOptionSelectedStyle: React.CSSProperties = {
    background: '#8A2BE2',
    color: '#FFFFFF',
  };

  const agreementStyle: React.CSSProperties = {
    width: '96%',
    height: 'auto',
    padding: '10px',
    border: '1px solid #CCCCCC',
    borderRadius: '8px',
    resize: 'none',
  };

  const submitButtonStyle: React.CSSProperties = {
    width: '100%',
    background: '#8A2BE2',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    textAlign: 'center',
    marginBottom: '20px',
  };

  // ====


  const showHideClassName = show ? { ...modalStyle, ...displayBlockStyle } : { ...modalStyle, ...displayNoneStyle };

  const handleBackgroundClick = (event:MouseEvent) => {
    if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const moods = initMoods;
    const genres = initGenres;
    
    const [ishovered, setIsHovered] = useState('unhovered');
    

    const [song, setSong] = useState(initSong);
    const [songTitle, setSongTitle] = useState(song.songTitle);
    const [songDetail, setSongDetail] = useState(song.songDetail === null ? '' : song.songDetail);
    const [songLicense, setSongLicense] = useState(song.songLicense === null ? '' : song.songLicense);
    
    // 장르클릭 핸들러 
    const [selectedGenre, setSelectedGenre] = useState(song.songGenreNo);
    
    const genreClickHandler = (genre: SetStateAction<number>) =>{
      setSelectedGenre(genre)
    };
    
    // 분위기 클릭 핸들러
    const [selectedMood, setSelectedMood] = useState(song.songMoodNo);
    
    const moodClickHandler = (mood: SetStateAction<number>) =>{
      setSelectedMood(mood)
    };
    
    // 파일 이미지 클릭 핸들러
    const [songImage, setSongImage] = useState<string | null>(null);
    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSongImage(reader.result as string);  // 파일의 데이터 URL을 songImage 상태에 설정
          };
          reader.readAsDataURL(file); // 파일을 읽어 데이터 URL로 변환
        }
      }

    // 음원 파일 클릭 핸들러
    const [songFileOriginName, setSongFileOriginName] = useState<string|undefined>(song.songFile.songFileOriginName);
    const handleSongFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
        if(file) {
          setSongFileOriginName(file.name);
          const reader = new FileReader();
          reader.onloadend = () => {
            // setSongFileOriginName(reader.result as string);
          }
          reader.readAsDataURL(file);
        }
    }

    const updateSong = ()=> {
      
      const renewSong:Song = {
        ...song,
        songDetail,
        songLicense,
        songGenreNo : selectedGenre,
        songMoodNo : selectedMood,
        //songImageNo, songImageNo의 songImageName을 업데이트 해야함.
        songFile: { ...song.songFile, songFileOriginName : song.songFile.songFileOriginName }

      }
      
      setSong(renewSong);

      //back으로 update된 song 전송 하는 코드 추가 

      axios.put(`http://localhost:8087/soundcast/updateSong/${song.songNo}`, song)
        .then((response) => alert("수정되었습니다.") )
        .catch(err => console.log(err))

    }


    return (
        <div style={showHideClassName} onClick={handleBackgroundClick}>
        <div className="modal-overlay" 
          style={modalOverlayStyle} >
        <div className="modal-content" 
          style={modalContentStyle}
          onClick={(e) => e.stopPropagation()}>
                
        <div className="modal-body"
          style={modalBodyStyle}>
          <div className="left-section"
            style={leftSectionStyle}>
            <div className="image-preview"
              style={{
                position:"relative",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                ...imagePreviewStyle
               }}>
              {/* 커스텀 이미지 없을 경우 default 이미지 */}
              <label htmlFor="file-input" 
                className="image-label"
                style={{
                  cursor:"pointer"
                }} >
              <img className="image-custom"
                style={{
                  width:"100%",
                  height:"100%", 
                  objectFit:"cover"
                }}
                src={songImage === null ? "/images/default/song_default.png" : songImage} 
                alt="Preview" />
              <input 
                type="file" 
                id="file-input" 
                accept="image/*" 
                onChange={handleFileChange}
                className="file-input"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer"
                }}
                alt="Preview" />
              </label>
            </div>
            
        <div className="music-file"
          style={{
            width:"250px",
            height:"70px"
          }}
          >
            <div className="file-upload"
              onMouseOver={()=>{setIsHovered('hovered')}}
              onMouseLeave={()=>{setIsHovered('unhovered')}}
              style={ ishovered === 'hovered'? {...fileUploadStyle, ...hoveredStyle} : {...fileUploadStyle}}
            >
              <label htmlFor="song-file-upload"
                className="file-upload-box"
                style={{
                  display: "block",
                  cursor: "pointer"
                }}>
              <p className="song-file-name">{songFileOriginName}</p>
              <input 
                type="file"
                id="song-file-upload"
                accept="mp3/*"
                onChange={handleSongFileChange}
                className="song-file-input"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer"
                }}/>
              </label> 
            </div>
        </div>  
      </div>
      
      <div className="right-section"
        style={rightSectionStyle}>
        <div className="modal-header"
          style={modalHeaderStyle}>
          <p style={modalHeaderTextStyle}>내 음원 수정하기</p>
          <button className="modal-close"
            style={modalCloseStyle}
            onClick={handleClose}>✕
          </button>
        </div>

        <div className="form-container"
          style={{ overflowY: "auto" , textAlign:"start"}}>
          <div style={formGroupStyle}>
            <label style={labelStyle}>제목</label>
            <input type="text" 
              value={songTitle} 
              style={textInputStyle}
              onChange={(e)=>{setSongTitle(e.target.value)}} />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>제작자</label>
            <input type="text" 
              value="박다온" 
              readOnly 
              style={textInputStyle}
              />
          </div>

          <div style={formGroupStyle}>
            <label style={labelStyle}>곡 설명</label>
              <input type="text"
                value={songDetail}
                style={textInputStyle}
                onChange={(e)=>{setSongDetail(e.target.value)}} 
                placeholder="곡 설명을 입력해주세요" />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>라이센스</label>
            <textarea 
              value={songLicense}
              onChange={(e)=>{setSongLicense(e.target.value)}}
              placeholder="라이센스를 입력해주세요" 
              rows={5} 
              style={licenseInputStyle} />
            </div>

            <div style={formGroupStyle}>
              <label style={labelStyle}>장르를 선택해 주세요.</label>
              <div style={genreOptionsStyle}>
              {genres.map((genre) => (
                    <button
                        key={genre.genreNo}
                        style={
                          selectedGenre === genre.genreNo
                            ? { ...genreOptionStyle, ...genreOptionSelectedStyle }
                            : genreOptionStyle
                        }
                        onClick={() => genreClickHandler(genre.genreNo)} // 장르 클릭 시 함수 호출
                    >
                        {genre.genreName}
                    </button>
                ))}
              </div>
            </div>

          
            <div style={formGroupStyle}>
              <label style={labelStyle}>*분위기를 선택해 주세요.</label>
              <div className="mood-options"
                style={genreOptionsStyle}>
                {moods.map((mood) => (
                    <button
                        key={mood.moodNo}
                        style={
                          selectedMood === mood.moodNo
                            ? { ...genreOptionStyle, ...genreOptionSelectedStyle }
                            : genreOptionStyle
                        }
                        onClick={() => moodClickHandler(mood.moodNo)} // 분위기 클릭 시 함수 호출
                    >
                        {mood.moodName}
                    </button>
                ))}
              </div>
              <div style={formGroupStyle}>
                    <label style={labelStyle}>업로드 이용약관</label>
                    <textarea
                      rows={5}
                      style={agreementStyle}
                      readOnly
                      value={`제1조 [목적]
이 약관은 ㈜사운드캐스트(이하 “회사”)와 “이용자” 간에 “회사”가 제공하는 콘텐츠 서비스인 사운드 캐스트 및 제반 서비스를 이용함에 있어 “회사”와 “이용자” 간의 권리, 의무에 관한 사항과 기타 필요한 사항을 규정하는 것을 목적으로 합니다.
                        
제2조 (정의)
① “서비스”란 음원을 회원에게 배포하기 위해 회사에서 제공하는 홈페이지를 포함한 제반 서비스를 의미합니다.
② “이용자”라 함은 “회사”가 제공하는 “서비스”에 유선 또는 무선 인터넷 등의 수단으로 접속하여 이 약관에 따라 “회사”가 제공하는 “콘텐츠” 및 제반 서비스를 이용하는 “회원” 및 “비회원”을 말합니다.
③ “음원”이란 회사에서 제공하는, 회원이 개인적으로 사용할 수 있는 라이브러리 음원을 의미합니다.
④ “영상이모티콘”이란 회사에서 제작, 제공하는 영상편집 소스(MP4, GIF)파일을 의미합니다.
⑤ “콘텐츠”란 “회사”에서 제공하는 모든 음원 및 영상이모티콘을 의미합니다.`}
                    />
                  </div>
                </div>
              <button className="submit-button"
              style={submitButtonStyle}
              onClick={updateSong}>수정</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
   

export default ModifyMusic;