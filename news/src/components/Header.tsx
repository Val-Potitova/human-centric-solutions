import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styles from '../styles/Header.module.css';
import '../styles/themes.css';
import iconLight from '../assets/feed_light.png';
import iconBlack from '../assets/feed_black.png';
import searchDark from '../assets/search_black.png';
import addPostDark from '../assets/add_post_dark.png';
import addPostLight from '../assets/add_post_light.png';
import { useTheme } from './ThemeContext';

interface HeaderProps {
    onSearch: (query: string) => void;
}

function Header({ onSearch }: HeaderProps) {
    const NAME = 'Mary';
    const [searchQuery, setSearchQuery] = useState('');
    const { theme } = useTheme();
    const location = useLocation();
    const [showForm, setShowForm] = useState(true);
    const [showAddPost, setShowAddPost] = useState(true);
    const [scrollingUp, setScrollingUp] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isAtTop, setIsAtTop] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY === 0) {
                setIsAtTop(true);
            } else {
                setIsAtTop(false);
            }

            if (window.scrollY < lastScrollY) {
                setScrollingUp(true);
            } else {
                setScrollingUp(false);
            }

            setLastScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/feed') {
            setShowForm(true);
        } else {
            setShowForm(false);
        }

        if (location.pathname === '/create_post') {
            setShowAddPost(false);
        } else {
            setShowAddPost(true);
        }
    }, [location.pathname]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        onSearch(query);
    };

    return (
        <div className={`${styles.container} ${scrollingUp && !isAtTop ? styles.fixed : ''}`}>
            <div className={styles.title}>
                <img className={styles.title_icon} src={theme === 'light' ? iconBlack : iconLight} alt="icon" />
                <h2>{`${NAME}'s Feed`}</h2>
                {showAddPost &&
                    <button className={styles.add_post} onClick={() => navigate('/create_post')} type="button">
                        <img src={theme === 'light' ? addPostDark : addPostLight} alt="post" />
                    </button>
                }
            </div>
            {showForm ?
                <form className={styles.search}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleChange}
                    />
                    <img src={searchDark} alt="search" />
                </form>
                : <button onClick={() => navigate('/')} className="main_button" type="button">
                    Go back
                </button>
            }
        </div>
    )
}
  
export default Header