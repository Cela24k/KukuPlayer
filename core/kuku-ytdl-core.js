const ytdl = require('ytdl-core');
const youtubedl = require('youtube-dl-exec')
const fs = require('fs')

module.exports = {
    downloadByUrl: async (url) => {

        const download = await youtubedl(url, {
            format: 'bestaudio',
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ['referer:youtube.com', 'user-agent:googlebot']
        })
        return download;
    },
    downloadFile: async (url, format = 'mp3') => {
        const download = format === 'mp3' ? this.downloadAudio(url) : ytdl(url);
        return download;
    },
}
