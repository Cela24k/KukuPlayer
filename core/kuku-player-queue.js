const AudioPlayer = require("./kuku-audioplayer");

class AudioPlayerQueue {
    static players = [];

    constructor() {
        if (this instanceof AudioPlayerQueue) {
            throw Error('A static class cannot be instantiated.');
        }
    }

    static play(song, guildId, channelId, voiceAdapter) {
        let found = false;
        try {

            for (const player of AudioPlayerQueue.players) {
                if (player.channelId === channelId) {
                    player.play(song);
                    found = true;
                }
            }
            if (!found) {
                const player = new AudioPlayer(channelId, guildId, voiceAdapter);
                AudioPlayerQueue.players.push(player);
                player.play(song);
            }
        } catch (error) {
            console.log('error... 😢');
        }
    }

    static pause(channelId) {
        for (const player of AudioPlayerQueue.players) {
            if (player.channelId === channelId) {
                return player.pause();
            }
        }
        return false;
    }

    static unpause(channelId) {
        for (const player of AudioPlayerQueue.players) {
            if (player.channelId === channelId) {
                return player.unpause();
            }
        }
        return false;
    }

    // TODO: togliere il player dall array di players
    static stop(channelId) {
        for (const player of AudioPlayerQueue.players) {
            if (player.channelId === channelId) {
                return player.stop();
            }
        }
    }
}

module.exports = AudioPlayerQueue