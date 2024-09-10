import { ChangeEvent, FormEvent, MouseEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { Member } from "../type/memberType";
import axios from "../utils/CustomAxios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setPlaySong, setSongList } from "../features/songSlice";
import { useNavigate } from "react-router-dom";

const UploadMusic = ({
  show,
  handleClose,
  member
}: {
  show: boolean,
  handleClose: () => void
  member: Member
}) => {

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
    boxSizing: 'border-box'
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
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#FFFFFF",
    border: "0.5px solid #F0F0F0",
    borderRadius: "8px",
    padding: "0 10px",
    boxSizing: "border-box"
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
    width: '100%',
    height: 'auto',
    padding: '10px',
    border: '1px solid #CCCCCC',
    borderRadius: '8px',
    resize: 'none',
    boxSizing: 'border-box'
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
    width: '100%',
    height: 'auto',
    padding: '10px',
    border: '1px solid #CCCCCC',
    borderRadius: '8px',
    resize: 'none',
    boxSizing: 'border-box'
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

  const formData = new FormData();

  const handleBackgroundClick = (event: MouseEvent) => {
    handleClose();
    clearAll();
  };
  // 장르클릭 핸들러
  const [selectedGenre, setSelectedGenre] = useState(1);

  const song = useSelector((state: RootState) => state.song);

  const dispatch = useDispatch();

  const navi = useNavigate();

  const genres = song.genreList.filter((genre) => genre.genreNo > 0);

  const genreClickHandler = (genre: SetStateAction<number>) => {
    setSelectedGenre(genre);
  };

  // 분위기 클릭 핸들러
  const [selectedMood, setSelectedMood] = useState(1);

  const moods = song.moodList.filter((mood) => mood.moodNo > 0);

  const moodClickHandler = (mood: SetStateAction<number>) => {
    setSelectedMood(mood);
  };

  const [songFile, setSongFile] = useState<File>();
  const [showCoverFile, setShowCoverFile] = useState('');
  const [coverFile, setCoverFile] = useState<File>();
  const [duration, setDuration] = useState<number>(0);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setSongFile(file[0]);
      const audioUrl = URL.createObjectURL(file[0]);
      const audio = new Audio(audioUrl);
      audio.onloadedmetadata = () => {
        // 오디오의 총 재생 길이(초 단위) 얻기
        setDuration(audio.duration);
        // 메모리 해제
        URL.revokeObjectURL(audioUrl);
      };
    }
  }

  const onCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file && file.length > 0) {
      setCoverFile(file[0]);

      const reader = new FileReader();
      reader.onloadend = () => {
        reader.result && setShowCoverFile(reader.result.toString());
      }
      reader.readAsDataURL(file[0]);
    }
  }

  const [ishovered, setIsHovered] = useState('unhovered');

  const onUploadSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    songFile && formData.append("songFile", songFile);
    coverFile && formData.append("songImage", coverFile);

    const uploadSong = {
      songTitle: songInfo.songTitle,
      songMemberNo: songInfo.songMemberNo,
      songDetail: songInfo.songDetail,
      songLicense: songInfo.songLicense,
      songGenreNo: selectedGenre,
      songMoodNo: selectedMood,
      songDuration: duration
    }

    const songInfos = new Blob([JSON.stringify(uploadSong)], { type: 'application/json' });

    formData.append("song", songInfos);

    formData.forEach((item) => {
      console.log(item);
    })
    axios.post("http://localhost:8087/soundcast/song/unofficial/upload", formData)
      .then((res) => {
        // console.log(res);
        if (!res.data) {
          alert("음원 등록에 실패하였습니다");
          navi("/member/mypage");
          return;
        }

        const newSong = {
          songNo: res.data.songNo, // 음원 번호
          songMemberNo: res.data.songMemberNo, // 업로더 회원 번호
          songMoodNo: res.data.songMoodNo, // 음원 분위기 번호
          songGenreNo: res.data.songGenreNo, // 음원 장르 번호
          songTitle: res.data.songTitle, // 음원명(유저가 입력)
          songLicense: res.data.songLicense, // 음원 출처(유저가 입력)
          songDetail: res.data.songDetail, // 음원 상세(유저가 입력)
          songPlaceNo: res.data.songPlaceNo,

          songGenreName: res.data.songGenreName,
          songMoodName: res.data.songMoodName,

          songImage: {
            songImageNo: res.data.songImageNo, // 음원 커버 이미지 번호
            songImagePathNo: res.data.songImagePathNo, // 음원 커버 이미지 경로 번호
            songImageName: res.data.songImageName, // 음원 커버 이미지 파일명
            songImagePathName: res.data.songImagePathName // 음원 커버 이미지 경로명
          },

          songFile: {
            songFileNo: res.data.songFileNo, // 음원 파일 번호
            songFilePathNo: res.data.songFilePathNo,
            songFileSongPathName: res.data.songFileSongPathName,
            songFileChangeName: res.data.songFileChangeName,
            songFileOriginName: res.data.songFileOriginName
          },

          // songDuration: res.data.songDuration
        }
        dispatch(setSongList([...song.list, newSong]));
        dispatch(setPlaySong(newSong.songNo));
      })
      .finally(() => {
        handleClose();
        navi("/song/detail/" + song.currentSong.songNo);
      })
  }

  // 그외 텍스트 정보들
  const [songInfo, setSongInfo] = useState({
    songTitle: "",
    songMemberNo: member.memberNo,
    songDetail: "",
    songLicense: ""
  });

  const onChangeSongInfo = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setSongInfo((prev) => {
      return { ...prev, [name]: value };
    })
  }

  const clearAll = () => {
    setSongInfo({ songDetail: '', songLicense: '', songMemberNo: songInfo.songMemberNo, songTitle: '' });
    setShowCoverFile('');
    setCoverFile(undefined);
    setSongFile(undefined);
    setSelectedGenre(1);
    setSelectedMood(1);
  }

  const serverResourcePath = "http://localhost:8087/soundcast/resource/";

  return (
    <div style={showHideClassName} onClick={handleBackgroundClick}>
      <div style={modalOverlayStyle}>
        <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
          <div style={modalBodyStyle}>
            <div style={leftSectionStyle}>
              <div
                className="image-preview"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <input
                  type="file"
                  id="cover-file-upload"
                  name="songImage"
                  accept="image/*"
                  onChange={onCoverChange}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: "pointer"
                  }}
                  hidden />
                <label htmlFor="cover-file-upload" style={{ cursor: "pointer" }}>
                  <img
                    src={(showCoverFile ? showCoverFile : serverResourcePath + "public/song/song-image.png")}
                    style={showCoverFile ? imagePreviewStyle : { ...imagePreviewStyle, opacity: "0.3" }}
                    alt="Preview"
                  />
                </label>
                {!showCoverFile && (
                  <img
                    src={serverResourcePath + "public/song/file-upload-icon-white.png"}
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "60px",
                      height: "60px",
                    }}
                  />
                )}
              </div>

              <div className="music-file"
                style={{
                  width: "250px",
                  height: "70px"
                }}
              >
                <div className="file-upload"
                  onMouseOver={() => { setIsHovered('hovered') }}
                  onMouseLeave={() => { setIsHovered('unhovered') }}
                  style={ishovered === 'hovered' ? { ...fileUploadStyle, ...hoveredStyle } : { ...fileUploadStyle }}
                >
                  <label htmlFor="song-file-upload"
                    className="file-upload-box"
                    style={{
                      display: "block",
                      cursor: "pointer"
                    }}>
                    <p className="song-file-name">{songFile ? songFile.name : "음원 업로드"}</p>
                    <input
                      type="file"
                      id="song-file-upload"
                      name="songFile"
                      accept="audio/*"
                      onChange={onFileChange}
                      className="song-file-input"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer"
                      }} />
                  </label>
                </div>
              </div>
            </div>

            <div style={rightSectionStyle}>
              <div style={modalHeaderStyle}>
                <p style={modalHeaderTextStyle}>내 음원 업로드하기</p>
                <button style={modalCloseStyle} onClick={() => { handleClose(); clearAll(); }}>
                  ✕
                </button>
              </div>

              <div className="form-container" style={{ overflowY: "auto", textAlign: "start" }}>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>*제목</label>
                  <input
                    type="text"
                    name="songTitle"
                    placeholder="곡 제목을 입력해주세요"
                    style={textInputStyle}
                    value={songInfo.songTitle}
                    onChange={onChangeSongInfo}
                  />
                </div>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>*제작자</label>
                  <input
                    type="text"
                    style={textInputStyle}
                    value={member.nickName}
                    readOnly
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>곡 설명</label>
                  <input
                    type="text"
                    name="songDetail"
                    placeholder="곡 설명을 입력해주세요"
                    style={textInputStyle}
                    value={songInfo.songDetail}
                    onChange={onChangeSongInfo}
                  />
                </div>
                <div style={formGroupStyle}>
                  <label style={labelStyle}>라이센스</label>
                  <textarea
                    name="songLicense"
                    placeholder="라이센스를 입력해주세요"
                    rows={5}
                    style={licenseInputStyle}
                    value={songInfo.songLicense}
                    onChange={onChangeSongInfo}
                  />
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>*장르를 선택해 주세요.</label>
                  <div style={genreOptionsStyle}>
                    {genres.map((genre, index) => (
                      <button
                        key={genre.genreNo}
                        style={
                          selectedGenre === index + 1
                            ? { ...genreOptionStyle, ...genreOptionSelectedStyle }
                            : genreOptionStyle
                        }
                        onClick={() => genreClickHandler(index + 1)}
                      >
                        {genre.genreName}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={formGroupStyle}>
                  <label style={labelStyle}>*분위기를 선택해 주세요.</label>
                  <div style={genreOptionsStyle}>
                    {moods.map((mood, index) => (
                      <button
                        key={mood.moodNo}
                        style={
                          selectedMood === index + 1
                            ? { ...genreOptionStyle, ...genreOptionSelectedStyle }
                            : genreOptionStyle
                        }
                        onClick={() => moodClickHandler(index + 1)}
                      >
                        {mood.moodName}
                      </button>
                    ))}
                  </div>
                  <div style={{ ...formGroupStyle, marginTop: "40px" }}>
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
                <button style={submitButtonStyle} onClick={onUploadSubmit}>등록</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadMusic;