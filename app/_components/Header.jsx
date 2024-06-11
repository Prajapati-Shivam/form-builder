'use client';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className='border-b p-5 shadow-sm'>
      <div className='flex items-center justify-between'>
        <Image src='logo.svg' alt='logo' width='100' height='100' />
        {isSignedIn ? (
          <div className='flex items-center gap-x-4'>
            <Link href={'/dashboard'}>
              <Button>Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button>Get Started</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};

export default Header;
