import React, { MouseEvent, SetStateAction, useEffect, useState } from "react";
import { initGenres, initMoods, initSong, Song } from "../type/SongType";
import axios from "axios";
import CustomAxios from "../utils/CustomAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { setSongList } from "../features/songSlice";
import { login } from "../features/memberSlice";

const ModifyMusic = ({show, handleClose, selectSong}:{show:boolean, handleClose:() => void, selectSong:Song}) =>{
  
  console.log("셀렉트송");
  console.log(selectSong);
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

    const songs = useSelector((state:RootState) => state.song);
    const genres = songs.genreList.filter((genre) => genre.genreNo > 0);
    const moods = songs.moodList.filter((mood) => mood.moodNo > 0);
    const navi = useNavigate();

    const [ishovered, setIsHovered] = useState('unhovered');

    const [song, setSong] = useState(selectSong);
    const [songTitle, setSongTitle] = useState(selectSong.songTitle);
    const [songDetail, setSongDetail] = useState(selectSong.songDetail === null ? '' : selectSong.songDetail);
    const [songLicense, setSongLicense] = useState(selectSong.songLicense === null ? '' : selectSong.songLicense);

    const dispatch = useDispatch();
  
    const [songImageView, setSongImageView] = useState<string | null>();

    // selectSong prop이 변경될 때마다 상태 업데이트
    useEffect(() => {
    
      setSong(selectSong);
      setSongTitle(selectSong.songTitle);
      setSongDetail(selectSong.songDetail === null ? '' : selectSong.songDetail);
      setSongLicense(selectSong.songLicense === null ? '' : selectSong.songLicense);

      setSelectedGenre(selectSong.songGenreNo);
      setSelectedMood(selectSong.songMoodNo);

      setSongFileOriginName(selectSong.songFile.songFileOriginName);

      setSongImageView(serverImagePath+selectSong.songImage.songImagePathName+selectSong.songImage.songImageName);

    }, [selectSong]);  // 의존성 배열에 selectSong 추가




    // 장르클릭 핸들러 
    const [selectedGenre, setSelectedGenre] = useState(selectSong.songGenreNo);
    
    const genreClickHandler = (genre: SetStateAction<number>) =>{
      setSelectedGenre(genre)
    };
    
    // 분위기 클릭 핸들러
    const [selectedMood, setSelectedMood] = useState(selectSong.songMoodNo);
    
    const moodClickHandler = (mood: SetStateAction<number>) =>{
      setSelectedMood(mood)
    };
    
    // 파일 이미지 클릭 핸들러
    const [songImage, setSongImage] = useState<File|string>('');

    const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setSongImageView(reader.result as string);  // 파일의 데이터 URL을 songImage 상태에 설정
          };
          reader.readAsDataURL(file); // 파일을 읽어 데이터 URL로 변환

          setSongImage(file);
        }
      }

    // 음원 파일 클릭 핸들러
    const [songFileOriginName, setSongFileOriginName] = useState<string>(selectSong.songFile.songFileOriginName);
    const [songFile, setSongFile] = useState<File|string>('');
    
    const handleSongFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
        if(file) {
          setSongFileOriginName(file.name);
          setSongFile(file);
        }
    }

    const serverImagePath = "http://localhost:8087/soundcast/resource/";

    const member = useSelector((state:RootState) => state.member);

    const updateSong = ()=> {
      
      const renewSong:Song = {
        ...song,
        songTitle,
        songDetail,
        songLicense,
        songGenreNo : selectedGenre,
        songMoodNo : selectedMood
      }      
      setSong(renewSong);
      
      const requestBody = new FormData();
      const songInfo = new Blob([JSON.stringify(renewSong)], {type : 'application/json'})
      
      requestBody.append("songInfo", songInfo);
      requestBody.append("songFile", songFile);
      requestBody.append("songImage", songImage);

      //back으로 update된 song 전송 하는 코드 추가 
      console.log(renewSong)
      console.log(requestBody.get("songinfo"));
      console.log(requestBody.get("file"));

      CustomAxios.put(`http://localhost:8087/soundcast/song/update/${selectSong.songNo}`, requestBody)
        .then((response) => {
          // dispatch(setSongList(
          //   songs.list.map((item) => 
          //     item.songNo === selectSong.songNo ? renewSong : item
          // )));
          dispatch(setSongList(response.data));
          
          setSongImageView(null);
          alert("수정 성공");
          handleClose();
        })
        .catch(err => console.log(err))
    
      navi("/member/mypage");
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
                src={songImageView === null ? "http://localhost:8087/soundcast/resource/public/song/song-image-default.png" 
                  : songImageView} 
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
                accept="audio/*"
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
              value={selectSong.memberNickname} 
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