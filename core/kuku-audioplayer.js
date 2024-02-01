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
            this.player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Pause,
                },
            });
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
        // TODO catchare eventuali errori
        player.play(audioResource);
        console.log(player)
    }

    static pause(){
        const player = this.getPlayer();
        if(player){
            console.log(player.state.status === 'playing')
            console.log(player)
            const response = player.pause(true)
            return response;
        }
    }
}
module.exports = AudioPlayer