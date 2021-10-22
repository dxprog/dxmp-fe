import { Dictionary, IAlbum, ISong } from 'dxmp-common';
import * as React from 'react';

import './App.scss';
import { ArtPane } from './components/ArtPane';
import { ControlPane } from './components/ControlPane';
import * as xhr from './lib/xhr';

interface IState {
  albums: Dictionary<IAlbum>,
  expandInterface: boolean,
  songs: ISong[],
};

class App extends React.Component<{}, IState> {
  public state: IState = {
    albums: {},
    expandInterface: false,
    songs: [],
  };

  public async componentDidMount(): Promise<any> {
    const [albumList, songs] = await Promise.all([
      xhr.request('http://api.dxmp.us/albums'),
      xhr.request('http://api.dxmp.us/songs'),
    ]);

    const albums: Record<string, IAlbum> = {};
    for (const a of albumList as IAlbum[]) {
      albums[a.id] = a;
    }
    this.setState({albums, songs: songs as ISong[]});
  }

  public render() {
    return (
      <div className="App">
        <ArtPane />
        <ControlPane albums={this.state.albums} songs={this.state.songs}/>
      </div>
    );
  }

}

export default App;
