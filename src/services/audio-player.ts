import Eventable from '../interfaces/eventable';

// Constants
export const AUDIO_ENDED = 'audio-end';

class AudioPlayer extends Eventable {
  private audioEl: HTMLAudioElement;

  constructor() {
    super();

    // Create the audioPlayer and set up the appropriate callbacks
    this.audioEl = document.createElement('audio');
    this.audioEl.addEventListener('canplaythrough', this.handleCanPlayThrough.bind(this));
    this.audioEl.addEventListener('ended', this.handleEnded.bind(this));
  }

  /**
   *
   * @param path The URL to the audio file to play
   */
  playAudio(path: string) {
    this.audioEl.src = path;
    this.audioEl.load();
  }

  /**
   * Whether or not there is currently audio playing
   */
  isPlaying(): boolean {
    return !this.audioEl.paused;
  }

  /**
   * Handles the ended audio event
   * @param evt The event object
   */
  private handleEnded(evt: AudioProcessingEvent) {
    this.fire(AUDIO_ENDED);
  }

  /**
   * Handles the canplaythrough audio event
   * @param evt The event object
   */
  private handleCanPlayThrough(evt: AudioProcessingEvent) {
    this.audioEl.play();
  }
}

// Export as a singleton
export default new AudioPlayer();