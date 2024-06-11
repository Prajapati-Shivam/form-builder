import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <div className='border-b p-5 shadow-sm'>
      <div className='flex items-center justify-between'>
        <Image src='logo.svg' alt='logo' width='100' height='100' />
        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
