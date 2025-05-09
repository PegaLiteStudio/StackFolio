import React from 'react';
import {motion} from 'framer-motion';
import {Button} from '@/components/ui/button';

const HeroSection = () => {
    return (
        <section id="home" className="min-h-screen flex items-center py-20">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center">
                    <motion.div
                        className="md:w-1/2 mb-12 md:mb-0"
                        initial={{opacity: 0, x: -50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.6}}
                    >
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            <span className="block">Hi, I'm</span>
                            <span className="text-primary">StackFolio</span>
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-400 mb-8">
                            Full Stack Web Developer
                        </h2>
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-lg">
                            I build modern, responsive web applications with a focus on user experience and performance.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                asChild
                                size="lg"
                                className="bg-primary hover:bg-blue-600 text-white font-medium shadow-md hover:shadow-lg"
                            >
                                <a href="#projects">View Projects</a>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium shadow-md hover:shadow-lg"
                            >
                                <a href="#contact">Contact Me</a>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        className="md:w-1/2 flex justify-center"
                        initial={{opacity: 0, x: 50}}
                        animate={{opacity: 1, x: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                    >
                        <div
                            className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary shadow-xl">
                            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <defs>
                                    <pattern id="avatarPattern" x="0" y="0" width="1" height="1" viewBox="0 0 400 400"
                                             patternUnits="userSpaceOnUse">
                                        <rect width="400" height="400" fill="#f0f0f0"/>
                                        <circle cx="200" cy="150" r="80" fill="#d1d5db"/>
                                        <circle cx="200" cy="380" r="180" fill="#d1d5db"/>
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#avatarPattern)"/>
                                <g fill="#9ca3af">
                                    <circle cx="160" cy="120" r="10"/>
                                    <circle cx="240" cy="120" r="10"/>
                                    <path d="M170,170 Q200,190 230,170" fill="none" stroke="#9ca3af" strokeWidth="8"
                                          strokeLinecap="round"/>
                                </g>
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
