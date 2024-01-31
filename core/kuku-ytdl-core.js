const fs = require('fs');
const ytdl = require('ytdl-core');

module.exports = {
    downloadByUrl: async (url) => {
        const download = ytdl(url, { filter: 'audioonly' });
        return download;
    }
}
