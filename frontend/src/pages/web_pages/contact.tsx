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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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

  const faqs = [
    {
      question: 'How can I reset my password?',
      answer:
        "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions to reset your password via email.",
    },
    {
      question: 'What devices are compatible with ${projectName}?',
      answer:
        '${projectName} is compatible with most smartphones and tablets running iOS and Android. Ensure your device is updated to the latest OS version for optimal performance.',
    },
    {
      question: 'How do I update my subscription plan?',
      answer:
        "You can update your subscription plan by logging into your account, navigating to the 'Subscription' section, and selecting the desired plan.",
    },
    {
      question: 'Is there a family plan available?',
      answer:
        'Yes, ${projectName} offers a family plan that allows multiple profiles under one account, providing personalized experiences for each child.',
    },
    {
      question: 'How do I contact customer support?',
      answer:
        'You can contact our customer support team through the contact form on this page or by emailing support@buddytime.com. We aim to respond within 24 hours.',
    },
    {
      question: 'Can I cancel my subscription at any time?',
      answer:
        'Yes, you can cancel your subscription at any time through your account settings. Your access will continue until the end of the current billing cycle.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - BuddyTime`}</title>
        <meta
          name='description'
          content={`Get in touch with the BuddyTime team for any inquiries or support. Find answers to common questions in our FAQ section.`}
        />
      </Head>
      <WebSiteHeader projectName={'BuddyTime'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'BuddyTime'}
          image={['Team discussing customer inquiries']}
          mainText={`Connect with the ${projectName} Team`}
          subTitle={`We're here to help! Reach out to us with any questions or feedback about ${projectName}. Our team is ready to assist you.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'BuddyTime'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'BuddyTime'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Person typing on keyboard']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need support? Send us a message anytime, and our team will respond promptly to assist you with ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'BuddyTime'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
