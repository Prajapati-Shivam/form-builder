import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
  return (
    <section className='bg-gray-50'>
      <div className='mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center'>
        <div className='mx-auto max-w-3xl text-center'>
          <h1 className='bg-gradient-to-r from-green-300 via-indigo-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl'>
            Create Forms with <span className='sm:block'>Power of AI</span>
          </h1>

          <p className='mx-auto text-gray-500 mt-4 max-w-xl sm:text-xl/relaxed'>
            Just provide the prompt and let the AI do the rest. No more manual
            form creation.
          </p>

          <div className='mt-8 flex flex-wrap justify-center gap-4'>
            <Link href='#'>
              <Button>Create AI Form</Button>
            </Link>
            <Link href='#'>
              <Button variant='outline'>Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
