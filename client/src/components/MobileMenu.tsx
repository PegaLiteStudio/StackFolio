import React from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {cn} from '@/lib/utils';
import useScrollSpy, {setActiveSection} from '@/hooks/useScrollSpy';

interface MobileMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
    items: { label: string; href: string }[];
    activeSection?: string | null;
    onNavItemClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
                                                   isOpen,
                                                   toggleMenu,
                                                   items,
                                                   activeSection: propActiveSection,
                                                   onNavItemClick
                                               }) => {
    // Use our simplified hook
    const spyActiveSection = useScrollSpy();

    // Use prop value if available, otherwise use the one from hook
    const activeSection = propActiveSection !== undefined ? propActiveSection : spyActiveSection;

    // Simple click handler for mobile
    const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();

        // Extract section ID from the href
        const sectionId = href.substring(1);

        // If parent provided click handler, use it
        if (onNavItemClick) {
            onNavItemClick(e, href);
        } else {
            // Or handle it here

            // Update active section
            setActiveSection(sectionId);

            // Close menu
            toggleMenu();

            // Scroll to element
            const element = document.getElementById(sectionId);
            if (element) {
                // Delay scrolling slightly to let the menu collapse
                setTimeout(() => {
                    // Get header height for offset
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;

                    // For Android, use a different approach to scrolling
                    // Get the position relative to the document
                    const rect = element.getBoundingClientRect();
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const targetPosition = rect.top + scrollTop - headerHeight;

                    // Use manual scrolling with requestAnimationFrame for better Android support
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 500; // ms

                    // Define the animation functions outside the block for ES5 compatibility
                    const easeInOut = (t: number): number =>
                        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

                    // Start the animation
                    let startTime: number | null = null;
                    const doAnimateScroll = (currentTime: number): void => {
                        if (startTime === null) startTime = currentTime;
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        window.scrollTo(0, startPosition + distance * easeInOut(progress));

                        if (elapsed < duration) {
                            requestAnimationFrame(doAnimateScroll);
                        }
                    };

                    requestAnimationFrame(doAnimateScroll);

                    // Update URL
                    if (history.pushState) {
                        history.pushState(null, '', `#${sectionId}`);
                    } else {
                        window.location.hash = `#${sectionId}`;
                    }
                }, 300);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{opacity: 0, height: 0}}
                    animate={{opacity: 1, height: 'auto'}}
                    exit={{opacity: 0, height: 0}}
                    transition={{duration: 0.3}}
                    className="md:hidden bg-white dark:bg-gray-800 w-full border-t border-gray-200 dark:border-gray-700"
                >
                    <div className="container py-4">
                        <nav className="flex flex-col space-y-4">
                            {items.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "py-2 px-4 font-medium rounded-md transition-colors",
                                        activeSection === item.href.substring(1)
                                            ? "bg-gray-100 dark:bg-gray-700 text-primary"
                                            : "hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-primary"
                                    )}
                                    onClick={(e) => handleMobileClick(e, item.href)}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;