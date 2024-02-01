const fs = require('fs');
const ytdl = require('ytdl-core');
const fromKeywordToUrl = require('./kuku-utils')


module.exports = {
    downloadByUrl: async (url) => {
        const download = ytdl(url, { filter: 'audioonly' });
        return download;
    },
    downloadByKeyword: async (keyword) => {
        const url = await fromKeywordToUrl(keyword);
        const download = ytdl(url, { filter: 'audioonly' })
        return download;
    }

}
