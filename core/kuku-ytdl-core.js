const ytdl = require('ytdl-core');

module.exports = {
    downloadByUrl: async (url) => {
        const download = ytdl(url, { filter: 'audioonly' });
        return download;
    },
    downloadFile: async (url, format = 'mp3') =>{
        const download = format === 'mp3' ? this.downloadAudio(url) : ytdl(url);
        return download;
    },
}
