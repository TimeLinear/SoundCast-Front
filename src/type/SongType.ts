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
};

export const initSong:Song = {
	songNo: 0, // 음원 번호
	songMemberNo: 0, // 업로더 회원 번호
	songMoodNo: 0, // 음원 분위기 번호
	songGenreNo: 0, // 음원 장르 번호
	songImageNo: 0, // 음원 커버 이미지 번호
	songFileNo: 0, // 음원 파일 번호
	songTitle: 'title', // 음원명(유저가 입력)
	songLicense : 'license', // 음원 출처(유저가 입력)
	songDetail: 'detail' // 음원 상세(유저가 입력)
}

export const initSongs:Song[] = [
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
    setActiveSongNo : Dispatch<SetStateAction<number|null>>
};

export type Genre = {
    genreNo : number,
    genreName : string
}
export type Mood = {
    moodNo : number,
    moodName : string
}