const AudioPlayer = require("./kuku-audioplayer");

class AudioPlayerPool {
    static players = [];
    
    constructor() {
        if (this instanceof AudioPlayerPool) {
            throw Error('A static class cannot be instantiated.');
        }
    }

    static play(song, guildId, channelId, voiceAdapter) {
        let found = false;
        for (const player of AudioPlayerPool.players) {
            if (player.channelId === channelId) {
                player.play(song, guildId, channelId, voiceAdapter);
                found = true;
            }
        }
        if (!found) {
            const player = new AudioPlayer(channelId);
            AudioPlayerPool.players.push(player);
            player.play(song, guildId, channelId, voiceAdapter);
        }
    }

    static pause(channelId) {
        for (const player of AudioPlayerPool.players) {
            if (player.channelId === channelId) {
                return player.pause();
            }
        }
        return false;
    }

    static unpause(channelId) {
        for (const player of AudioPlayerPool.players) {
            if (player.channelId === channelId) {
                return player.unpause();
            }
        }
        return false;
    }

    // TODO: togliere il player dall array di players
    static stop(channelId) {
        for (const player of AudioPlayerPool.players) {
            if (player.channelId === channelId) {
                return player.stop();
            }
        }
    }
}

module.exports = AudioPlayerPool