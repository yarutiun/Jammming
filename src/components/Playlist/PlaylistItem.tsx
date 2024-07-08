import style from "../../styles/playlist.module.css";
import { FC } from "react";

interface PlaylistItemProps {
    songTitle: string;
    songAuthor: string;
    playlist: { track: string, artist: string, uri: string }[];
    setPlaylist: React.Dispatch<React.SetStateAction<{ track: string, artist: string, uri: string }[]>>;
}


const PlaylistItem: FC<PlaylistItemProps> = ( { songTitle, songAuthor, playlist, setPlaylist } ) => {
    const handleDelete = () => {
        const newPlaylist = playlist.filter((item) => item.track !== songTitle);
        setPlaylist(newPlaylist);
    }
    
    return (
        <div className={style.song}>
            <div className={style.songTitle}>{songTitle} by {songAuthor} </div>
            <button className={style.addButton} onClick={handleDelete}>❌</button>
        </div>
        );
}

export default PlaylistItem;