import { IAlbum, ISong } from 'dxmp-common';
import * as React from 'react';

import { SongResult } from './SongResult';

import './SearchTab.scss';

interface ISearchTabProps {
  albums: {[albumID: number]: IAlbum},
  songs: ISong[],
};

interface ISearchTabState {
  query: string,
  queryResults: ISong[],
  scrollTop: number,
};

const RESULT_HEIGHT = 80;
const RESULTS_PER_ROW = 2;
const TOP_BUFFER = 1;
const BOTTOM_BUFFER = 7;

export class SearchTab extends React.Component<ISearchTabProps, ISearchTabState> {
  public state: ISearchTabState = {
    query: '',
    queryResults: [],
    scrollTop: 0,
  };

  public render(): React.ReactNode {
    const {query, queryResults, scrollTop} = this.state;
    const rowCount = Math.ceil(queryResults.length / RESULTS_PER_ROW);
    const topVisibleRow = Math.max(
      Math.floor(scrollTop / RESULT_HEIGHT) - TOP_BUFFER,
      0,
    );
    const topBumperHeight = topVisibleRow * RESULT_HEIGHT;
    const bottomVisibleRow = Math.min(
      topVisibleRow + BOTTOM_BUFFER,
      rowCount,
    );
    const bottomBumperHeight = 
      (rowCount - bottomVisibleRow) * RESULT_HEIGHT;
    const visibleQueryResults = queryResults.slice(
      Math.max(topVisibleRow * RESULTS_PER_ROW, 0), 
      Math.min(bottomVisibleRow * RESULTS_PER_ROW, queryResults.length),
    );

    return (
      <div className="search-tab">
        <input 
          autoFocus={true} 
          value={query} 
          onChange={this.onQueryChange}
        />
        <div className="results-list" onScroll={this.handleScroll}>
          <div style={{height: topBumperHeight}} />
          {visibleQueryResults.map(
            song => (
              <SongResult 
                album={this.props.albums[song.albumId]} 
                query={query} 
                song={song} 
              />
            ),
          )}
          <div style={{height: bottomBumperHeight}} />
        </div>
      </div>
    );
  }

  private onQueryChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const query = event.currentTarget.value;
    const querySet = this.state.query !== '' && query.startsWith(this.state.query) 
      ? this.state.queryResults 
      : this.props.songs;
    const regEx = new RegExp(query, 'i');
    const queryResults = querySet.filter(
      song => song.title.search(regEx) !== -1,
    );
    this.setState({query, queryResults, scrollTop: 0});
  }

  private handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    this.setState({scrollTop: event.currentTarget.scrollTop});
  }
}