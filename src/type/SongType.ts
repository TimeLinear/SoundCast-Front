import { Dispatch, SetStateAction } from 'react';

export type Song = {
    songNo: number; // 음원 번호
	songMemberNo: number; // 업로더 회원 번호
	songMoodNo: number; // 음원 분위기 번호
	songGenreNo: number; // 음원 장르 번호
	songImageNo: number; // 음원 커버 이미지 번호
	songTitle: string; // 음원명(유저가 입력)
	songLicense : string|null; // 음원 출처(유저가 입력)
	songDetail: string|null; // 음원 상세(유저가 입력)
	
	songGenreName? : string;
	songMoodName?: string


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
	songMoodNo: 5, // 음원 분위기 번호
	songGenreNo: 3, // 음원 장르 번호
	songImageNo: 0, // 음원 커버 이미지 번호
	// songFileNo: 0, // 음원 파일 번호
	songTitle: 'title', // 음원명(유저가 입력)
	songLicense : 'license', // 음원 출처(유저가 입력)
	songDetail: 'detail', // 음원 상세(유저가 입력)

	songGenreName : 'Rock',
	songMoodName : 'Happy',

	songFile: {
		songFileNo: 0, // 음원 파일 번호
		songPathName: , // 여기부터 고쳐야함
		songFileChangeName: string,
		songFileOriginName: string
	}
	// songFileOriginName : '우주여행.mp3'

}

export const initSongList: Song[] = [
	{songNo: 1, songMemberNo: 0, songTitle: 'song1', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: null},
	{songNo: 2, songMemberNo: 0, songTitle: 'song2', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스2'},
	{songNo: 3, songMemberNo: 0, songTitle: 'song3', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: null},
	{songNo: 4, songMemberNo: 0, songTitle: 'song4', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스4'},
	{songNo: 5, songMemberNo: 0, songTitle: 'song5', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스5'},
	{songNo: 6, songMemberNo: 0, songTitle: 'song6', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스6'},
	{songNo: 7, songMemberNo: 0, songTitle: 'song7', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스7'},
	{songNo: 8, songMemberNo: 0, songTitle: 'song8', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스8'},
	{songNo: 9, songMemberNo: 0, songTitle: 'song9', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: null},
	{songNo: 10, songMemberNo: 0, songTitle: 'song10', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스10'},
	{songNo: 11, songMemberNo: 0, songTitle: 'song11', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: null},
	{songNo: 12, songMemberNo: 0, songTitle: 'song12', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스12'},
	{songNo: 13, songMemberNo: 0, songTitle: 'song13', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: null},
	{songNo: 14, songMemberNo: 0, songTitle: 'song14', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스14'},
	{songNo: 15, songMemberNo: 0, songTitle: 'song15', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스15'},
	{songNo: 16, songMemberNo: 0, songTitle: 'song16', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스16'},
	{songNo: 17, songMemberNo: 0, songTitle: 'song17', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스17'},
	{songNo: 18, songMemberNo: 0, songTitle: 'song18', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스18'},
	{songNo: 19, songMemberNo: 0, songTitle: 'song19', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스19'},
	{songNo: 20, songMemberNo: 0, songTitle: 'song20', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스20'},
	{songNo: 21, songMemberNo: 0, songTitle: 'song21', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: null},
	{songNo: 22, songMemberNo: 0, songTitle: 'song22', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스22'},
	{songNo: 23, songMemberNo: 0, songTitle: 'song23', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: null},
	{songNo: 24, songMemberNo: 0, songTitle: 'song24', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스24'},
	{songNo: 25, songMemberNo: 0, songTitle: 'song25', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스25'},
	{songNo: 26, songMemberNo: 0, songTitle: 'song26', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스26'},
	{songNo: 27, songMemberNo: 0, songTitle: 'song27', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스27'},
	{songNo: 28, songMemberNo: 0, songTitle: 'song28', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스28'},
	{songNo: 29, songMemberNo: 0, songTitle: 'song29', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스29'},
	{songNo: 30, songMemberNo: 0, songTitle: 'song30', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스30'},
	{songNo: 31, songMemberNo: 0, songTitle: 'song31', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: null},
	{songNo: 32, songMemberNo: 0, songTitle: 'song32', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스32'},
	{songNo: 33, songMemberNo: 0, songTitle: 'song33', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: null},
	{songNo: 34, songMemberNo: 0, songTitle: 'song34', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스34'},
	{songNo: 35, songMemberNo: 0, songTitle: 'song35', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스35'},
	{songNo: 36, songMemberNo: 0, songTitle: 'song36', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스36'},
	{songNo: 37, songMemberNo: 0, songTitle: 'song37', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스37'},
	{songNo: 38, songMemberNo: 0, songTitle: 'song38', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스38'},
	{songNo: 39, songMemberNo: 0, songTitle: 'song39', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스39'},
	{songNo: 40, songMemberNo: 0, songTitle: 'song40', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스40'},
	{songNo: 41, songMemberNo: 0, songTitle: 'song41', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: null},
	{songNo: 42, songMemberNo: 0, songTitle: 'song42', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스42'},
	{songNo: 43, songMemberNo: 0, songTitle: 'song43', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: null},
	{songNo: 44, songMemberNo: 0, songTitle: 'song44', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스44'},
	{songNo: 45, songMemberNo: 0, songTitle: 'song45', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스45'},
	{songNo: 46, songMemberNo: 0, songTitle: 'song46', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스46'},
	{songNo: 47, songMemberNo: 0, songTitle: 'song47', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스47'},
	{songNo: 48, songMemberNo: 0, songTitle: 'song48', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스48'},
	{songNo: 49, songMemberNo: 0, songTitle: 'song49', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스49'},
	{songNo: 50, songMemberNo: 0, songTitle: 'song50', songGenreNo: 1, songImageNo: 0, songFileNo: 1, songMoodNo: 1, songDetail: null, songLicense: '라이선스50'}
];

export type Props = {
	activeSongNo : number|null,
    setActiveSongNo : Dispatch<SetStateAction<number|null>>,
	songs : Song[]
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