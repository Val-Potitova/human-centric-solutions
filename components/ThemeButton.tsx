import React from 'react';
import { useTheme } from './ThemeContext';
import light from '../assets/theme_light.png';
import dark from '../assets/theme_dark.png';

const ThemeButton = React.memo(function ThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="select_themes" onClick={toggleTheme} type="button">
      <img src={theme === 'light' ? dark : light} alt="icon of theme" />
    </button>
  );
});

export default ThemeButton