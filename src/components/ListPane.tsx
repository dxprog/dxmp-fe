import { IAlbum } from 'dxmp-common';
import * as React from 'react';

import './ListPane.scss';

interface IListPaneProps {
  albums: IAlbum[],
};

export class ListPane extends React.Component<IListPaneProps> {
  public render(): React.ReactNode {
    return (
      <table className="list-pane">
        <tr>
          <td className="meta-list"/>
          <td className="results-list"/>
          <td className="queue"/>
        </tr>
      </table>
    );
  }
}