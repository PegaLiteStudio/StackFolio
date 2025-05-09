import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Button} from '@/components/ui/button';
import ProjectCard from '@/components/ui/project-card';
import {projects} from '@/data/projects';
import {cn} from '@/lib/utils';

const filters = [
    {label: 'All', value: 'all'},
    {label: 'React', value: 'react'},
    {label: 'Node.js', value: 'node'},
    {label: 'TypeScript', value: 'typescript'},
    {label: 'Full Stack', value: 'fullstack'},
];

const ProjectsSection = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const handleFilterChange = (filter: string) => {
        setActiveFilter(filter);
    };

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.tags.includes(activeFilter));

    return (
        <section id="projects" className="py-20">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="section-title">My Projects</h2>
                    <div className="section-divider"></div>
                    <p className="section-description">
                        Here are some of my recent projects. Each one represents different challenges and learning
                        opportunities.
                    </p>
                </div>

                {/* Project Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {filters.map((filter) => (
                        <Button
                            key={filter.value}
                            onClick={() => handleFilterChange(filter.value)}
                            variant={activeFilter === filter.value ? 'default' : 'outline'}
                            className={cn(
                                "rounded-full",
                                activeFilter === filter.value
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                            )}
                        >
                            {filter.label}
                        </Button>
                    ))}
                </div>

                {/* Project Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project.id} project={project}/>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default ProjectsSection;
