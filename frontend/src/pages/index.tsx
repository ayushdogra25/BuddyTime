import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  TestimonialsDesigns,
  FaqDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import TestimonialsSection from '../components/WebPageComponents/TestimonialsComponent';

import FaqSection from '../components/WebPageComponents/FaqComponent';

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
      name: 'Personalized Learning Plans',
      description:
        "Tailor study sessions and activities to your child's unique learning style and preferences. Enhance their educational journey with customized recommendations.",
      icon: 'mdiSchool',
    },
    {
      name: 'Parental Dashboard',
      description:
        "Monitor your child's progress and screen time with ease. Gain insights into their usage patterns and emotional well-being, all from a single dashboard.",
      icon: 'mdiViewDashboard',
    },
    {
      name: 'Dynamic Activity Suggestions',
      description:
        'Receive evolving recommendations for educational and offline activities. Keep your child engaged with a variety of fun and enriching experiences.',
      icon: 'mdiLightbulb',
    },
  ];

  const testimonials = [
    {
      text: "BuddyTime has transformed our family's routine. My kids are more engaged in learning and spend less time glued to screens. It's a game-changer!",
      company: 'FutureTech Innovations',
      user_name: 'Emily Johnson, Product Manager',
    },
    {
      text: "As a parent, I love how BuddyTime provides insights into my child's screen time and learning habits. It's like having a personal assistant for parenting!",
      company: 'TechSavvy Solutions',
      user_name: 'Michael Smith, CEO',
    },
    {
      text: "The personalized learning plans have made a huge difference for my son. He's more motivated and enjoys the activities suggested by BuddyTime.",
      company: 'EduGrowth Partners',
      user_name: 'Sarah Lee, Educational Consultant',
    },
    {
      text: "BuddyTime's dynamic activity suggestions keep my daughter entertained and learning. It's a fantastic tool for balancing screen time and play.",
      company: 'Innovate Learning Co.',
      user_name: 'David Brown, CTO',
    },
    {
      text: "I appreciate the parental dashboard feature. It gives me peace of mind knowing I can monitor my child's progress and well-being effortlessly.",
      company: 'FamilyFirst Tech',
      user_name: 'Jessica White, Marketing Director',
    },
    {
      text: "BuddyTime is a must-have for any parent looking to manage their child's screen time effectively. It's intuitive, engaging, and incredibly helpful.",
      company: 'SmartParent Solutions',
      user_name: 'Daniel Green, Operations Manager',
    },
  ];

  const faqs = [
    {
      question: 'How does BuddyTime personalize learning plans?',
      answer:
        "BuddyTime uses AI to analyze your child's learning habits and preferences. It then tailors study sessions and activities to match their unique style, ensuring an engaging and effective learning experience.",
    },
    {
      question: "Can I monitor my child's screen time with BuddyTime?",
      answer:
        "Yes, BuddyTime provides a parental dashboard where you can track your child's screen time, monitor their progress, and gain insights into their usage patterns and emotional well-being.",
    },
    {
      question: 'What types of activities does BuddyTime suggest?',
      answer:
        "BuddyTime offers a variety of activities, including educational games, offline play, and social interactions. The app dynamically suggests activities based on your child's mood and learning habits.",
    },
    {
      question: 'Is BuddyTime compatible with other parental control apps?',
      answer:
        "Yes, BuddyTime integrates with third-party parental control services, allowing you to manage your child's screen time and activities seamlessly alongside other tools you may already use.",
    },
    {
      question: 'How does BuddyTime ensure data privacy?',
      answer:
        "BuddyTime is committed to protecting your family's privacy. We use secure data encryption and adhere to strict privacy policies to ensure that your data is safe and only used to enhance your experience.",
    },
    {
      question: 'Can multiple children use BuddyTime in one family?',
      answer:
        'Absolutely! BuddyTime supports multiple parent-child groups, allowing each family to have a private account with personalized settings for each child.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`BuddyTime - AI-Powered Time Management for Kids`}</title>
        <meta
          name='description'
          content={`Discover BuddyTime, the AI-powered app that helps children balance screen time with educational and offline activities. Learn more about our features and how we promote a healthier lifestyle for kids.`}
        />
      </Head>
      <WebSiteHeader projectName={'BuddyTime'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'BuddyTime'}
          image={['Child enjoying balanced activities']}
          mainText={`Transform Screen Time with BuddyTime`}
          subTitle={`Empower your child with ${projectName}, the AI companion that balances screen time with learning and play. Foster a healthier lifestyle today.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'BuddyTime'}
          image={['Child using BuddyTime app']}
          withBg={0}
          features={features_points}
          mainText={`Explore ${projectName} Features`}
          subTitle={`Discover how ${projectName} helps children balance screen time with learning and play, promoting a healthier lifestyle.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'BuddyTime'}
          image={['Team working on BuddyTime']}
          mainText={`Meet the Vision Behind ${projectName}`}
          subTitle={`${projectName} is dedicated to fostering a balanced lifestyle for children. Our mission is to seamlessly integrate learning, play, and well-being through innovative AI technology.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <TestimonialsSection
          projectName={'BuddyTime'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Parents Say About ${projectName} `}
        />

        <FaqSection
          projectName={'BuddyTime'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'BuddyTime'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
