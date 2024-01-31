const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
    downloadByUrl: async (url) =>{
        const download = ytdl(url).pipe(fs.createWriteStream('video.mp4'));
        console.log(download);
        return download;
    }
} 
    