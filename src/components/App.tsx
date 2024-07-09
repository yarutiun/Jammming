import Header from './Header';
import Search from './Search';
import SearchBtn from './SearchBtn';
import { useState, useEffect } from 'react';
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
  const [showLoader, setShowLoader] = useState(true); // New state for controlling loader visibility

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false); // Hide loader after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [playlist]);

  return (
    <div>
      {showLoader && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
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