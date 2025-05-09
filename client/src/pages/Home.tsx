import React from 'react';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import ProjectsSection from '@/sections/ProjectsSection';
import TechStackSection from '@/sections/TechStackSection';
import ContactSection from '@/sections/ContactSection';
import {Helmet} from 'react-helmet';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>StackFolio | Web Developer Portfolio</title>
                <meta name="description"
                      content="Sahil Hossain is a full stack web developer specializing in modern, responsive web applications with a focus on user experience and performance."/>
                <meta property="og:title" content="StackFolio | Web Developer Portfolio"/>
                <meta property="og:description"
                      content="Modern web developer portfolio showcasing projects and skills in React, Node.js, TypeScript and more."/>
                <meta property="og:type" content="website"/>
            </Helmet>
            <HeroSection/>
            <AboutSection/>
            <ProjectsSection/>
            <TechStackSection/>
            <ContactSection/>
        </>
    );
};

export default Home;