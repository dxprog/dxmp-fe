import * as React from 'react';

import { Album } from '../interfaces/album';
import AudioPlayer from '../services/audio-player';
import { AUDIO_ENDED } from '../services/audio-player';
import { Song } from '../interfaces/song';

interface Props {

}

interface PlaylistItem {
  song: Song;
  album: Album;
  played: boolean;
}

export class Playlist extends React.Component<Props, {}> {
  private queue: Array<PlaylistItem>;
  private queuePosition: number;

  constructor() {
    super();

    this.queue = [];
    this.queuePosition = 0;
    AudioPlayer.on(AUDIO_ENDED, this.songEnded.bind(this));
  }

  queueSong(song: Song, album: Album) {
    this.queue.push({ song, album, played: false });

    if (!AudioPlayer.isPlaying()) {
      AudioPlayer.playSong(song);
    }
  }

  render() {
    return (
      <div>

      </div>
    );
  }

  private songEnded() {
    this.queuePosition++;
    if (this.queue.length > this.queuePosition) {
      const nextSong: PlaylistItem = this.queue[this.queuePosition];
      AudioPlayer.playSong(nextSong.song);
    }
  }
}