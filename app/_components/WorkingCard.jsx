import { Atom, Edit, Share2 } from 'lucide-react';
import React from 'react';

const steps = [
  {
    step: 1,
    title: 'Enter a prompt',
    description: 'Enter a prompt about the form you want to create.',
    logo: Atom,
  },
  {
    step: 2,
    title: 'Edit fields',
    description: 'Edit or Delete the fields in the form to your liking.',
    logo: Edit,
  },
  {
    step: 3,
    title: 'Share your form',
    description: 'Share your form with others and get responses.',
    logo: Share2,
  },
];
const WorkingCard = () => {
  return (
    <div className='flex flex-col items-center justify-center px-4 sm:px-20 mt-8 pb-20'>
      <h2 className='text-3xl font-bold sm:text-5xl my-4'>How it works</h2>
      <div className='grid grid-cols-1 gap-5 my-8 sm:grid-cols-3'>
        {steps.map((step) => (
          <div
            key={step.step}
            className='flex flex-col p-4 gap-y-2 bg-white border-2 border-primary rounded-lg shadow-md
            transition duration-300 ease-in-out transform hover:bg-primary hover:text-white group relative overflow-hidden'
          >
            <step.logo className='size-20 text-primary transition-transform duration-300 group-hover:-rotate-12 group-hover:text-white absolute top-0 right-0' />
            <h3 className='text-xl font-semibold mt-5'>{step.title}</h3>
            <p className='text-gray-800 group-hover:text-gray-200'>
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkingCard;
