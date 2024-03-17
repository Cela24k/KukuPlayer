const { createAudioPlayer, getVoiceConnection, NoSubscriberBehavior, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');

class AudioPlayer {
    constructor(channelId, guildId, voiceAdapter) {
        this.channelId = channelId;
        this.guildId = guildId;
        this.isPlaying = false;
        this.queue = [];
        this.player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        try {
            this.connection = getVoiceConnection(guildId, channelId);
            if (!this.connection) {
                this.connection = joinVoiceChannel({
                    channelId: channelId,
                    guildId: guildId,
                    adapterCreator: voiceAdapter,
                })
            }
            // qui invece subscribiamo l'audio player per farlo riprodurre nel canale
            this.connection.subscribe(this.player);
            this.player.on(AudioPlayerStatus.Idle, () => {
                if (this.queue.length != 0) {
                    console.log('ciao');
                    this.player.play(this.queue.pop());
                }
                else {
                    this.isPlaying = false
                }
            });
        }
        catch (error) {
            this.isPlaying = false;
            throw error;
        }
    }

    // TODO lasciare solo la song come parametro spostando la connessione nel costruttore del player, in modo da poi invocare this.play a riga 15, senza causare cadute della connessione
    play(song) {
        try {
            const audioResource = createAudioResource(song);
            // TODO catchare eventuali errori della play
            if (this.isPlaying) {
                this.queue.push(audioResource);
            }
            else {
                this.player.play(audioResource);
                this.isPlaying = true;
            }
        }
        catch (error) {
            this.isPlaying = false;
            throw error;
        }
    }

    pause() {
        try {
            if (this.player.state.status === 'playing') {
                const response = this.player.pause(true);
                this.isPlaying = false;
                return response;
            }
        }
        catch (error) {
            throw error;
        }
        // TODO handling se non sta riproducendo
    }

    unpause() {
        if (this.player.state.status === 'paused') {
            const response = this.player.unpause();
            this.isPlaying = true;
            return response;
        }
        // TODO handling se non è paused
    }

    stop() {
        if (this.player.state.status === 'playing') {
            this.isPlaying = false;
            this.connection.destroy();
        }
        //TODO handling se non e playing
    }
}
module.exports = AudioPlayer
