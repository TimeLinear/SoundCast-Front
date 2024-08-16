import { ChangeEvent, MouseEvent, SetStateAction, useState } from "react";

const UploadMusic = ({
  show,
  handleClose,
}: {
  show: boolean;
  handleClose: () => void;
}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const handleBackgroundClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };
  // 장르클릭 핸들러
  const [selectedGenre, setSelectedGenre] = useState("Rock");

  const genres = [
    "Rock",
    "Electronic",
    "Hip-Hop",
    "Jazz",
    "Classical",
    "Sound Track",
    "Pop",
    "R&B/Soul",
  ];
  //genre 속성 정의해야함 우선 string으로
  const genreClickHandler = (genre: SetStateAction<string>) => {
    setSelectedGenre(genre);
  };

  // 분위기 클릭 핸들러
  const [selectedMood, setSelectedMood] = useState("Gloomy");

  const moods = [
    "Gloomy",
    "Dreamer",
    "Dark",
    "Angry",
    "Classical",
    "Sound Track",
    "Pop",
    "R&B/Soul",
  ];

  const moodClickHandler = (mood: SetStateAction<string>) => {
    setSelectedMood(mood);
  };

  const [songFile, setSongFile] = useState('');

  const onFileChange = (e:ChangeEvent<HTMLInputElement>) => {
    const fileName = e.target.value;

    setSongFile(fileName);
  }

  return (
    <div className={showHideClassName} onClick={handleBackgroundClick}>
      <div className="modal-overlay">
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-body">
            <div className="left-section">
              <div className="image-preview" style={{display:"flex", justifyContent:"center", alignItems:"center", position:"relative"}}>
                <img src={songFile ? songFile : "/images/music/song-image.png"} alt="Preview"/>
                {!songFile && <img src="/images/music/file-upload-icon-white.png" 
                  style={{position:"absolute", left:"50%", top:"50%", transform:"translate(-50%, -50%)", width:"100px", height:"100px"}}/>}
              </div>

              <div className="music-filename">
                <div className="filename" style={{backgroundColor:"#AE9BF2", height:"50px", width:"250px", borderRadius:"10px"}}>
                  <input type="file" accept="image/*" id="songFile" onChange={onFileChange} hidden/>
                  <label htmlFor="songFile" 
                    style={{height:"100%", font:"bold 24px Inter", margin:"0", lineHeight:"170%", color:"white"}}>
                        {songFile ? songFile : <img src="/images/music/file-upload-icon.png" style={{height:"100%"}} alt="업로드 아이콘"></img>}
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
                <p>내 음원 업로드하기</p>
                <button className="modal-close" onClick={handleClose}>
                  ✕
                </button>
              </div>

              <div className="form-container" style={{overflowY:"auto"}}>
                <div className="form-group">
                  <label>제목</label>
                  <input type="text" placeholder="곡 제목을 입력해주세요" />
                </div>
                <div className="form-group">
                  <label>제작자</label>
                  <input type="text" placeholder="곡 제작자를 입력해주세요" />
                </div>

                <div className="form-group">
                  <label>곡 설명</label>
                  <input type="text" placeholder="곡 설명을 입력해주세요" />
                </div>
                <div className="form-group">
                  <label>라이센스</label>
                  <textarea
                    placeholder="라이센스를 입력해주세요"
                    rows={5}
                    className="license-input"
                  />
                </div>

                <div className="form-group">
                  <label>장르를 선택해 주세요.</label>
                  <div className="genre-options">
                    {genres.map((genre) => (
                      <button
                        key={genre}
                        className={`genre-option ${selectedGenre === genre ? "selected" : ""
                          }`}
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
                        className={`mood-option ${selectedMood === mood ? "selected" : ""
                          }`}
                        onClick={() => moodClickHandler(mood)} // 분위기 클릭 시 함수 호출
                      >
                        {mood}
                      </button>
                    ))}
                  </div>
                  <div className="form-group">
                    <label>업로드 이용약관</label>
                    <textarea
                      rows={5}
                      className="agreement"
                      readOnly
                      value={`제1조 [목적]
이 약관은 ㈜뮤직플랫(이하 “회사”)와 “이용자” 간에 “회사”가 제공하는 콘텐츠 서비스인 사운드 캐스트 및 제반 서비스를 이용함에 있어 “회사”와 “이용자” 간의 권리, 의무에 관한 사항과 기타 필요한 사항을 규정하는 것을 목적으로 합니다.

제2조 (정의)
① “서비스”란 음원을 회원에게 배포하기 위해 회사에서 제공하는 홈페이지를 포함한 제반 서비스를 의미합니다.
② “이용자”라 함은 “회사”가 제공하는 “서비스”에 유선 또는 무선 인터넷 등의 수단으로 접속하여 이 약관에 따라 “회사”가 제공하는 “콘텐츠” 및 제반 서비스를 이용하는 “회원” 및 “비회원”을 말합니다.
③ “음원”이란 회사에서 제공하는, 회원이 개인적으로 사용할 수 있는 라이브러리 음원을 의미합니다.
④ “영상이모티콘”이란 회사에서 제작, 제공하는 영상편집 소스(MP4, GIF)파일을 의미합니다.
⑤ “콘텐츠”란 셀바이뮤직에서 제공하는 모든 음원 및 영상이모티콘을 의미합니다.`}
                    />
                  </div>
                </div>
                <button className="submit-button">수정</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMusic;
