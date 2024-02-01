const axios = require('axios')
const URL = 'https://www.youtube.com/watch?v='

async function fromKeywordToUrl(keyword) {
    console.log(keyword)

    const isLink = /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]+$/i.test(keyword);
    if (isLink)
        return keyword;
    
    const url = await axios.get(
        "https://www.googleapis.com/youtube/v3/search?key=" + process.env.GOOGLE_API_KEY + "&part=snippet&maxResult=4&q=" + keyword
    ).then((res) => {
        const video = res.data.items.find(item => item.id.kind === 'youtube#video')
        if (video) {
            return URL + video.id.videoId;
        } else
            return null;


    })

    return url;
}

module.exports = fromKeywordToUrl