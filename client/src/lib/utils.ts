import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function scrollToElement(id: string): void {
    const element = document.getElementById(id);
    if (element) {
        // Get the header height to offset scrolling (accounting for fixed header)
        const headerHeight = document.querySelector('header')?.offsetHeight || 0;

        // Get the element's position
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;

        // Scroll to element with offset for header
        window.scrollTo({
            top: elementPosition - headerHeight,
            behavior: 'smooth'
        });

        // Update URL hash without causing a jump
        if (history.pushState) {
            history.pushState(null, '', `#${id}`);
        } else {
            location.hash = `#${id}`;
        }
    }
}

export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}

export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function (...args: Parameters<T>) {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
}
