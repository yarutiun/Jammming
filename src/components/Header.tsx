import style from '../styles/header.module.css';

const Header = () => {
    return (
        <header className={style.headerWrap}>
            <h1 className={style.header}>Ja<span className={ style.mmm }>mmm</span>ing</h1>
        </header>
    );
}

export default Header;