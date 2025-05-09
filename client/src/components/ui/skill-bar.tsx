import React from 'react';
import {motion} from 'framer-motion';

interface SkillBarProps {
    name: string;
    percentage: number;
    color: string;
}

const SkillBar: React.FC<SkillBarProps> = ({name, percentage, color}) => {
    return (
        <div>
            <div className="flex justify-between mb-1">
                <span className="font-medium">{name}</span>
                <span>{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <motion.div
                    className={`${color} h-2.5 rounded-full`}
                    initial={{width: 0}}
                    whileInView={{width: `${percentage}%`}}
                    viewport={{once: true}}
                    transition={{duration: 1, ease: "easeOut"}}
                />
            </div>
        </div>
    );
};

export default SkillBar;
