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
  PricingDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const pricing_features = {
    standard: {
      features: ['Personalized Learning Paths', 'Real-Time Parental Insights'],
      limited_features: [
        'Basic Activity Suggestions',
        'Limited Integration Options',
      ],
    },
    premium: {
      features: [
        'All Standard Features',
        'Advanced Activity Suggestions',
        'Full Integration Options',
      ],
      also_included: ['Mood-Based Recommendations', 'Priority Support'],
    },
    business: {
      features: [
        'All Premium Features',
        'Customizable Learning Modules',
        'Dedicated Account Manager',
        'Comprehensive Analytics',
      ],
    },
  };

  const description = {
    standard:
      'The Standard plan is perfect for individual families looking to balance screen time with learning and play for their children.',
    premium:
      'The Premium plan is ideal for small businesses or startups that want enhanced features and support for managing multiple children or groups.',
    business:
      'The Business plan is designed for enterprises seeking comprehensive solutions with advanced customization and dedicated support for large-scale implementations.',
  };

  const features_points = [
    {
      name: 'Adaptive Learning Paths',
      description:
        "Our AI-driven system creates personalized learning paths tailored to each child's unique needs, ensuring effective and engaging educational experiences.",
      icon: 'mdiSchool',
    },
    {
      name: 'Real-Time Parental Insights',
      description:
        "Stay informed with real-time insights into your child's screen time and activity patterns, helping you make informed decisions about their digital habits.",
      icon: 'mdiChartBar',
    },
    {
      name: 'Interactive Activity Suggestions',
      description:
        'Receive dynamic suggestions for both online and offline activities that promote learning and physical activity, keeping your child engaged and active.',
      icon: 'mdiGamepadVariant',
    },
    {
      name: 'Seamless Integration',
      description:
        "Integrate with educational content providers and fitness trackers to create a comprehensive and holistic approach to your child's development.",
      icon: 'mdiPuzzleOutline',
    },
    {
      name: 'Mood-Based Recommendations',
      description:
        "Our app adapts to your child's mood, offering activities that match their emotional state, ensuring a balanced and enjoyable experience.",
      icon: 'mdiEmoticonHappy',
    },
    {
      name: 'Secure Family Accounts',
      description:
        'Enjoy peace of mind with secure, private accounts for each family, allowing personalized settings and data protection for every child.',
      icon: 'mdiLock',
    },
  ];

  const testimonials = [
    {
      text: 'BuddyTime has been a fantastic addition to our family routine. The personalized learning paths keep my kids engaged and excited about learning.',
      company: 'FamilyTech Innovations',
      user_name: 'Alice Johnson, Parent',
    },
    {
      text: "The real-time insights provided by BuddyTime are invaluable. I can easily monitor my child's screen time and ensure a healthy balance.",
      company: 'SmartParent Solutions',
      user_name: 'Mark Thompson, Software Developer',
    },
    {
      text: 'As a teacher, I recommend BuddyTime to all parents. It seamlessly integrates learning with play, making education fun and effective.',
      company: 'EduFuture Co.',
      user_name: 'Laura Smith, Educator',
    },
    {
      text: 'The mood-based recommendations are a game-changer. My son loves the activities tailored to his mood, and it keeps him happy and engaged.',
      company: 'HappyKids Tech',
      user_name: 'David Brown, Marketing Specialist',
    },
    {
      text: "BuddyTime's integration with fitness trackers encourages my kids to stay active. It's a holistic approach to their development.",
      company: 'ActiveFamily Solutions',
      user_name: 'Jessica Lee, Fitness Coach',
    },
    {
      text: "The secure family accounts give me peace of mind. I know my children's data is protected while they enjoy the app's features.",
      company: 'SafeTech Families',
      user_name: 'Robert Wilson, IT Specialist',
    },
  ];

  const faqs = [
    {
      question: 'What is included in the Standard plan?',
      answer:
        'The Standard plan includes personalized learning paths and real-time parental insights. It is designed for individual families looking to balance screen time with learning.',
    },
    {
      question: 'How does the Premium plan differ from the Standard plan?',
      answer:
        'The Premium plan offers all Standard features plus advanced activity suggestions, full integration options, mood-based recommendations, and priority support, ideal for small businesses or startups.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Yes, ${projectName} offers a free trial for new users to explore the features and see how it can benefit their family or organization before committing to a plan.',
    },
    {
      question: "How secure is my family's data with ${projectName}?",
      answer:
        "${projectName} prioritizes data security with encrypted storage and strict privacy policies, ensuring that your family's information is protected at all times.",
    },
    {
      question: 'Can I upgrade or downgrade my plan at any time?',
      answer:
        'Yes, you can easily upgrade or downgrade your plan through your account settings. Changes will take effect immediately, and you will be billed accordingly.',
    },
    {
      question: 'Does ${projectName} support multiple languages?',
      answer:
        'Currently, ${projectName} is available in English, but we are working on adding support for more languages to cater to a wider audience.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`BuddyTime Services - Empowering Balanced Learning`}</title>
        <meta
          name='description'
          content={`Explore the services offered by BuddyTime, including personalized learning plans, parental insights, and dynamic activity suggestions for children.`}
        />
      </Head>
      <WebSiteHeader projectName={'BuddyTime'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'BuddyTime'}
          image={['Child learning with BuddyTime']}
          mainText={`Unlock Potential with ${projectName} Services`}
          subTitle={`Discover how ${projectName} empowers children with personalized learning and balanced screen time. Explore our innovative services designed for a healthier lifestyle.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Services`}
        />

        <PricingSection
          projectName={'BuddyTime'}
          withBg={1}
          features={pricing_features}
          description={description}
        />

        <FeaturesSection
          projectName={'BuddyTime'}
          image={['Kids enjoying BuddyTime features']}
          withBg={0}
          features={features_points}
          mainText={`Explore ${projectName} Core Features`}
          subTitle={`Discover the innovative features of ${projectName} that help balance screen time with learning and play for children.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'BuddyTime'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL_DIVERSITY || ''}
          testimonials={testimonials}
          mainText={`What Our Users Say About ${projectName} `}
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
