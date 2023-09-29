import './Header.css'

export const Header = ({ toggleMenu, isMenuOpen }) => {
    return (
        <div className="header">
            <div className="header-text" onClick={toggleMenu}>
                {isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            </div>
            <div className="header-text">Start</div>
            <div className="header-text">Results</div>
        </div>
    );
};
