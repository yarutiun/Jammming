import style from "../../styles/playlist.module.css";
import PlaylistItem from "./PlaylistItem";
import {useEffect} from "react";
import { FC, useState } from "react";
import SaveBtn from "./SaveBtn";

interface PlaylistProps {
    setToken: React.Dispatch<React.SetStateAction<string>>;
    token: string;
    playlist: { track: string, artist: string, uri: string }[];
    setPlaylist: React.Dispatch<React.SetStateAction<{ track: string, artist: string, uri: string }[]>>;
}

const Playlist: FC<PlaylistProps> = ( { playlist, setPlaylist, setToken, token } ) => {
    const [playlistName, setPlaylistName] = useState<string>(() => {
        return localStorage.getItem('playlistName') || '';
    });

    useEffect(() => {
        localStorage.setItem('playlistName', playlistName);
    }, [playlistName]);

    useEffect(() => {
        const temp = document.getElementById('nameOfPlaylist') as HTMLInputElement;
        if (temp && localStorage.getItem('playlistName') !== null && playlistName === '') {
            temp.value = localStorage.getItem('playlistName') as string;
        }
    }, []);

    return (
        <div className={style.wrap}>
            <div className={style.header}>
                <input 
                    id='nameOfPlaylist' 
                    placeholder="Name your Playlist"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                />
                <SaveBtn setToken={setToken} token={token} playlist={playlist}/>
            </div> 
            {playlist.map((item, index) => (
                <PlaylistItem key={index} songTitle={item.track} songAuthor={item.artist} playlist={playlist} setPlaylist={setPlaylist}/>
            ))}
        </div>
    );
}

export default Playlist;
