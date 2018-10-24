import { IAlbum } from 'dxmp-common';
import * as React from 'react';

import './ListPane.scss';

interface IListPaneProps {
  albums: IAlbum[],
};

interface IListPaneState {
  query: string,
};

export class ListPane extends React.Component<IListPaneProps> {
  public state: IListPaneState = {
    query: '',
  };

  public render(): React.ReactNode {
    return (
      <table className="list-pane">
        <tbody>
          <tr>
            <td className="meta-list"/>
            <td className="results-list">
              <input 
                autoFocus={true} 
                value={this.state.query} 
                onChange={this.onQueryChange}
              />
            </td>
            <td className="queue"/>
          </tr>
        </tbody>
      </table>
    );
  }

  private onQueryChange = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setState({query: event.currentTarget.value});
  }
}