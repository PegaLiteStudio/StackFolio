import React from 'react';
import {motion} from 'framer-motion';
import {FaCodepen, FaGithub, FaLinkedin, FaTwitter} from 'react-icons/fa';

const socialLinks = [
    {icon: <FaGithub/>, href: 'https://github.com', label: 'GitHub'},
    {icon: <FaLinkedin/>, href: 'https://linkedin.com', label: 'LinkedIn'},
    {icon: <FaTwitter/>, href: 'https://twitter.com', label: 'Twitter'},
    {icon: <FaCodepen/>, href: 'https://codepen.io', label: 'CodePen'},
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-8 md:mb-0">
                        <div className="text-2xl font-bold text-primary mb-4">
                            StackFolio<span className="text-accent">.</span>
                        </div>
                        <p className="text-gray-400 max-w-md">
                            Building modern web applications with a focus on user experience, performance, and
                            accessibility.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end">
                        <div className="flex space-x-6 mb-6">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors text-xl"
                                    aria-label={link.label}
                                    whileHover={{scale: 1.2}}
                                    whileTap={{scale: 0.9}}
                                >
                                    {link.icon}
                                </motion.a>
                            ))}
                        </div>
                        <p className="text-gray-500">
                            &copy; {currentYear} Sahil Hossain. All rights reserved.
                        </p>
                        <p className="text-gray-500 mt-2">
                            Made with <span className="text-red-500">❤️</span> by Sahil Hossain
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
