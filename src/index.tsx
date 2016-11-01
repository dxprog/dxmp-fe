import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Songs } from './data/songs';
import { Albums } from './data/albums';

import { Page } from './components/Page';

const songs = new Songs();
const albums = new Albums();

Promise.all([
  songs.getAll(),
  albums.getAll()
]).then(results => {
  ReactDOM.render(
    <Page songs={results[0]} albums={results[1]} />,
    document.getElementById('root')
  );
});