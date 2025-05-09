import {useEffect, useState} from 'react';
import {Link} from 'wouter';
import {motion} from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import MobileMenu from '@/components/MobileMenu';
import {cn} from '@/lib/utils';
import useScrollSpy, {setActiveSection} from '@/hooks/useScrollSpy';

const navItems = [
    {label: 'Home', href: '#home'},
    {label: 'About', href: '#about'},
    {label: 'Projects', href: '#projects'},
    {label: 'Tech Stack', href: '#tech-stack'},
    {label: 'Contact', href: '#contact'},
];

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const activeSection = useScrollSpy();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle navigation item click
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const sectionId = href.substring(1); // Remove # from the href

        // Set the active section using our simplified global state
        setActiveSection(sectionId);

        // Get element and scroll to it
        const element = document.getElementById(sectionId);
        if (element) {
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
        }

        // Close mobile menu if open
        if (isOpen) {
            toggleMenu();
        }
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-10 transition-all duration-300",
            isScrolled ? "bg-white dark:bg-gray-800 shadow-sm" : "bg-transparent"
        )}>
            <div className="container h-16 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-primary dark:text-primary">
                    StackFolio<span className="text-accent">.</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "font-medium transition-colors",
                                activeSection === item.href.substring(1)
                                    ? "text-primary"
                                    : "hover:text-primary"
                            )}
                            onClick={(e) => handleNavClick(e, item.href)}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <ThemeToggle/>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden w-10 h-10 flex items-center justify-center"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <motion.svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-gray-700 dark:text-gray-300"
                            animate={isOpen ? "open" : "closed"}
                        >
                            <motion.path
                                d="M4 6H20M4 12H20M4 18H20"
                                className="stroke-current"
                                strokeWidth="2"
                                strokeLinecap="round"
                                variants={{
                                    closed: {pathLength: 1},
                                    open: {pathLength: 0}
                                }}
                            />
                            <motion.path
                                d="M4 6L20 18M4 18L20 6"
                                className="stroke-current"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeDasharray="0 1"
                                variants={{
                                    closed: {pathLength: 0},
                                    open: {pathLength: 1}
                                }}
                            />
                        </motion.svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <MobileMenu
                isOpen={isOpen}
                toggleMenu={toggleMenu}
                items={navItems}
                activeSection={activeSection}
                onNavItemClick={handleNavClick}
            />
        </header>
    );
};

export default Header;
