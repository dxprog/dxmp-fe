import * as React from 'react';
import { Album } from '../interfaces/album';
import { Song } from '../interfaces/song';

import { AlbumListItem } from './AlbumListItem';

interface Props {
  albums: Array<Album>;
  searchQuery: string;
  songs: Array<Song>;
  onSongClick: Function;
}

interface AlbumHashLookup {
  [key: number]: Album;
}

interface SongHashLookup {
  [key: number]: Array<Song>;
}

export class AlbumList extends React.Component<Props, undefined> {
  props: Props;

  private sortedAlbums: Array<Album>;
  private albumLookup: AlbumHashLookup;
  private songAlbumLookup: SongHashLookup;

  private albumMatches: Array<Album>;
  private songMatches: SongHashLookup;
  private indirectAlbumMatches: Set<number>;

  constructor(props: Props) {
    super(props);

    this.sortAlbums();
    this.optimizeData();

    this.albumMatches = [];
    this.songMatches = {};
    this.indirectAlbumMatches = new Set<number>();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.searchQuery !== this.props.searchQuery) {
      this.performSearchQuery(nextProps.searchQuery);
    }
  }

  render() {
    const isSearching = this.props.searchQuery !== '';
    const albumSource = isSearching ? this.albumMatches : this.sortedAlbums;
    return (
      <ul className="albumList">
        {albumSource.map(album => {
          const isDirectMatch = !this.indirectAlbumMatches.has(album.id);
          return (
            <AlbumListItem 
              album={album} 
              directSongMatches={this.songMatches[album.id]}
              key={`album-list-${album.id}`}
              songs={isSearching && !isDirectMatch
                ? this.songMatches[album.id]
                : this.songAlbumLookup[album.id]
              } 
              onSongClick={this.props.onSongClick}
              isDirectMatch={isDirectMatch}
              isSearching={isSearching}
            />
          )
        })}
      </ul>
    );
  }

  sortAlbums() {
    this.sortedAlbums = this.props.albums
      .sort((a, b) => {
        let aTitle = this.formatAlbumTitle(a.title);
        let bTitle = this.formatAlbumTitle(b.title);
        return aTitle < bTitle ? -1 : 1;
      });
  }

  formatAlbumTitle(title: string): string {
    return title.toLowerCase().replace('the ', '');
  }

  optimizeData() {
    this.albumLookup = {};
    for (let album of this.props.albums) {
      this.albumLookup[album.id] = album;
    }
    // Rearrange the song data in a fashion that's easier to lookup by album ID
    this.songAlbumLookup = {};
    for (let song of this.props.songs) {
      if (!this.songAlbumLookup[song.album_id]) {
        this.songAlbumLookup[song.album_id] = [];
      }
      this.songAlbumLookup[song.album_id].push(song);
    }
  }

  performSearchQuery(searchQuery: string) {
    this.albumMatches = [];
    this.songMatches = {};
    this.indirectAlbumMatches = new Set<number>();
    for (let album of this.sortedAlbums) {
      const albumTitle = album.title.toLowerCase();
      if (albumTitle.indexOf(searchQuery) !== -1) {
        this.albumMatches.push(album);
        this.songMatches[album.id] = [];
      }
    }
    for (let song of this.props.songs) {
      if (song.title && this.albumLookup[song.album_id]) {
        const songTitle = song.title.toLowerCase();
        if (songTitle.indexOf(searchQuery) !== -1) {
          if (!this.songMatches[song.album_id]) {
            this.songMatches[song.album_id] = [];
            this.albumMatches.push(this.albumLookup[song.album_id]);
            this.indirectAlbumMatches.add(song.album_id);
          }
          this.songMatches[song.album_id].push(song);
        }
      }
    }
  }
}