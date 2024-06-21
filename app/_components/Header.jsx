'use client';
import { Button } from '@/components/ui/button';
import { SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Header = () => {
  const { user, isSignedIn } = useUser();
  const path = usePathname();
  const pathsToExclude = ['/aiform', '/sign-in', '/sign-up'];

  const shouldExcludeHeader = pathsToExclude.some((excludedPath) =>
    path.includes(excludedPath)
  );

  if (shouldExcludeHeader) {
    return null;
  }

  return (
    <div className='border-b px-5 py-2 shadow-sm'>
      <div className='flex items-center justify-between'>
        <Link href={'/'}>
          <h1 className='logo cursor-pointer font-sans'>formable</h1>
        </Link>
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
