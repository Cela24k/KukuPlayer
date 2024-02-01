const fs = require('fs');
const ytdl = require('ytdl-core');
const fromKeywordToUrl = require('./kuku-utils')


module.exports = {
    downloadAudio: async (url) => {
        const download = ytdl(url, { filter: 'audioonly' });
        return download;
    },
    downloadByKeyword: async (keyword) => {
        const url = await fromKeywordToUrl(keyword);
        const download = ytdl(url, { filter: 'audioonly' })
        return download;
    },
    downloadFile: async (url, format = 'mp3') =>{
        const download = format === 'mp3' ? this.downloadAudio(url) : ytdl(url);
        return download;
    },
}
