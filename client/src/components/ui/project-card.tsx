import React from 'react';
import {motion} from 'framer-motion';
import {Card, CardContent} from '@/components/ui/card';
import {Project} from '@/types';
import {FaExternalLinkAlt, FaGithub} from 'react-icons/fa';

interface ProjectCardProps {
    project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({project}) => {
    return (
        <motion.div
            layout
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 20}}
            transition={{duration: 0.4}}
            whileHover={{y: -10}}
            className="h-full"
        >
            <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                    <motion.img
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.3}}
                        src={project.imageSrc}
                        alt={project.imageAlt}
                        className="w-full h-full object-cover"
                    />
                </div>
                <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.map((tech, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                            >
                {tech}
              </span>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-blue-700 font-medium flex items-center"
                        >
                            <FaExternalLinkAlt className="mr-2"/> Live Demo
                        </a>
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium flex items-center"
                        >
                            <FaGithub className="mr-2"/> GitHub
                        </a>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ProjectCard;
