import {useEffect, useState} from 'react';

// Create a global state for active section that can be used across components
let activeSection: string | null = null;
const listeners: ((section: string | null) => void)[] = [];

// Function to update all components that use this hook
const notifyListeners = (section: string | null) => {
    activeSection = section;
    listeners.forEach(listener => listener(section));
};

// Set the active section manually (for click events)
export const setActiveSection = (section: string): void => {
    notifyListeners(section);
};

// Simple hook to track active section
const useScrollSpy = (sectionIds: string[] = ['home', 'about', 'projects', 'tech-stack', 'contact'], offset: number = 100): string | null => {
    const [section, setSection] = useState<string | null>(activeSection);

    // Register this component to be notified when active section changes
    useEffect(() => {
        const handler = (newSection: string | null) => {
            setSection(newSection);
        };

        listeners.push(handler);

        // Initial state synchronization
        if (activeSection) {
            setSection(activeSection);
        }

        return () => {
            const index = listeners.indexOf(handler);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }, []);

    // Set up scroll detection
    useEffect(() => {
        const handleScroll = () => {
            // Find visible sections
            const sections = sectionIds.map(id => {
                const element = document.getElementById(id);
                if (!element) return null;

                const rect = element.getBoundingClientRect();
                return {
                    id,
                    top: rect.top,
                    bottom: rect.bottom,
                    height: rect.height
                };
            }).filter(Boolean) as { id: string; top: number; bottom: number; height: number }[];

            // Determine which section is most visible in the viewport
            const visible = sections.filter(section => {
                // A section is visible if any part of it is in the viewport
                const viewportHeight = window.innerHeight;
                const visibleTop = Math.max(0, section.top);
                const visibleBottom = Math.min(viewportHeight, section.bottom);
                return visibleBottom > visibleTop; // Has some visible part
            });

            if (visible.length > 0) {
                // Use the one with the most visibility
                const mostVisible = visible.reduce((prev, current) => {
                    const prevVisible = Math.min(prev.bottom, window.innerHeight) - Math.max(0, prev.top);
                    const currentVisible = Math.min(current.bottom, window.innerHeight) - Math.max(0, current.top);
                    return currentVisible > prevVisible ? current : prev;
                });

                // Only update if it's a different section to avoid constant rerendering
                if (mostVisible.id !== activeSection) {
                    notifyListeners(mostVisible.id);
                }
            }
        };

        // Call on mount and add scroll listener
        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sectionIds, offset]);

    return section;
};

export default useScrollSpy;
