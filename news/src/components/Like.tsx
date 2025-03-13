import { useState, useEffect } from 'react';
import styles from '../styles/Like.module.css';
import '../styles/themes.css';
import notLikeDark from '../assets/not_like_dark.png';
import like from '../assets/like_red.png';
import notLikeLight from '../assets/not_like_light.png';
import { useTheme } from './ThemeContext';

interface LikeProps {
    component: string;
    id: number
}

interface LikeData {
    id: number;
    isLike: boolean;
    countLike: number;
}

function Like({ component, id }: LikeProps) {
    const { theme } = useTheme();

    const getStoredLikes = (): LikeData[] => {
        try {
            const storedLikes = sessionStorage.getItem('likes');
            return storedLikes ? JSON.parse(storedLikes) : [];
        } catch (error) {
            console.error("Failed to access sessionStorage", error);
            return [];
        }
    };    

    const getInitialState = (): { isLike: boolean; countLike: number } => {
        const currentLike = getStoredLikes().find(item => item.id === id);
        return currentLike || { isLike: false, countLike: 0 };
    };    

    const [isLike, setIsLike] = useState<boolean>(getInitialState().isLike);
    const [countLike, setCountLike] = useState<number>(getInitialState().countLike);

    const updateSessionStorage = (updatedIsLike: boolean, updatedCountLike: number) => {
        const storedLikes = getStoredLikes();
        const index = storedLikes.findIndex(item => item.id === id);
        if (index !== -1) {
            storedLikes[index] = { id, isLike: updatedIsLike, countLike: updatedCountLike };
        } else {
            storedLikes.push({ id, isLike: updatedIsLike, countLike: updatedCountLike });
        }
        sessionStorage.setItem('likes', JSON.stringify(storedLikes));
    };
    

    useEffect(() => {
        updateSessionStorage(isLike, countLike);
    }, [isLike, countLike]);

    const handleLike = () => {
        if (isLike) {
            setCountLike((prev) => prev - 1);
        } else {
            setCountLike((prev) => prev + 1);
        }
        setIsLike((prev) => !prev);
    };

  return (
    <div className={styles.like}>
        <button onClick={handleLike} className={component === "FeedItem" ? styles.first : styles.second} type="button">
            {isLike
                ? <img src={like} alt="Like" />
                : <img src={theme === 'dark' ? notLikeLight : notLikeDark} alt="Like" />
            }
        </button>
        <span className={component === "FeedItem" ? styles.second : styles.first}>
            {countLike}
        </span>
    </div>
  )
}

export default Like
