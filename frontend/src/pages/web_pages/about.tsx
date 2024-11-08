import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'BuddyTime';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/contact',
      label: 'contact',
    },
  ];

  const features_points = [
    {
      name: 'AI-Powered Recommendations',
      description:
        "Our AI technology analyzes your child's behavior to provide personalized activity suggestions, ensuring a balanced mix of learning and play.",
      icon: 'mdiBrain',
    },
    {
      name: 'Comprehensive Parental Insights',
      description:
        "Gain valuable insights into your child's screen time and emotional well-being with our detailed parental dashboard, helping you make informed decisions.",
      icon: 'mdiChartLine',
    },
    {
      name: 'Seamless Integration',
      description:
        "BuddyTime integrates with educational content providers and fitness trackers, offering a holistic approach to your child's development.",
      icon: 'mdiPuzzle',
    },
  ];

  const testimonials = [
    {
      text: 'BuddyTime has been a lifesaver for our family. It helps us manage screen time effectively while keeping our kids engaged in learning.',
      company: 'TechFamily Solutions',
      user_name: 'Anna Thompson, Parent',
    },
    {
      text: 'The personalized recommendations are spot on! My daughter loves the activities, and I love the peace of mind it brings.',
      company: 'SmartParent Innovations',
      user_name: 'James Carter, Software Engineer',
    },
    {
      text: "As an educator, I appreciate how BuddyTime integrates learning with play. It's a fantastic tool for modern parenting.",
      company: 'EduTech Pioneers',
      user_name: 'Laura Mitchell, Teacher',
    },
    {
      text: "BuddyTime's parental dashboard is incredibly insightful. It helps me understand my child's habits and make better decisions.",
      company: 'FamilyFirst Tech',
      user_name: 'Robert Wilson, Data Analyst',
    },
    {
      text: "I love how BuddyTime adapts to my son's mood and learning style. It's like having a personal tutor at home.",
      company: 'Innovative Learning Co.',
      user_name: 'Sophia Lee, Marketing Specialist',
    },
    {
      text: 'The integration with fitness trackers is a great feature. It encourages my kids to stay active and healthy.',
      company: 'ActiveKids Solutions',
      user_name: 'David Brown, Fitness Coach',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About BuddyTime - Our Mission and Vision`}</title>
        <meta
          name='description'
          content={`Learn more about BuddyTime, our mission to balance screen time with learning, and the team behind the AI-powered app for children.`}
        />
      </Head>
      <WebSiteHeader projectName={'BuddyTime'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'BuddyTime'}
          image={['Team brainstorming innovative ideas']}
          mainText={`Discover the Heart of ${projectName}`}
          subTitle={`Explore the mission and vision behind ${projectName}, the AI-powered app dedicated to balancing screen time with enriching activities for children.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Meet Our Team`}
        />

        <AboutUsSection
          projectName={'BuddyTime'}
          image={['Team collaborating on project']}
          mainText={`Our Mission at ${projectName}`}
          subTitle={`At ${projectName}, we are committed to creating a balanced digital experience for children. Our team is passionate about integrating learning, play, and well-being through innovative AI solutions.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <FeaturesSection
          projectName={'BuddyTime'}
          image={['Children using BuddyTime app']}
          withBg={0}
          features={features_points}
          mainText={`Innovative Features of ${projectName}`}
          subTitle={`Explore the cutting-edge features of ${projectName} that make it a unique tool for balancing screen time and learning for children.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'BuddyTime'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`Hear from Our Happy Users `}
        />

        <ContactFormSection
          projectName={'BuddyTime'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`We'd love to hear from you! Reach out to us with any questions or feedback, and our team will respond promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'BuddyTime'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
