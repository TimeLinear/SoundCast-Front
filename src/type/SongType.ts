import { Dispatch, SetStateAction } from 'react';

export type Song = {
    songNo: number; // 음원 번호
	songMemberNo: number; // 업로더 회원 번호
	songMoodNo: number; // 음원 분위기 번호
	songGenreNo: number; // 음원 장르 번호
	// songImageNo: number; // 음원 커버 이미지 번호
	songTitle: string; // 음원명(유저가 입력)
	songLicense : string|null; // 음원 출처(유저가 입력)
	songDetail: string|null; // 음원 상세(유저가 입력)
	songPlaceNo: 0 | 1;

	songGenreName? : string;
	songMoodName?: string

	songImage: {
		songImageNo: number, // 음원 커버 이미지 번호
		songImagePathNo: number, // 음원 커버 이미지 경로 번호
		songImageName: string, // 음원 커버 이미지 파일명
		songImagePathName: string // 음원 커버 이미지 경로명
	}

	songFile: {
		songFileNo: number,
		songPathName: string,
		songFileChangeName: string,
		songFileOriginName: string
	}

	memberNickname?: string; // 업로더 닉네임 
};

export const initSong:Song = {
	songNo: 0, // 음원 번호
	songMemberNo: 0, // 업로더 회원 번호
	songMoodNo: 0, // 음원 분위기 번호
	songGenreNo: 0, // 음원 장르 번호
	// songImageNo: 0, // 음원 커버 이미지 번호
	// songFileNo: 0, // 음원 파일 번호
	songTitle: '', // 음원명(유저가 입력)
	songLicense : '', // 음원 출처(유저가 입력)
	songDetail: '', // 음원 상세(유저가 입력)
	songPlaceNo: 0,

	songGenreName : 'Rock',
	songMoodName : 'Happy',

	songImage: {
		songImageNo: 0, // 음원 커버 이미지 번호
		songImagePathNo: 0, // 음원 커버 이미지 경로 번호
		songImageName: '', // 음원 커버 이미지 파일명
		songImagePathName: '' // 음원 커버 이미지 경로명
	},

	songFile: {
		songFileNo: 0, // 음원 파일 번호
		songPathName: "", // 여기부터 고쳐야함
		songFileChangeName: "",
		songFileOriginName: ""
	}
	// songFileOriginName : '우주여행.mp3'

}

export const initSongList: Song[] = [
	{songNo: 1, songMemberNo: 1, songTitle: 'song1', songGenreNo: 1, songImage: { songImageNo: 1, songImagePathNo: 1, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 1, songPathName: "music/ofiicial/", songFileChangeName: "song1", songFileOriginName: "originsong1"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: ''},
	{songNo: 2, songMemberNo: 2, songTitle: 'song2', songGenreNo: 1, songImage: { songImageNo: 2, songImagePathNo: 2, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 2, songPathName: "music/ofiicial/", songFileChangeName: "song2", songFileOriginName: "originsong2"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스2'},
	{songNo: 3, songMemberNo: 2, songTitle: 'song3', songGenreNo: 1, songImage: { songImageNo: 3, songImagePathNo: 3, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 3, songPathName: "music/ofiicial/", songFileChangeName: "song3", songFileOriginName: "originsong3"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: ''},
	{songNo: 4, songMemberNo: 3, songTitle: 'song4', songGenreNo: 1, songImage: { songImageNo: 4, songImagePathNo: 4, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 4, songPathName: "music/ofiicial/", songFileChangeName: "song4", songFileOriginName: "originsong4"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스4'},
	{songNo: 5, songMemberNo: 3, songTitle: 'song5', songGenreNo: 1, songImage: { songImageNo: 5, songImagePathNo: 5, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 5, songPathName: "music/ofiicial/", songFileChangeName: "song5", songFileOriginName: "originsong5"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스5'},
	{songNo: 6, songMemberNo: 3, songTitle: 'song6', songGenreNo: 1, songImage: { songImageNo: 6, songImagePathNo: 6, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 6, songPathName: "music/ofiicial/", songFileChangeName: "song6", songFileOriginName: "originsong6"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스6'},
	{songNo: 7, songMemberNo: 4, songTitle: 'song7', songGenreNo: 1, songImage: { songImageNo: 7, songImagePathNo: 7, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 7, songPathName: "music/ofiicial/", songFileChangeName: "song7", songFileOriginName: "originsong7"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스7'},
	{songNo: 8, songMemberNo: 4, songTitle: 'song8', songGenreNo: 1, songImage: { songImageNo: 8, songImagePathNo: 8, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 8, songPathName: "music/ofiicial/", songFileChangeName: "song8", songFileOriginName: "originsong8"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스8'},
	{songNo: 9, songMemberNo: 4, songTitle: 'song9', songGenreNo: 1, songImage: { songImageNo: 9, songImagePathNo: 9, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 9, songPathName: "music/ofiicial/", songFileChangeName: "song9", songFileOriginName: "originsong9"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: ''},
	{songNo: 10, songMemberNo: 4, songTitle: 'song10', songGenreNo: 1, songImage: { songImageNo: 10, songImagePathNo: 10, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 10, songPathName: "music/ofiicial/", songFileChangeName: "song10", songFileOriginName: "originsong10"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스10'},
	{songNo: 11, songMemberNo: 5, songTitle: 'song11', songGenreNo: 1, songImage: { songImageNo: 11, songImagePathNo: 11, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 11, songPathName: "music/ofiicial/", songFileChangeName: "song11", songFileOriginName: "originsong11"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: ''},
	{songNo: 12, songMemberNo: 5, songTitle: 'song12', songGenreNo: 1, songImage: { songImageNo: 12, songImagePathNo: 12, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 12, songPathName: "music/ofiicial/", songFileChangeName: "song12", songFileOriginName: "originsong12"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스12'},
	{songNo: 13, songMemberNo: 5, songTitle: 'song13', songGenreNo: 1, songImage: { songImageNo: 13, songImagePathNo: 13, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 13, songPathName: "music/ofiicial/", songFileChangeName: "song13", songFileOriginName: "originsong13"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: ''},
	{songNo: 14, songMemberNo: 5, songTitle: 'song14', songGenreNo: 1, songImage: { songImageNo: 14, songImagePathNo: 14, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 14, songPathName: "music/ofiicial/", songFileChangeName: "song14", songFileOriginName: "originsong14"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스14'},
	{songNo: 15, songMemberNo: 5, songTitle: 'song15', songGenreNo: 1, songImage: { songImageNo: 15, songImagePathNo: 15, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 15, songPathName: "music/ofiicial/", songFileChangeName: "song15", songFileOriginName: "originsong15"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스15'},
	{songNo: 16, songMemberNo: 6, songTitle: 'song16', songGenreNo: 1, songImage: { songImageNo: 16, songImagePathNo: 16, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 16, songPathName: "music/ofiicial/", songFileChangeName: "song16", songFileOriginName: "originsong16"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스16'},
	{songNo: 17, songMemberNo: 6, songTitle: 'song17', songGenreNo: 1, songImage: { songImageNo: 17, songImagePathNo: 17, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 17, songPathName: "music/ofiicial/", songFileChangeName: "song17", songFileOriginName: "originsong17"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스17'},
	{songNo: 18, songMemberNo: 6, songTitle: 'song18', songGenreNo: 1, songImage: { songImageNo: 18, songImagePathNo: 18, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 18, songPathName: "music/ofiicial/", songFileChangeName: "song18", songFileOriginName: "originsong18"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스18'},
	{songNo: 19, songMemberNo: 6, songTitle: 'song19', songGenreNo: 1, songImage: { songImageNo: 19, songImagePathNo: 19, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 19, songPathName: "music/ofiicial/", songFileChangeName: "song19", songFileOriginName: "originsong19"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스19'},
	{songNo: 20, songMemberNo: 6, songTitle: 'song20', songGenreNo: 1, songImage: { songImageNo: 20, songImagePathNo: 20, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 20, songPathName: "music/ofiicial/", songFileChangeName: "song20", songFileOriginName: "originsong20"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스20'},
	{songNo: 21, songMemberNo: 6, songTitle: 'song21', songGenreNo: 1, songImage: { songImageNo: 21, songImagePathNo: 21, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 21, songPathName: "music/ofiicial/", songFileChangeName: "song21", songFileOriginName: "originsong21"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: ''},
	{songNo: 22, songMemberNo: 7, songTitle: 'song22', songGenreNo: 1, songImage: { songImageNo: 22, songImagePathNo: 22, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 22, songPathName: "music/ofiicial/", songFileChangeName: "song22", songFileOriginName: "originsong22"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스22'},
	{songNo: 23, songMemberNo: 7, songTitle: 'song23', songGenreNo: 1, songImage: { songImageNo: 23, songImagePathNo: 23, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 23, songPathName: "music/ofiicial/", songFileChangeName: "song23", songFileOriginName: "originsong23"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: ''},
	{songNo: 24, songMemberNo: 7, songTitle: 'song24', songGenreNo: 1, songImage: { songImageNo: 24, songImagePathNo: 24, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 24, songPathName: "music/ofiicial/", songFileChangeName: "song24", songFileOriginName: "originsong24"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스24'},
	{songNo: 25, songMemberNo: 7, songTitle: 'song25', songGenreNo: 1, songImage: { songImageNo: 25, songImagePathNo: 25, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 25, songPathName: "music/ofiicial/", songFileChangeName: "song25", songFileOriginName: "originsong25"}, songMoodNo: 1, songDetail: '', songPlaceNo: 0,  songLicense: '라이선스25'},
	{songNo: 26, songMemberNo: 7, songTitle: 'song26', songGenreNo: 1, songImage: { songImageNo: 26, songImagePathNo: 26, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 26, songPathName: "music/unofiicial/", songFileChangeName: "song26", songFileOriginName: "originsong26"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스26'},
	{songNo: 27, songMemberNo: 7, songTitle: 'song27', songGenreNo: 1, songImage: { songImageNo: 27, songImagePathNo: 27, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 27, songPathName: "music/unofiicial/", songFileChangeName: "song27", songFileOriginName: "originsong27"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스27'},
	{songNo: 28, songMemberNo: 7, songTitle: 'song28', songGenreNo: 1, songImage: { songImageNo: 28, songImagePathNo: 28, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 28, songPathName: "music/unofiicial/", songFileChangeName: "song28", songFileOriginName: "originsong28"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스28'},
	{songNo: 29, songMemberNo: 8, songTitle: 'song29', songGenreNo: 1, songImage: { songImageNo: 29, songImagePathNo: 29, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 29, songPathName: "music/unofiicial/", songFileChangeName: "song29", songFileOriginName: "originsong29"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스29'},
	{songNo: 30, songMemberNo: 8, songTitle: 'song30', songGenreNo: 1, songImage: { songImageNo: 30, songImagePathNo: 30, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 30, songPathName: "music/unofiicial/", songFileChangeName: "song30", songFileOriginName: "originsong30"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스30'},
	{songNo: 31, songMemberNo: 8, songTitle: 'song31', songGenreNo: 1, songImage: { songImageNo: 31, songImagePathNo: 31, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 31, songPathName: "music/unofiicial/", songFileChangeName: "song31", songFileOriginName: "originsong31"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: ''},
	{songNo: 32, songMemberNo: 8, songTitle: 'song32', songGenreNo: 1, songImage: { songImageNo: 32, songImagePathNo: 32, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 32, songPathName: "music/unofiicial/", songFileChangeName: "song32", songFileOriginName: "originsong32"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스32'},
	{songNo: 33, songMemberNo: 8, songTitle: 'song33', songGenreNo: 1, songImage: { songImageNo: 33, songImagePathNo: 33, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 33, songPathName: "music/unofiicial/", songFileChangeName: "song33", songFileOriginName: "originsong33"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: ''},
	{songNo: 34, songMemberNo: 8, songTitle: 'song34', songGenreNo: 1, songImage: { songImageNo: 34, songImagePathNo: 34, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 34, songPathName: "music/unofiicial/", songFileChangeName: "song34", songFileOriginName: "originsong34"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스34'},
	{songNo: 35, songMemberNo: 8, songTitle: 'song35', songGenreNo: 1, songImage: { songImageNo: 35, songImagePathNo: 35, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 35, songPathName: "music/unofiicial/", songFileChangeName: "song35", songFileOriginName: "originsong35"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스35'},
	{songNo: 36, songMemberNo: 8, songTitle: 'song36', songGenreNo: 1, songImage: { songImageNo: 36, songImagePathNo: 36, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 36, songPathName: "music/unofiicial/", songFileChangeName: "song36", songFileOriginName: "originsong36"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스36'},
	{songNo: 37, songMemberNo: 9, songTitle: 'song37', songGenreNo: 1, songImage: { songImageNo: 37, songImagePathNo: 37, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 37, songPathName: "music/unofiicial/", songFileChangeName: "song37", songFileOriginName: "originsong37"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스37'},
	{songNo: 38, songMemberNo: 9, songTitle: 'song38', songGenreNo: 1, songImage: { songImageNo: 38, songImagePathNo: 38, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 38, songPathName: "music/unofiicial/", songFileChangeName: "song38", songFileOriginName: "originsong38"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스38'},
	{songNo: 39, songMemberNo: 9, songTitle: 'song39', songGenreNo: 1, songImage: { songImageNo: 39, songImagePathNo: 39, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 39, songPathName: "music/unofiicial/", songFileChangeName: "song39", songFileOriginName: "originsong39"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스39'},
	{songNo: 40, songMemberNo: 9, songTitle: 'song40', songGenreNo: 1, songImage: { songImageNo: 40, songImagePathNo: 40, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 40, songPathName: "music/unofiicial/", songFileChangeName: "song40", songFileOriginName: "originsong40"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스40'},
	{songNo: 41, songMemberNo: 9, songTitle: 'song41', songGenreNo: 1, songImage: { songImageNo: 41, songImagePathNo: 41, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 41, songPathName: "music/unofiicial/", songFileChangeName: "song41", songFileOriginName: "originsong41"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: ''},
	{songNo: 42, songMemberNo: 9, songTitle: 'song42', songGenreNo: 1, songImage: { songImageNo: 42, songImagePathNo: 42, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 42, songPathName: "music/unofiicial/", songFileChangeName: "song42", songFileOriginName: "originsong42"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스42'},
	{songNo: 43, songMemberNo: 9, songTitle: 'song43', songGenreNo: 1, songImage: { songImageNo: 43, songImagePathNo: 43, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 43, songPathName: "music/unofiicial/", songFileChangeName: "song43", songFileOriginName: "originsong43"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: ''},
	{songNo: 44, songMemberNo: 9, songTitle: 'song44', songGenreNo: 1, songImage: { songImageNo: 44, songImagePathNo: 44, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 44, songPathName: "music/unofiicial/", songFileChangeName: "song44", songFileOriginName: "originsong44"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스44'},
	{songNo: 45, songMemberNo: 9, songTitle: 'song45', songGenreNo: 1, songImage: { songImageNo: 45, songImagePathNo: 45, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 45, songPathName: "music/unofiicial/", songFileChangeName: "song45", songFileOriginName: "originsong45"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스45'},
	{songNo: 46, songMemberNo: 9, songTitle: 'song46', songGenreNo: 1, songImage: { songImageNo: 46, songImagePathNo: 46, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 46, songPathName: "music/unofiicial/", songFileChangeName: "song46", songFileOriginName: "originsong46"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스46'},
	{songNo: 47, songMemberNo: 10, songTitle: 'song47', songGenreNo: 1, songImage: { songImageNo: 47, songImagePathNo: 47, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 47, songPathName: "music/unofiicial/", songFileChangeName: "song47", songFileOriginName: "originsong47"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스47'},
	{songNo: 48, songMemberNo: 10, songTitle: 'song48', songGenreNo: 1, songImage: { songImageNo: 48, songImagePathNo: 48, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 48, songPathName: "music/unofiicial/", songFileChangeName: "song48", songFileOriginName: "originsong48"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스48'},
	{songNo: 49, songMemberNo: 10, songTitle: 'song49', songGenreNo: 1, songImage: { songImageNo: 49, songImagePathNo: 49, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 49, songPathName: "music/unofiicial/", songFileChangeName: "song49", songFileOriginName: "originsong49"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스49'},
	{songNo: 50, songMemberNo: 10, songTitle: 'song50', songGenreNo: 1, songImage: { songImageNo: 50, songImagePathNo: 50, songImageName: '', songImagePathName: 'images/song/cover/'}, songFile: { songFileNo: 50, songPathName: "music/unofiicial/", songFileChangeName: "song50", songFileOriginName: "originsong50"}, songMoodNo: 1, songDetail: '', songPlaceNo: 1,  songLicense: '라이선스50'}
];

export type Props = {
	activeSongNo : number|null,
    setActiveSongNo : Dispatch<SetStateAction<number|null>>,
	song : {list:Song[], currentSong:Song}
};

export type Genre = {
    genreNo : number,
    genreName : string
}
export type Mood = {
    moodNo : number,
    moodName : string
}

export const initGenres:Genre[] = [
	{genreNo : 1 , genreName: '장르1'},
    {genreNo : 2 , genreName: '장르2'},
    {genreNo : 3 , genreName: '장르3'},
    {genreNo : 4 , genreName: '장르4'},
    {genreNo : 5 , genreName: '장르5'},
    {genreNo : 6 , genreName: '장르6'},
    {genreNo : 7 , genreName: '장르7'},
    {genreNo : 8 , genreName: '장르8'},
    {genreNo : 9 , genreName: '장르9'},
    {genreNo : 10 , genreName: '장르10'}

]

export const initMoods:Mood[] = [
	{moodNo : 1 , moodName: 'Gloomy'},
    {moodNo : 2 , moodName: 'Dreamer'},
	{moodNo : 3 , moodName: 'Dark'},
    {moodNo : 4 , moodName: 'Angry'},
    {moodNo : 5 , moodName: 'Classical'},
    {moodNo : 6 , moodName: 'Sound Track'},   
    {moodNo : 7 , moodName: 'Pop'},   
    {moodNo : 8 , moodName: 'R&B/Soul'},   
    {moodNo : 9 , moodName: '분위기9'},   
    {moodNo : 10 , moodName: '분위기10'},   
    {moodNo : 11 , moodName: '분위기11'},   
    {moodNo : 12 , moodName: '분위기12'},   
    {moodNo : 13 , moodName: '분위기13'},   
    {moodNo : 14, moodName: '분위기14'}   

]

export interface Search {
	keyword: string,
	genre: number,
	mood: number,
	placeNo: number
}

export const initSearch:Search = {
	keyword: '',
	genre: 0,
	mood: 0,
	placeNo: 0
}