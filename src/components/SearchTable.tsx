import style from "../styles/tables.module.css";
import { FC } from 'react';

interface SearchTableProps {
    tracks: string[];
    artists: string[];
    uri: string[];
    setPlaylist: React.Dispatch<React.SetStateAction<{ track: string, artist: string, uri: string }[]>>;
    playlist: { track: string, artist: string }[];
}

const SearchTable: FC<SearchTableProps> = ( { tracks, artists, setPlaylist, playlist, uri } ) => {

    const handleAdd = (track: string, artist: string, uri: string): void => {
        if (playlist.some(item => item.track === track && item.artist === artist))
            return;
        setPlaylist(prev => [...prev, { track, artist, uri }]);
    }


    return ( tracks.length > 0 && artists.length > 0 ?
        <div className={style.wrap}>
            <div className={style.header}>Results</div>
            <div className={style.song}>
                <div className={style.one}>{tracks[0]} by {artists[0]}</div>
                <button onClick={() => handleAdd(tracks[0], artists[0], uri[0])} className={style.addButton}>+</button>
            </div>
            <div className={style.song}>
                <div className={style.two}>{tracks[1]} by {artists[1]}</div>
                <button onClick={() => handleAdd(tracks[1], artists[1], uri[1])} className={style.addButton}>+</button>
            </div>
            <div className={style.song}>
                <div className={style.three}>{tracks[2]} by {artists[2]}</div>
                <button onClick={() => handleAdd(tracks[2], artists[2], uri[2])} className={style.addButton}>+</button>
            </div>
            <div className={style.song}>
                <div className={style.four}>{tracks[3]} by {artists[3]}</div>
                <button onClick={() => handleAdd(tracks[3], artists[3], uri[3])} className={style.addButton}>+</button>
            </div>
            <div className={style.song}>
                <div className={style.five}>{tracks[4]} by {artists[4]}</div>
                <button onClick={() => handleAdd(tracks[4], artists[4], uri[4])} className={style.addButton}>+</button>
            </div>
        </div>
        :
        <div className={style.wrap}>
            <div className={style.header}>Results</div>
            <div className={style.song}>
                <div className={style.one}>Song #1</div>
                <button className={style.addButton}>+</button>
            </div>
            <div className={style.song}>
                <div className={style.two}>Song #2</div>
                <button className={style.addButton}>+</button>
            </div>
            <div className={style.song}>
                <div className={style.three}>Song #3</div>
                <button className={style.addButton}>+</button>
            </div>
            <div className={style.song}>
                <div className={style.four}>Song #4</div>
                <button className={style.addButton}>+</button>
            </div>
            <div className={style.song}>
                <div className={style.five}>Song #5</div>
                <button className={style.addButton}>+</button>
            </div>
        </div>
    )
}

export default SearchTable;