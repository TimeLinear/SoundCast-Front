import { AxiosRequestConfig } from 'axios';
import { Dispatch, SetStateAction } from 'react';

export type Song = {
    songNo: number; // 음원 번호
	songMemberNo: number; // 업로더 회원 번호
	songMoodNo: number; // 음원 분위기 번호
	songGenreNo: number; // 음원 장르 번호
	songImageNo: number; // 음원 커버 이미지 번호
	songFileNo: number; // 음원 파일 번호
	songTitle: string; // 음원명(유저가 입력)
	songLicense : string|null; // 음원 출처(유저가 입력)
	songDetail: string|null; // 음원 상세(유저가 입력)
	
	songGenreName? : string;
	songMoodName?: string
	songFileOriginName?:string
};

export const initSong:Song = {
	songNo: 0, // 음원 번호
	songMemberNo: 0, // 업로더 회원 번호
	songMoodNo: 5, // 음원 분위기 번호
	songGenreNo: 3, // 음원 장르 번호
	songImageNo: 0, // 음원 커버 이미지 번호
	songFileNo: 0, // 음원 파일 번호
	songTitle: 'title', // 음원명(유저가 입력)
	songLicense : 'license', // 음원 출처(유저가 입력)
	songDetail: 'detail', // 음원 상세(유저가 입력)

	songGenreName : 'Rock',
	songMoodName : 'Happy',
	songFileOriginName : '우주여행.mp3'

}

export const initSongList:Song[] = [
	{songNo: 1, songMemberNo : 0, songTitle : 'song1', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : null},
	{songNo: 2, songMemberNo : 0, songTitle : 'song2', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스2'},
	{songNo: 3, songMemberNo : 0, songTitle : 'song3', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : null},
	{songNo: 4, songMemberNo : 0, songTitle : 'song4', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스4'},
	{songNo: 5, songMemberNo : 0, songTitle : 'song5', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스5'},
	{songNo: 6, songMemberNo : 0, songTitle : 'song6', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스6'},
	{songNo: 7, songMemberNo : 0, songTitle : 'song7', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스7'},
	{songNo: 8, songMemberNo : 0, songTitle : 'song8', songGenreNo : 1, songImageNo : 0, songFileNo : 1, songMoodNo : 1, songDetail: null, songLicense : '라이선스8'},
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

export interface Search{
	keyword: string,
	genre: number,
	mood: number,
	placeNo: number
}

export const initSearch:Search = {
	keyword: "",
	genre: 0,
	mood: 0,
	placeNo: 0
}