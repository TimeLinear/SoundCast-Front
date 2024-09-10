import axios from "./CustomAxios";
import ffmpeg from "fluent-ffmpeg";


function getAudioDuration(filePath:string) {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) {
        return reject(err);
      }
      const duration = metadata.format.duration;
      resolve(duration);
    });
  });
}