import styles from '../styles/WindowDelete.module.css';
import deleteRed from '../assets/delete_red.png';
import crossDark from '../assets/cross_dark.png';
import crossLight from '../assets/cross_light.png';
import { useTheme } from './ThemeContext';

interface WindowDeleteProps {
  item: string;
  deleteItem: () => void;
  setShowWindow: (showWindow: boolean) => void;
}

function WindowDelete({ item, deleteItem, setShowWindow }: WindowDeleteProps) {
  const { theme } = useTheme();

  return (
    <div className={styles.window}>
      <button className={styles.cross} type="button" onClick={() => setShowWindow(false)}>
        <img src={theme === 'light' ? crossDark : crossLight} alt="cancel" />
      </button>
      <p className={styles.text}>Are you sure you want to delete this {item}?</p>
      <button className={styles.delete} type="button" onClick={deleteItem}>
        <img src={deleteRed} alt="delete" />
      </button>
    </div>
  );
}

export default WindowDelete;