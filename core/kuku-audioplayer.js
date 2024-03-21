const { createAudioPlayer, getVoiceConnection, NoSubscriberBehavior, createAudioResource, joinVoiceChannel, AudioPlayerStatus } = require('@discordjs/voice');

class AudioPlayer {
    constructor(channelId, guildId, voiceAdapter) {
        this.voiceAdapter = voiceAdapter;
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
            this.connection.subscribe(this.player);
            this.player.on(AudioPlayerStatus.Idle, () => {

                // sostituire con playNext ma non va perche non legge la funzione
                if (this.queue.length != 0) {
                    this.player.play(this.queue.pop());
                }
                else {
                    this.isPlaying = false;
                    if (this.guildId === '778945436941680661')
                        this.connection = joinVoiceChannel({
                            channelId: '938572937894715482',
                            guildId: this.guildId,
                            adapterCreator: this.voiceAdapter,
                        })
                    else this.connection.destroy();
                }
            });
        }
        catch (error) {
            this.isPlaying = false;
            throw error;
        }
    }

    play(song) {
        try {
            const audioResource = createAudioResource(song);
            
            // TODO catchare eventuali errori della play
            if (this.isPlaying || this.queue.length > 0) {
                this.queue.unshift(audioResource);
                return true;
            }
            else {
                // this.connection = getVoiceConnection(guildId, channelId);

                this.connection = joinVoiceChannel({
                    channelId: this.channelId,
                    guildId: this.guildId,
                    adapterCreator: this.voiceAdapter,
                })

                this.connection.subscribe(this.player);

                this.player.play(audioResource);
                this.isPlaying = true;
                return false;
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

    playNext() {
        if (this.queue.length === 0) {
            this.goToBed();
            return false;
        }
        this.player.play(this.queue.pop());
        return true;
    }

    stop() {
        if (this.player.state.status === 'playing') {
            this.isPlaying = false;
            this.connection.destroy();
        }
        //TODO handling se non e playing
    }

    goToBed() {
        this.isPlaying = false;
        if (this.guildId === '778945436941680661')
            this.connection = joinVoiceChannel({
                channelId: '938572937894715482',
                guildId: this.guildId,
                adapterCreator: this.voiceAdapter,
            })
        else this.connection.destroy();
    }
}
module.exports = AudioPlayer