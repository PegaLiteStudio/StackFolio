import {SkillCategory} from '@/types';

// Note: Using icon names instead of JSX elements to avoid Vite parsing issues in data files
export const skills: SkillCategory[] = [
    {
        title: 'Frontend',
        iconName: 'FaCode',
        iconBg: 'bg-blue-100 dark:bg-blue-900',
        color: 'bg-primary',
        items: [
            {name: 'React', percentage: 95},
            {name: 'JavaScript', percentage: 90},
            {name: 'TypeScript', percentage: 85},
            {name: 'CSS/SASS', percentage: 90},
        ],
    },
    {
        title: 'Backend',
        iconName: 'FaServer',
        iconBg: 'bg-green-100 dark:bg-green-900',
        color: 'bg-green-500',
        items: [
            {name: 'Node.js', percentage: 90},
            {name: 'Express', percentage: 85},
            {name: 'MongoDB', percentage: 80},
            {name: 'SQL', percentage: 75},
        ],
    },
    {
        title: 'Tools',
        iconName: 'FaTools',
        iconBg: 'bg-purple-100 dark:bg-purple-900',
        color: 'bg-accent',
        items: [
            {name: 'Git/GitHub', percentage: 95},
            {name: 'Docker', percentage: 80},
            {name: 'Webpack', percentage: 85},
            {name: 'VS Code', percentage: 90},
        ],
    },
    {
        title: 'DevOps & Cloud',
        iconName: 'FaCloud',
        iconBg: 'bg-red-100 dark:bg-red-900',
        color: 'bg-red-500',
        items: [
            {name: 'AWS', percentage: 80},
            {name: 'CI/CD', percentage: 85},
            {name: 'Kubernetes', percentage: 70},
            {name: 'Terraform', percentage: 65},
        ],
    },
];
