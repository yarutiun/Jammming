import style from "../styles/search.module.css";
import React from 'react';
import { FC } from 'react';

interface SearchProps {
    val: string;
    set: React.Dispatch<React.SetStateAction<string>>;

}

const Search: FC<SearchProps> = ({ val, set }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        set(e.target.value);
    }
    return (
        <div className={style.searchWrap}>
            <input className={style.search} value={val} onChange={handleChange} type="text" placeholder="Search for your song" />
        </div>
    );
}

export default Search;