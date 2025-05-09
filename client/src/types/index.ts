export interface Project {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    tags: string[];
    technologies: string[];
    demoLink: string;
    githubLink: string;
}

export interface Skill {
    name: string;
    percentage: number;
}

export interface SkillCategory {
    title: string;
    iconName: string;
    iconBg: string;
    color: string;
    items: Skill[];
}

export interface TechIcon {
    name: string;
    iconName: string;
    colorClass: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}
