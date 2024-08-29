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
	songPlaceNo: 1 | 2;

	songGenreName? : string;
	songMoodName?: string

	songImage: {
		songImageNo: number,
		songImagePathNo?: number,
		songImageName: string,
		songImagePathName: string
	}

	songFile: {
		songFileNo: number,
		songFilePathNo: number,
		songFileSongPathName: string,
		songFileChangeName: string,
		songFileOriginName: string
	}

	memberNickname?: string, // 업로더 닉네임
	songDuration?: number
	
};

export const initSong:Song = {
	songNo: 0, // 음원 번호
	songMemberNo: 0, // 업로더 회원 번호
	songMoodNo: 5, // 음원 분위기 번호
	songGenreNo: 3, // 음원 장르 번호
	songTitle: '', // 음원명(유저가 입력)
	songLicense : '', // 음원 출처(유저가 입력)
	songDetail: '', // 음원 상세(유저가 입력)
	songPlaceNo: 2,

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
		songFilePathNo: 2,
		songFileSongPathName: 'songs/file/unofficial/',
		songFileChangeName: 'soundcast-2024083012000011111.png',
		songFileOriginName: ''
	},
	memberNickname: '',
	songDuration: 0
}

export const initSongList: Song[] = [
	{songNo: 1, songMemberNo: 1, songTitle: 'song1', songGenreNo: 1, songImage: {songImageNo: 1, songImagePathNo: 1, songImageName: 'song1.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 1, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011111.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: null},
	{songNo: 2, songMemberNo: 2, songTitle: 'song2', songGenreNo: 1, songImage: {songImageNo: 2, songImagePathNo: 1, songImageName: 'song2.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 2, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011112.png', songFileOriginName: 'song2' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스2'},
	{songNo: 3, songMemberNo: 2, songTitle: 'song3', songGenreNo: 1, songImage: {songImageNo: 3, songImagePathNo: 1, songImageName: 'song3.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 3, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011113.png', songFileOriginName: 'song3' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: null},
	{songNo: 4, songMemberNo: 3, songTitle: 'song4', songGenreNo: 1, songImage: {songImageNo: 4, songImagePathNo: 1, songImageName: 'song4.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 4, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011114.png', songFileOriginName: 'song4' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스4'},
	{songNo: 5, songMemberNo: 3, songTitle: 'song5', songGenreNo: 1, songImage: {songImageNo: 5, songImagePathNo: 1, songImageName: 'song5.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 5, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011115.png', songFileOriginName: 'song5' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스5'},
	{songNo: 6, songMemberNo: 3, songTitle: 'song6', songGenreNo: 1, songImage: {songImageNo: 6, songImagePathNo: 1, songImageName: 'song6.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 6, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011116.png', songFileOriginName: 'song6' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스6'},
	{songNo: 7, songMemberNo: 4, songTitle: 'song7', songGenreNo: 1, songImage: {songImageNo: 7, songImagePathNo: 1, songImageName: 'song7.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 7, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011117.png', songFileOriginName: 'song7' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스7'},
	{songNo: 8, songMemberNo: 4, songTitle: 'song8', songGenreNo: 1, songImage: {songImageNo: 8, songImagePathNo: 1, songImageName: 'song8.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 8, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011118.png', songFileOriginName: 'song8' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스8'},
	{songNo: 9, songMemberNo: 4, songTitle: 'song9', songGenreNo: 1, songImage: {songImageNo: 9, songImagePathNo: 1, songImageName: 'song9.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 9, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011119.png', songFileOriginName: 'song9' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: null},
	{songNo: 10, songMemberNo: 4, songTitle: 'song10', songGenreNo: 1, songImage: {songImageNo: 10, songImagePathNo: 1, songImageName: 'song10.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 10, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011120.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스10'},
	{songNo: 11, songMemberNo: 5, songTitle: 'song11', songGenreNo: 1, songImage: {songImageNo: 11, songImagePathNo: 1, songImageName: 'song11.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 11, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011121.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: null},
	{songNo: 12, songMemberNo: 5, songTitle: 'song12', songGenreNo: 1, songImage: {songImageNo: 12, songImagePathNo: 1, songImageName: 'song12.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 12, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011122.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스12'},
	{songNo: 13, songMemberNo: 5, songTitle: 'song13', songGenreNo: 1, songImage: {songImageNo: 13, songImagePathNo: 1, songImageName: 'song13.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 13, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011123.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: null},
	{songNo: 14, songMemberNo: 5, songTitle: 'song14', songGenreNo: 1, songImage: {songImageNo: 14, songImagePathNo: 1, songImageName: 'song14.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 14, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011124.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스14'},
	{songNo: 15, songMemberNo: 5, songTitle: 'song15', songGenreNo: 1, songImage: {songImageNo: 15, songImagePathNo: 1, songImageName: 'song15.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 15, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011125.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스15'},
	{songNo: 16, songMemberNo: 6, songTitle: 'song16', songGenreNo: 1, songImage: {songImageNo: 16, songImagePathNo: 1, songImageName: 'song16.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 16, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011126.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스16'},
	{songNo: 17, songMemberNo: 6, songTitle: 'song17', songGenreNo: 1, songImage: {songImageNo: 17, songImagePathNo: 1, songImageName: 'song17.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 17, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011127.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스17'},
	{songNo: 18, songMemberNo: 6, songTitle: 'song18', songGenreNo: 1, songImage: {songImageNo: 18, songImagePathNo: 1, songImageName: 'song18.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 18, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011128.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스18'},
	{songNo: 19, songMemberNo: 6, songTitle: 'song19', songGenreNo: 1, songImage: {songImageNo: 19, songImagePathNo: 1, songImageName: 'song19.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 19, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011129.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스19'},
	{songNo: 20, songMemberNo: 6, songTitle: 'song20', songGenreNo: 1, songImage: {songImageNo: 20, songImagePathNo: 1, songImageName: 'song20.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 20, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011130.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스20'},
	{songNo: 21, songMemberNo: 6, songTitle: 'song21', songGenreNo: 1, songImage: {songImageNo: 21, songImagePathNo: 1, songImageName: 'song21.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 21, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011131.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: null},
	{songNo: 22, songMemberNo: 7, songTitle: 'song22', songGenreNo: 1, songImage: {songImageNo: 22, songImagePathNo: 1, songImageName: 'song22.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 22, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011132.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스22'},
	{songNo: 23, songMemberNo: 7, songTitle: 'song23', songGenreNo: 1, songImage: {songImageNo: 23, songImagePathNo: 1, songImageName: 'song23.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 23, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011133.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: null},
	{songNo: 24, songMemberNo: 7, songTitle: 'song24', songGenreNo: 1, songImage: {songImageNo: 24, songImagePathNo: 1, songImageName: 'song24.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 24, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011134.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스24'},
	{songNo: 25, songMemberNo: 7, songTitle: 'song25', songGenreNo: 1, songImage: {songImageNo: 25, songImagePathNo: 1, songImageName: 'song25.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 25, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011135.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스25'},
	{songNo: 26, songMemberNo: 7, songTitle: 'song26', songGenreNo: 1, songImage: {songImageNo: 26, songImagePathNo: 1, songImageName: 'song26.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 26, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011136.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스26'},
	{songNo: 27, songMemberNo: 7, songTitle: 'song27', songGenreNo: 1, songImage: {songImageNo: 27, songImagePathNo: 1, songImageName: 'song27.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 27, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011137.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스27'},
	{songNo: 28, songMemberNo: 7, songTitle: 'song28', songGenreNo: 1, songImage: {songImageNo: 28, songImagePathNo: 1, songImageName: 'song28.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 28, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011138.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스28'},
	{songNo: 29, songMemberNo: 8, songTitle: 'song29', songGenreNo: 1, songImage: {songImageNo: 29, songImagePathNo: 1, songImageName: 'song29.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 29, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011139.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스29'},
	{songNo: 30, songMemberNo: 8, songTitle: 'song30', songGenreNo: 1, songImage: {songImageNo: 30, songImagePathNo: 1, songImageName: 'song30.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 30, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011140.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스30'},
	{songNo: 31, songMemberNo: 8, songTitle: 'song31', songGenreNo: 1, songImage: {songImageNo: 31, songImagePathNo: 1, songImageName: 'song31.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 31, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011141.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: null},
	{songNo: 32, songMemberNo: 8, songTitle: 'song32', songGenreNo: 1, songImage: {songImageNo: 32, songImagePathNo: 1, songImageName: 'song32.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 32, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011142.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스32'},
	{songNo: 33, songMemberNo: 8, songTitle: 'song33', songGenreNo: 1, songImage: {songImageNo: 33, songImagePathNo: 1, songImageName: 'song33.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 33, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011143.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: null},
	{songNo: 34, songMemberNo: 8, songTitle: 'song34', songGenreNo: 1, songImage: {songImageNo: 34, songImagePathNo: 1, songImageName: 'song34.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 34, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011144.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스34'},
	{songNo: 35, songMemberNo: 8, songTitle: 'song35', songGenreNo: 1, songImage: {songImageNo: 35, songImagePathNo: 1, songImageName: 'song35.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 35, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011145.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스35'},
	{songNo: 36, songMemberNo: 8, songTitle: 'song36', songGenreNo: 1, songImage: {songImageNo: 36, songImagePathNo: 1, songImageName: 'song36.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 36, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011146.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스36'},
	{songNo: 37, songMemberNo: 9, songTitle: 'song37', songGenreNo: 1, songImage: {songImageNo: 37, songImagePathNo: 1, songImageName: 'song37.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 37, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011147.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스37'},
	{songNo: 38, songMemberNo: 9, songTitle: 'song38', songGenreNo: 1, songImage: {songImageNo: 38, songImagePathNo: 1, songImageName: 'song38.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 38, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011148.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스38'},
	{songNo: 39, songMemberNo: 9, songTitle: 'song39', songGenreNo: 1, songImage: {songImageNo: 39, songImagePathNo: 1, songImageName: 'song39.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 39, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011149.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스39'},
	{songNo: 40, songMemberNo: 9, songTitle: 'song40', songGenreNo: 1, songImage: {songImageNo: 40, songImagePathNo: 1, songImageName: 'song40.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 40, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011150.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스40'},
	{songNo: 41, songMemberNo: 9, songTitle: 'song41', songGenreNo: 1, songImage: {songImageNo: 41, songImagePathNo: 1, songImageName: 'song41.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 41, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011151.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: null},
	{songNo: 42, songMemberNo: 9, songTitle: 'song42', songGenreNo: 1, songImage: {songImageNo: 42, songImagePathNo: 1, songImageName: 'song42.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 42, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011152.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스42'},
	{songNo: 43, songMemberNo: 9, songTitle: 'song43', songGenreNo: 1, songImage: {songImageNo: 43, songImagePathNo: 1, songImageName: 'song43.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 43, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011153.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: null},
	{songNo: 44, songMemberNo: 9, songTitle: 'song44', songGenreNo: 1, songImage: {songImageNo: 44, songImagePathNo: 1, songImageName: 'song44.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 44, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011154.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스44'},
	{songNo: 45, songMemberNo: 9, songTitle: 'song45', songGenreNo: 1, songImage: {songImageNo: 45, songImagePathNo: 1, songImageName: 'song45.png', songImagePathName: 'images/song/unofficial/cover/' }, songFile: {songFileNo: 45, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011155.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스45'},
	{songNo: 46, songMemberNo: 10, songTitle: 'song46', songGenreNo: 1, songImage: {songImageNo:46, songImagePathNo: 1, songImageName: 'song46.png', songImagePathName: 'images/song/unofficial/coverg' }, songFile: {songFileNo: 46, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011156.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스46'},
	{songNo: 47, songMemberNo: 10, songTitle: 'song47', songGenreNo: 1, songImage: {songImageNo:47, songImagePathNo: 1, songImageName: 'song47.png', songImagePathName: 'images/song/unofficial/coverg' }, songFile: {songFileNo: 47, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011157.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스47'},
	{songNo: 48, songMemberNo: 10, songTitle: 'song48', songGenreNo: 1, songImage: {songImageNo:48, songImagePathNo: 1, songImageName: 'song48.png', songImagePathName: 'images/song/unofficial/coverg' }, songFile: {songFileNo: 48, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011158.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스48'},
	{songNo: 49, songMemberNo: 10, songTitle: 'song49', songGenreNo: 1, songImage: {songImageNo:49, songImagePathNo: 1, songImageName: 'song49.png', songImagePathName: 'images/song/unofficial/coverg' }, songFile: {songFileNo: 49, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011159.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스49'},
	{songNo: 50, songMemberNo: 10, songTitle: 'song50', songGenreNo: 1, songImage: {songImageNo:50, songImagePathNo: 1, songImageName: 'song50.png', songImagePathName: 'images/song/unofficial/coverg' }, songFile: {songFileNo: 50, songFilePathNo: 2, songFileSongPathName: 'songs/file/unofficial/', songFileChangeName: 'soundcast-2024083012000011160.png', songFileOriginName: 'song1' }, songMoodNo: 1, songPlaceNo: 2, songDetail: null, songLicense: '라이선스50'}
];

export type Props = {
	activeSongNo : number|null,
    setActiveSongNo : Dispatch<SetStateAction<number|null>>,
	song : {list: Song[], currentSong:Song},
	searchSong : () => void
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