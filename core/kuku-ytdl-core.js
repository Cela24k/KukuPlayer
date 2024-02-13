const ytdl = require('ytdl-core');
const youtubedl = require('youtube-dl-exec')
const axios = require('axios')
const fs = require('fs')

module.exports = {
    downloadByUrl: async (url) => {
        try {
            let download = await youtubedl(url, {
                dumpSingleJson: true,
                extractAudio: true,
                audioFormat: 'wav',
                f: 'ba'
            })
            const audioUrl = download.url;
            const response = await axios.get(audioUrl, { responseType: 'stream' });
            return response.data;
        } catch (error) {
            console.error('Error during download:', error);
            throw error;
        }
    },
    downloadFile: async (url, format = 'mp3') => {
        const download = format === 'mp3' ? this.downloadAudio(url) : ytdl(url);
        return download;
    },
}
