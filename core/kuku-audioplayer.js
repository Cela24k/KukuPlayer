const { createAudioPlayer, getVoiceConnection, NoSubscriberBehavior, createAudioResource, joinVoiceChannel } = require('@discordjs/voice');

class AudioPlayer {
    constructor() {
        if (AudioPlayer._instance) {
            return AudioPlayer._instance;
        }
        AudioPlayer._instance = this;
        this.player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
    }

    static getPlayer() {
        if (!AudioPlayer._instance) {
            AudioPlayer._instance = this;
            this.player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });
            console.log(this.player)
        }
        return this.player
    }
    //in questo metodo creiamo l'audioresource da streammare, controlliamo se siamo gia in un voicechannel, e in caso lo facciamo joinare
    static play(song, guildId, channelId, voiceAdapter) {
        const audioResource = createAudioResource(song);
        let connection = getVoiceConnection(guildId, channelId);
        const player = this.getPlayer();
        if (!connection) {
            connection = joinVoiceChannel({
                channelId: channelId,
                guildId: guildId,
                adapterCreator: voiceAdapter,
            })
        }
        // qui invece subscribiamo l'audio player per farlo riprodurre nel canale
        connection.subscribe(player);
        // TODO catchare eventuali errori della play
        player.play(audioResource);
        console.log(player)
    }

    static pause() {
        const player = this.getPlayer();
        if (player.state.status === 'playing') {
            const response = player.pause(true)
            return response;
        }
        // TODO handling se non sta riproducendo
    }

    static unpause(){
        const player = this.getPlayer();
        if(player.state.status === 'paused'){
            const response = player.unpause();
            return response;
        }
        // TODO handling se non è paused
    }
}
module.exports = AudioPlayer
