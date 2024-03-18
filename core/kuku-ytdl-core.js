const ytdl = require('ytdl-core');
const youtubedl = require('youtube-dl-exec');
const axios = require('axios');
const fs = require('fs');

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
        try {
            const download = ytdl(url , {
                filter: "audioonly",
                fmt: "mp3",
                highWaterMark: 1 << 62,
                liveBuffer: 1 << 62,
                dlChunkSize: 0, //disabling chunking is recommended in discord bot
                bitrate: 128,
                quality: "lowestaudio",
           });
            return download;
        } catch (error) {
            console.error('Error during download:', error);
            throw error;
        }
    },
}
