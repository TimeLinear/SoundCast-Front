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


export type Props = {
	activeSongNo : number|null,
    setActiveSongNo : Dispatch<SetStateAction<number|null>>,
	activeSong : Song
};

export type Genre = {
    genreNo : number,
    genreName : string
}
export type Mood = {
    moodNo : number,
    moodName : string
}