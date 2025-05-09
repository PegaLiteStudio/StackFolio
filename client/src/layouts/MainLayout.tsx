import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {motion} from 'framer-motion';

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <div
            className="flex flex-col min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Header/>
            <motion.main
                className="flex-grow pt-16"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.3}}
            >
                {children}
            </motion.main>
            <Footer/>
        </div>
    );
};

export default MainLayout;
