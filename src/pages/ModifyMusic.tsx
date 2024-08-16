import { MouseEvent, SetStateAction, useState } from "react";
import "../pages/css/ModifyMusic.css"

const ModifyMusic = ({show, handleClose}:{show:boolean, handleClose:() => void}) =>{
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    
    const handleBackgroundClick = (event:MouseEvent) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };
    // 장르클릭 핸들러 
    const [selectedGenre, setSelectedGenre] = useState('Rock');

    const genres = [
      'Rock',
      'Electronic',
      'Hip-Hop',
      'Jazz',
      'Classical',
      'Sound Track',
      'Pop',
      'R&B/Soul',
  ];
  //genre 속성 정의해야함 우선 string으로
    const genreClickHandler = (genre: SetStateAction<string>) =>{
      setSelectedGenre(genre)
    };

    // 분위기 클릭 핸들러
    const [selectedMood, setSelectedMood] = useState('Gloomy');

    const moods =[
      'Gloomy',
      'Dreamer',
      'Dark',
      'Angry',
      'Classical',
      'Sound Track',
      'Pop',
      'R&B/Soul',
    ]

    const moodClickHandler = (mood: SetStateAction<string>) =>{
      setSelectedMood(mood)
    };



    return (
        <div className={showHideClassName} onClick={handleBackgroundClick}>
        <div className="modal-overlay" >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        
        <div className="modal-body">
          <div className="left-section">
            <div className="image-preview">
              <img src="images/song-image-custom.png" alt="Preview" />
            </div>
            
        <div className="music-filename">
            <div className="filename">
                <p>우주여행.mp3</p>
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

            <div className="form-container">
            </div>
                <div className="form-group">
                <label>제목</label>
                <input type="text" value="우주여행" readOnly />
                </div>
                <div className="form-group">
                <label>제작자</label>
                <input type="text" value="박다온" readOnly />
                </div>

            <div className="form-group">
              <label>곡 설명</label>
              <input type="text" placeholder="곡 설명을 입력해주세요" />
            </div>
            <div className="form-group">
                <label>라이센스</label>
                <textarea placeholder="라이센스를 입력해주세요" rows={5} className="license-input" />
            </div>

            <div className="form-group">
              <label>장르를 선택해 주세요.</label>
              <div className="genre-options">
              {genres.map((genre) => (
                    <button
                        key={genre}
                        className={`genre-option ${selectedGenre === genre ? 'selected' : ''}`}
                        onClick={() => genreClickHandler(genre)} // 장르 클릭 시 함수 호출
                    >
                        {genre}
                    </button>
                ))}
            </div>
            </div>

          
            <div className="form-group">
              <label>분위기를 선택해 주세요.</label>
              <div className="mood-options">
                {moods.map((mood) => (
                    <button
                        key={mood}
                        className={`mood-option ${selectedMood === mood ? 'selected' : ''}`}
                        onClick={() => moodClickHandler(mood)} // 분위기 클릭 시 함수 호출
                    >
                        {mood}
                    </button>
                ))}
            </div>
            </div>
            <button className="submit-button">수정</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
    };
   

export default ModifyMusic;