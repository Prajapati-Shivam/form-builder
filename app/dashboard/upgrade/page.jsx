import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import React from 'react';

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    features: [
      'Limited Forms (3)',
      'Unlimited Responses',
      'Basic Themes',
      'Basic Backgrounds',
    ],
  },
  {
    name: 'Pro',
    price: '$10',
    features: [
      'Unlimited Forms',
      'Unlimited Responses',
      'Pro Themes',
      'Pro Backgrounds',
      'Custom CSS',
    ],
  },
];
const Upgrade = () => {
  return (
    <div className='p-4 md:p-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl md:text-3xl font-bold'>Upgrade</h2>
      </div>
      <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-center justify-center w-full'>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={
              'border-2 px-4 py-8 rounded-2xl flex flex-col items-center'
            }
          >
            <h2 className='font-medium text-lg'>{plan.name}</h2>
            <h3 className='font-semibold text-2xl'>{plan.price}</h3>
            <ul className='my-4'>
              {plan.features.map((feature, index) => (
                <div key={index} className='flex items-center'>
                  <Check className='size-5 mr-2' />
                  <li className='text-lg'>{feature}</li>
                </div>
              ))}
            </ul>
            <Button>Upgrade</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
