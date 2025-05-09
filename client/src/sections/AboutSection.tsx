import React from 'react';
import {motion} from 'framer-motion';
import {Card, CardContent} from '@/components/ui/card';
import {FaBriefcase, FaGithub, FaGraduationCap, FaLinkedin, FaMapMarkerAlt, FaTwitter} from 'react-icons/fa';
import {SiJavascript, SiNodedotjs, SiReact, SiTypescript} from 'react-icons/si';

const experienceItems = [
    {
        icon: <SiReact className="text-primary text-xl"/>,
        title: 'Frontend',
        description: 'Creating responsive, accessible, and performant user interfaces with modern frameworks.'
    },
    {
        icon: <SiNodedotjs className="text-secondary text-xl"/>,
        title: 'Backend',
        description: 'Building robust APIs and server-side applications with optimized database interactions.'
    },
    {
        icon: <SiJavascript className="text-accent text-xl"/>,
        title: 'UI/UX Design',
        description: 'Designing intuitive user experiences with a focus on usability and aesthetic appeal.'
    },
    {
        icon: <SiTypescript className="text-yellow-600 dark:text-yellow-500 text-xl"/>,
        title: 'DevOps',
        description: 'Implementing CI/CD pipelines, containerization, and cloud infrastructure management.'
    }
];

const AboutSection = () => {
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.5}}
    };

    return (
        <section id="about" className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="section-title">About Me</h2>
                    <div className="section-divider"></div>
                </div>

                <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                    <motion.div
                        className="md:w-1/2"
                        initial={{opacity: 0, x: -30}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.6}}
                    >
                        <p className="text-lg mb-6">
                            I'm a passionate web developer with expertise in building modern, responsive, and
                            user-friendly applications. With a strong foundation in both frontend and backend
                            technologies, I bring ideas to life through clean code and thoughtful architecture.
                        </p>
                        <p className="text-lg mb-6">
                            My journey in web development began 5 years ago, and I've since worked on various projects
                            ranging from e-commerce platforms to data-intensive dashboards. I'm continuously learning
                            and adapting to new technologies to deliver the best solutions.
                        </p>
                        <p className="text-lg mb-8">
                            When I'm not coding, you can find me exploring new tech, contributing to open-source
                            projects, or enjoying outdoor activities.
                        </p>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="flex items-center">
                                <FaMapMarkerAlt className="text-primary mr-2"/>
                                <span>San Francisco, CA</span>
                            </div>
                            <div className="flex items-center">
                                <FaGraduationCap className="text-primary mr-2"/>
                                <span>B.S. Computer Science</span>
                            </div>
                            <div className="flex items-center">
                                <FaBriefcase className="text-primary mr-2"/>
                                <span>5+ Years Experience</span>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                            >
                                <FaGithub className="text-2xl"/>
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                            >
                                <FaLinkedin className="text-2xl"/>
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                            >
                                <FaTwitter className="text-2xl"/>
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        className="md:w-1/2"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {experienceItems.map((item, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <Card className="transition-all duration-300 hover:shadow-lg">
                                        <CardContent className="p-6">
                                            <div className="flex items-center mb-4">
                                                <div
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                                                        index === 0 ? 'bg-blue-100 dark:bg-blue-900' :
                                                            index === 1 ? 'bg-green-100 dark:bg-green-900' :
                                                                index === 2 ? 'bg-purple-100 dark:bg-purple-900' :
                                                                    'bg-yellow-100 dark:bg-yellow-900'
                                                    }`}>
                                                    {item.icon}
                                                </div>
                                                <h3 className="text-xl font-semibold">{item.title}</h3>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                {item.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
