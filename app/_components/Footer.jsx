import { Github, Globe, Linkedin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const socials = [
  {
    name: 'GitHub',
    url: 'https://github.com/Prajapati-Shivam',
    logo: Github,
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/shivam-prajapati-78590b225/',
    logo: Linkedin,
  },
  {
    name: 'Portfolio',
    url: 'https://shivam-react-portfolio.netlify.app/',
    logo: Globe,
  },
];
const Footer = () => {
  return (
    <footer>
      <div className='mt-16 bg-white px-4 sm:px-20 py-5 sm:flex sm:items-center sm:justify-between'>
        <p className='text-md text-center sm:text-start'>
          &copy; 2024 Formable. All rights reserved.
        </p>

        <ul className='mt-4 flex justify-center gap-6 sm:mt-0 lg:justify-end'>
          {socials.map((social) => (
            <li key={social.name}>
              <Link
                href={social.url}
                target='_blank'
                rel='noreferrer'
                className='text-gray-500 hover:text-gray-800'
              >
                <social.logo className='size-6' />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
