import Eventable from '../interfaces/eventable';
import { Song } from '../interfaces/song';

// Constants
export const AUDIO_ENDED = 'audio-end';
export const AUDIO_PROGRESS = 'audio-progress';

class AudioPlayer extends Eventable {
  private audioEl: HTMLAudioElement;

  private _currentSong: Song;
  get currentSong() {
    return this._currentSong;
  }

  constructor() {
    super();

    // Create the audioPlayer and set up the appropriate callbacks
    this.audioEl = document.createElement('audio');
    this.audioEl.addEventListener('canplaythrough', this.handleCanPlayThrough.bind(this));
    this.audioEl.addEventListener('ended', this.handleEnded.bind(this));
    this.audioEl.addEventListener('timeupdate', this.handleTimeUpdate.bind(this));
  }

  /**
   * Plays the provided song
   * @param path The URL to the audio file to play
   */
  playSong(song: Song) {
    this._currentSong = song;
    this.audioEl.src = song.url;
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

  /**
   * Handles the timeupdate event
   * @param evt The event object
   */
  private handleTimeUpdate(evt: AudioProcessingEvent) {
    this.fire(AUDIO_PROGRESS, [ this.audioEl.currentTime ]);
  }
}

// Export as a singleton
export default new AudioPlayer();