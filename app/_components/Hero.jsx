import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <main
      style={{
        backgroundImage: 'url(./bbblurry.svg)',
        width: '100%',
        height: 'auto',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
      className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-full lg:items-center'
    >
      <div className='max-w-3xl mx-auto text-center'>
        <h1 className='bg-gradient-to-r from-green-300 via-indigo-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
          Create Forms with <span className='sm:block'>Power of AI</span>
        </h1>

        <p className='mx-auto mt-4 max-w-xl text-gray-700 sm:text-lg/relaxed'>
          Just provide the prompt and let the AI do the rest. No more manual
          form creation.
        </p>

        <div className='mt-8 flex flex-wrap justify-center gap-4'>
          <Link href='/dashboard'>
            <Button>Create AI Form</Button>
          </Link>
          <Link href='/'>
            <Button variant='outline'>Learn More</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Hero;
