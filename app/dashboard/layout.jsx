'use client';
import { SignedIn } from '@clerk/nextjs';
import SideNav from './_components/SideNav';

function DashboardLayout({ children }) {
  return (
    <SignedIn>
      <div>
        <div className='md:w-64 fixed'>
          <SideNav />
        </div>
        <div className='ml-16 md:ml-64'>{children}</div>
      </div>
    </SignedIn>
  );
}

export default DashboardLayout;
