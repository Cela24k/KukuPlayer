const { createAudioPlayer, getVoiceConnection, NoSubscriberBehavior, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');

class AudioPlayer {
    constructor(channelId) {
        this.channelId = channelId;
        this.isPlaying = false;
        this.queue = [];
        this.player = createAudioPlayer({
            behaviors: {
                noSubscriber: NoSubscriberBehavior.Pause,
            },
        });
        this.connection = null;
        this.player.on(AudioPlayerStatus.Playing, () => {
            // this.play(this.queue.pop()) 
            console.log(`The audio player has started playing in channel ${channelId} !`);
        });
    }

    // TODO lasciare solo la song come parametro spostando la connessione nel costruttore del player, in modo da poi invocare this.play a riga 15, senza causare cadute della connessione
    play(song, guildId, channelId, voiceAdapter) {
        try {
            const audioResource = createAudioResource(song);
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
            // TODO catchare eventuali errori della play
            console.log(this.isPlaying);
            console.log(this.queue);
            if(this.isPlaying){
                this.queue.push(audioResource);
            }
            else{
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

    stop(){
        if (this.player.state.status === 'playing') {
            this.isPlaying = false;
            this.connection.destroy();
        }
        //TODO handling se non e playing
    }
}
module.exports = AudioPlayer
