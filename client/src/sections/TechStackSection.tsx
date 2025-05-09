import React from 'react';
import {motion} from 'framer-motion';
import {Card, CardContent} from '@/components/ui/card';
import SkillBar from '@/components/ui/skill-bar';
import {skills} from '@/data/skills';
import {techIcons} from '@/data/techIcons';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';

const TechStackSection = () => {
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.5}}
    };

    // Helper function to render the appropriate icon by name
    const renderIcon = (iconName: string, className?: string) => {
        if (iconName.startsWith('Fa')) {
            // @ts-ignore - dynamic access
            const FaIcon = FaIcons[iconName];
            return FaIcon ? <FaIcon className={className}/> : null;
        } else if (iconName.startsWith('Si')) {
            // @ts-ignore - dynamic access
            const SiIcon = SiIcons[iconName];
            return SiIcon ? <SiIcon className={className}/> : null;
        }
        return null;
    };

    return (
        <section id="tech-stack" className="py-20 bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="section-title">Tech Stack</h2>
                    <div className="section-divider"></div>
                    <p className="section-description">
                        I work with a variety of technologies to build robust and scalable applications.
                    </p>
                </div>

                {/* Skill Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {skills.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.5, delay: index * 0.1}}
                        >
                            <Card className="transition-all duration-300 hover:shadow-lg">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-6">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${category.iconBg}`}>
                                            {renderIcon(category.iconName, "text-xl")}
                                        </div>
                                        <h3 className="text-xl font-semibold">{category.title}</h3>
                                    </div>

                                    <div className="space-y-4">
                                        {category.items.map((skill) => (
                                            <SkillBar
                                                key={skill.name}
                                                name={skill.name}
                                                percentage={skill.percentage}
                                                color={category.color}
                                            />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Tech Icons */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{once: true}}
                >
                    <Card className="transition-all duration-300 hover:shadow-lg">
                        <CardContent className="p-8">
                            <h3 className="text-xl font-semibold mb-8 text-center">Technologies I Work With</h3>

                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
                                {techIcons.map((icon) => (
                                    <motion.div
                                        key={icon.name}
                                        className="flex flex-col items-center hover:scale-110 transition-transform"
                                        variants={itemVariants}
                                    >
                                        {renderIcon(icon.iconName, `text-4xl ${icon.colorClass} mb-2`)}
                                        <span className="text-sm mt-2">{icon.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStackSection;
