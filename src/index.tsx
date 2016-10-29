import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Songs } from './data/songs';
import { Albums } from './data/albums';

import { Hello } from './components/Hello';

const songs = new Songs();
const albums = new Albums();

Promise.all([
  songs.getAll(),
  albums.getAll()
]).then(results => {
  ReactDOM.render(
    <Hello compiler="TypeScript" framework="React" />,
    document.getElementById('example')
  );
});