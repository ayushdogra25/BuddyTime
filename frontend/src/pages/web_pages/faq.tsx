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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'How does ${projectName} personalize learning experiences?',
      answer:
        "${projectName} uses AI to analyze your child's learning habits and preferences, creating tailored learning paths that adapt to their unique needs and interests.",
    },
    {
      question: "Can I monitor my child's screen time with ${projectName}?",
      answer:
        "Yes, ${projectName} provides real-time parental insights, allowing you to track your child's screen time and activity patterns to ensure a balanced digital lifestyle.",
    },
    {
      question: 'What age group is ${projectName} suitable for?',
      answer:
        '${projectName} is designed for children aged 6 to 12, offering age-appropriate content and activities that promote learning and healthy screen habits.',
    },
    {
      question: 'Is there a free trial available for ${projectName}?',
      answer:
        'Yes, we offer a free trial for new users to explore the features and benefits of ${projectName} before committing to a subscription plan.',
    },
    {
      question: "How secure is my family's data with ${projectName}?",
      answer:
        "We prioritize your privacy and security, using encrypted data storage and strict privacy policies to protect your family's information at all times.",
    },
    {
      question: 'Can multiple children use ${projectName} in one account?',
      answer:
        'Absolutely! ${projectName} supports multiple profiles within a single family account, allowing personalized settings and experiences for each child.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - BuddyTime`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about BuddyTime, including features, pricing, and more. Contact us for further inquiries.`}
        />
      </Head>
      <WebSiteHeader projectName={'BuddyTime'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'BuddyTime'}
          image={['Person reading FAQ document']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. Learn more about our features, pricing, and support.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'BuddyTime'}
          design={FaqDesigns.SPLIT_LIST || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'BuddyTime'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer support representative']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have more questions? Contact us anytime, and our support team will respond promptly to assist you with any inquiries about ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'BuddyTime'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
