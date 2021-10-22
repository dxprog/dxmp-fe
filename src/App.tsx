import { Dictionary, IAlbum, ISong } from 'dxmp-common';
import * as React from 'react';
import { useState, useEffect } from 'react';

import './App.scss';
import { ArtPane } from './components/ArtPane';
import { ControlPane } from './components/ControlPane';
import * as xhr from './lib/xhr';

interface IState {
  albums: Dictionary<IAlbum>,
  expandInterface: boolean,
  songs: ISong[],
};

const App = () => {
  const [albums, setAlbumList] = useState<Record<string, IAlbum>>({});
  const [songs, setSongs] = useState<ISong[]>([]);
  const [expandInterface, setExpandInterface] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [ albumRes, songRes ] = await Promise.all([
        xhr.request('//api.dxmp.us/albums') as Promise<IAlbum[]>,
        xhr.request('//api.dxmp.us/songs') as Promise<ISong[]>,
      ]);

      setAlbumList(albumRes.reduce((acc: Record<string, IAlbum>, album) => {
        acc[album.id] = album;
        return acc;
      }, {}));
      setSongs(songRes as ISong[]);
    };

    fetchData();
  });

  return (
    <div className="App">
      <ArtPane />
      <ControlPane albums={albums} songs={songs}/>
    </div>
  );
};

export default App;
