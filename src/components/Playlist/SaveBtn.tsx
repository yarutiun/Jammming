import { FC, useEffect } from "react";
import style from "../../styles/playlist.module.css";
import { getCode, getAccessToken } from "./PlaylistUtils";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

const AUTH = 'https://accounts.spotify.com/authorize';

interface SaveBtnProps {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    playlist: { track: string, artist: string, uri: string }[];
}

const SaveBtn: FC<SaveBtnProps> = ({ setToken, token, playlist }) => {
    const REDIRECT_URI = 'http://localhost:5173/';
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

    const savePlaylist = async () => {
        if (!token) {
            window.location.href = url;
        } else {
            try {
                const res = await fetch('https://api.spotify.com/v1/me', {
                    headers: {
                        'Authorization': 'Bearer ' + token,
                    },
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch user data: ${res.status} ${res.statusText}`);
                }

                const data = await res.json();
                const userId = data.id;

                const playlistName = document.getElementById('nameOfPlaylist') as HTMLInputElement;
                const name = playlistName.value.length > 0 ? playlistName.value : 'New Playlist';
                const Play = {
                    name: name,
                    public: true,
                    collaborative: false,
                    description: 'New playlist description',
                };

                const postRes = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(Play),
                });

                if (!postRes.ok) {
                    const errorText = await postRes.text();
                    throw new Error(`Failed to create playlist: ${postRes.status} ${postRes.statusText} - ${errorText}`);
                }

                const playlistData = await postRes.json();
                alert("Playlist created successfully");
                const playlistId = playlistData.id;
                const uris = playlist.map(play => play.uri);
                const addItems = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        uris: uris,
                    }),
                    });
                if (!addItems.ok) {
                    throw new Error(`Failed to add tracks to playlist: ${addItems.status} ${addItems.statusText}`);
                }
            } catch (error: unknown) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <button className={style.addButton} onClick={savePlaylist}>Submit</button>
    );
};

export default SaveBtn;
