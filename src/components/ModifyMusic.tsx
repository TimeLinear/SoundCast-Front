import { MouseEvent, SetStateAction, useState } from "react";
import "../pages/css/ModifyMusic.css"
import { initGenres, initMoods, initSong, Song } from "../type/SongType";
import axios from "axios";

const ModifyMusic = ({show, handleClose}:{show:boolean, handleClose:() => void}) =>{
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    
    const handleBackgroundClick = (event:MouseEvent) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    const moods = initMoods;
    const genres = initGenres;
    
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
    const [songImage, setSongImage] = useState<string | null>("images/song-image-default.png");
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
    const [songFileOriginName, setSongFileOriginName] = useState<string|undefined>(song.songFileOriginName);
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
        songFileOriginName

      }
      
      setSong(renewSong);

      //back으로 update된 song 전송 하는 코드 추가 

      axios.put(`http://localhost:8087/soundcast/updateSong/${song.songNo}`, song)
        .then((response) => alert("수정되었습니다.") )
        .catch(err => console.log(err))

    }


    return (
        <div className={showHideClassName} onClick={handleBackgroundClick}>
        <div className="modal-overlay" >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        
        <div className="modal-body">
          <div className="left-section">
            <div className="image-preview">
              {/* 커스텀 이미지 없을 경우 default 이미지 */}
              <label htmlFor="file-input" 
                className="image-label" >
              <img className="image-custom" 
                src={songImage === null ? "images/song-image-default.png" : songImage} 
                alt="Preview" />
              <input 
                type="file" 
                id="file-input" 
                accept="image/*" 
                onChange={handleFileChange}
                className="file-input" 
                alt="Preview" />
              </label>
            </div>
            
        <div className="music-file">
            <div className="file-upload">
              <label htmlFor="song-file-upload"
                className="file-upload-box">
              <p className="song-file-name">{songFileOriginName}</p>
              <input 
                type="file"
                id="song-file-upload"
                accept="mp3/*"
                onChange={handleSongFileChange}
                className="song-file-input"/>
              </label> 
            </div>
        </div>


            {/* <div className="audio-player">
              <button className="play-button">▶︎</button>
              <div className="progress-bar">
                <div className="progress"></div>
              </div>
            </div> */}
          </div>
          <div className="right-section">
          <div className="modal-header">
          <p>내 음원 수정하기</p>
          <button className="modal-close"  onClick={handleClose}>✕</button>
        </div>

              <div className="form-group">
                <label>제목</label>
                <input type="text" value={songTitle} onChange={(e)=>{setSongTitle(e.target.value)}} />
                </div>
                <div className="form-group">
                <label>제작자</label>
                <input type="text" value="박다온" readOnly />
                </div>

            <div className="form-group">
              <label>곡 설명</label>
              <input type="text" value={songDetail} 
                onChange={(e)=>{setSongDetail(e.target.value)}} 
                placeholder="곡 설명을 입력해주세요" />
            </div>
            <div className="form-group">
                <label>라이센스</label>
                <textarea 
                  value={songLicense}
                  onChange={(e)=>{setSongLicense(e.target.value)}}
                  placeholder="라이센스를 입력해주세요" rows={5} className="license-input" />
            </div>

            <div className="form-group">
              <label>장르를 선택해 주세요.</label>
              <div className="genre-options">
              {genres.map((genre) => (
                    <button
                        key={genre.genreNo}
                        className={`genre-option ${selectedGenre === genre.genreNo ? 'selected' : ''}`}
                        onClick={() => genreClickHandler(genre.genreNo)} // 장르 클릭 시 함수 호출
                    >
                        {genre.genreName}
                    </button>
                ))}
            </div>
            </div>

          
            <div className="form-group">
              <label>분위기를 선택해 주세요.</label>
              <div className="mood-options">
                {moods.map((mood) => (
                    <button
                        key={mood.moodNo}
                        className={`mood-option ${selectedMood === mood.moodNo ? 'selected' : ''}`}
                        onClick={() => moodClickHandler(mood.moodNo)} // 분위기 클릭 시 함수 호출
                    >
                        {mood.moodName}
                    </button>
                ))}
            </div>
            </div>
            <button className="submit-button"
              onClick={updateSong}>수정</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
    };
   

export default ModifyMusic;