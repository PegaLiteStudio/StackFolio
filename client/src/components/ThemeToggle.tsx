import React from 'react';
import {useTheme} from '@/providers/ThemeProvider';
import {motion} from 'framer-motion';
import {FaMoon, FaSun} from 'react-icons/fa';

const ThemeToggle = () => {
    const {theme, setTheme} = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <motion.button
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
            {theme === 'dark' ? (
                <FaMoon className="text-blue-300"/>
            ) : (
                <FaSun className="text-yellow-500"/>
            )}
        </motion.button>
    );
};

export default ThemeToggle;
