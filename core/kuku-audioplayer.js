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

        this.initializeConnection();
        this.initializeEventHandlers();
    }

    initializeConnection() {
        this.connection = getVoiceConnection(this.guildId, this.channelId);
        if (!this.connection) {
            this.connection = joinVoiceChannel({
                channelId: this.channelId,
                guildId: this.guildId,
                adapterCreator: this.voiceAdapter,
            });
        }
        this.connection.subscribe(this.player);
    }

    initializeEventHandlers() {
        this.player.on(AudioPlayerStatus.Idle, () => {
            this.playNextOrStop();
        });
    }

    playNextOrStop() {
        if (this.queue.length !== 0) {
            this.player.play(this.queue.pop());
        } else {
            this.stop();
        }
    }

    play(song) {
        const audioResource = createAudioResource(song);
        if (this.isPlaying || this.queue.length > 0) {
            this.queue.unshift(audioResource);
            return true;
        } else {
            this.player.play(audioResource);
            this.isPlaying = true;
            return false;
        }
    }

    pause() {
        if (this.player.state.status === AudioPlayerStatus.Playing) {
            this.player.pause(true);
            this.isPlaying = false;
            return true;
        }
        return false;
    }

    unpause() {
        if (this.player.state.status === AudioPlayerStatus.Paused) {
            this.player.unpause();
            this.isPlaying = true;
            return true;
        }
        return false;
    }

    playNext() {
        if (this.queue.length === 0) {
            this.stop();
            return false;
        }
        this.player.play(this.queue.pop());
        return true;
    }

    stop() {
        this.isPlaying = false;
        this.connection.destroy();
    }

    goToBed() {
        this.isPlaying = false;
        const newChannelId = this.guildId === '778945436941680661' ? '938572937894715482' : null;
        if (newChannelId) {
            this.connection = joinVoiceChannel({
                channelId: newChannelId,
                guildId: this.guildId,
                adapterCreator: this.voiceAdapter,
            });
        } else {
            this.connection.destroy();
        }
    }
}

module.exports = AudioPlayer;
