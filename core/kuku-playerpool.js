const { AudioPlayer } = require("@discordjs/voice");

class AudioPlayerPool {
    constructor(){
        this.players = [];
    }
}

module.exports = AudioPlayerPool