import style from "../styles/searchBtn.module.css"
import { FC } from 'react';
import { useEffect } from 'react';
import { getCode, getAccessToken } from './Playlist/PlaylistUtils';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

interface SearchBtnProps {
    val: string;
    setArtist: React.Dispatch<React.SetStateAction<string[]>>;
    setTrack: React.Dispatch<React.SetStateAction<string[]>>;
    setUri: React.Dispatch<React.SetStateAction<string[]>>;
    token: string | undefined;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AUTH = 'https://accounts.spotify.com/authorize';


const SearchBtn: FC<SearchBtnProps> = ({ val, setArtist, setTrack, token, setToken, setUri }) => {

    const REDIRECT_URI = 'https://yarutiun-jammming.netlify.app/';
    const encodedRedirectUri = encodeURIComponent(REDIRECT_URI);
    const url = `${AUTH}?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodedRedirectUri}&scope=playlist-modify-public`;


    useEffect(() => {
        const code = getCode();
        if (code) {
            getAccessToken(code).then(token => {
                if (token) {
                    setToken(token);
                    console.log('Access token:', token);
                }
            }).catch(error => {
                console.error('Error getting access token:', error);
            });
        }
    }, [setToken]);
    
    const getTrack = async () => {
        if(!token)
            window.location.href = url;
        const artistArr = [];
        const trackArr = [];
        const uriArr = [];
        const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(val)}&type=track&limit=5`;
        if (!val) {
            alert("Please enter a search term");
            return;
        }
        try {
            const res = await fetch(searchUrl, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if(!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            if (data.tracks.items.length === 0) {
                throw new Error("No tracks found");
            }
            for (let i = 0; i < data.tracks.items.length; i++) {
                trackArr.push(data.tracks.items[i].name);
                artistArr.push(data.tracks.items[i].artists[0].name);
                uriArr.push(data.tracks.items[i].uri);

            }
            setArtist(artistArr);
            setTrack(trackArr);
            setUri(uriArr);
        }
        catch (error) {
            console.log('Error: ', error);
        }
    }
    return (
        <div className={style.searchBtnWrapper}>
            <button className={style.searchBtn} onClick={getTrack}>
                Search
            </button>
        </div>
    )
}

export default SearchBtn;