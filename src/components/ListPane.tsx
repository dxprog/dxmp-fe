import { IAlbum, ISong } from 'dxmp-common';
import * as React from 'react';

import './ListPane.scss';

interface IListPaneProps {
  albums: IAlbum[],
  songs: ISong[],
};

interface IListPaneState {
  query: string,
  queryResults: ISong[],
};

export class ListPane extends React.Component<IListPaneProps, IListPaneState> {
  public state: IListPaneState = {
    query: '',
    queryResults: [],
  };

  public render(): React.ReactNode {
    return (
      <div className="list-pane">
        <div className="meta-list"/>
        <div className="results-pane">
          <input 
            autoFocus={true} 
            value={this.state.query} 
            onChange={this.onQueryChange}
          />
          {this.renderQueryResults()}
        </div>
        <div className="queue"/>
      </div>
    );
  }

  private renderQueryResults(): React.ReactNode {
    return (
      <ul className="results-list">
        {this.state.queryResults.map(
          song => {
            const {query} = this.state;
            const {title} = song;
            const queryPos = title.toLowerCase().indexOf(query);
            const prefix = title.substr(0, queryPos);
            const match = title.substr(queryPos, query.length);
            const suffix = title.substr(queryPos + query.length);
            return (
              <li className="result" key={song.id}>
                {prefix}<span className="highlight">{match}</span>{suffix}
              </li>
            );
          },
        )}
      </ul>
    );
  }

  private onQueryChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const query = event.currentTarget.value.toLowerCase();
    const querySet = this.state.query !== '' && query.startsWith(this.state.query) 
      ? this.state.queryResults 
      : this.props.songs;
    const queryResults = querySet.filter(
      song => song.title.toLowerCase().includes(query),
    );
    this.setState({query, queryResults});
  }
}