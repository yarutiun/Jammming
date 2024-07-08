import Header from './Header';
import Search from './Search';
import SearchBtn from './SearchBtn';
import { useState } from 'react';
import SearchTable from './SearchTable';
import style from '../styles/app.module.css';
import Playlist from './Playlist/Playlist';

function App() {
  const [token, setToken] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [artistName, setArtistName] = useState<string[]>([]);
  const [trackName, setTrackName] = useState<string[]>([]);
  const [uri, setUri] = useState<string[]>([]);
  const [playlist, setPlaylist] = useState<{ track: string, artist: string, uri: string }[]>([]);

  return (
    <div>
      <Header />
      <Search val={search} set={setSearch} />
      <SearchBtn val={search} setArtist={setArtistName} setTrack={setTrackName} setUri={setUri} token={token} setToken={setToken}/>
      <div className={style.wrap}>
        <SearchTable tracks={trackName} artists={artistName} uri={uri} setPlaylist={setPlaylist} playlist={playlist}/>
        <Playlist playlist={playlist} setPlaylist={setPlaylist} setToken={setToken} token={token}/>
      </div>
    </div>
  );
}

export default App;