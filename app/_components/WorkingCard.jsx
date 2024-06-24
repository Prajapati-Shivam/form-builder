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
            className='flex flex-col p-5 gap-y-2 bg-white border-2 border-primary rounded-lg shadow-md
            transition duration-300 ease-in-out transform hover:bg-primary hover:text-white group'
          >
            <step.logo className='size-20 text-primary group-hover:text-white' />
            <h3 className='text-xl font-semibold'>{step.title}</h3>
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
