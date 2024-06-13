'use client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LibraryBig, LineChart, MessageSquare, Shield } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

function SideNav() {
  const menuList = [
    {
      id: 1,
      name: 'My Forms',
      icon: LibraryBig,
      path: '/dashboard',
    },
    {
      id: 2,
      name: 'Responses',
      icon: MessageSquare,
      path: '/dashboard/responses',
    },
    {
      id: 3,
      name: 'Analytics',
      icon: LineChart,
      path: '/dashboard/analytics',
    },
    {
      id: 4,
      name: 'Upgrade',
      icon: Shield,
      path: '/dashboard/upgrade',
    },
  ];
  const path = usePathname();
  useEffect(() => {}, [path]);
  return (
    <div className='border-2 shadow-md h-screen'>
      <div className='p-4'>
        {menuList.map((menu) => (
          <div
            key={menu.id}
            className={`p-3 mb-3 rounded-lg flex items-center gap-4 hover:bg-primary hover:text-white cursor-pointer transition-colors duration-300 ease-in-out text-sm font-semibold leading-5 hover:shadow-md ${
              path == menu.path && 'bg-primary text-white font-bold'
            }`}
          >
            <menu.icon size='24' />
            <span>{menu.name}</span>
          </div>
        ))}
      </div>
      <div className='fixed bottom-0 p-4 w-64'>
        <Button className='w-full'>+ Create Form</Button>
        <div className='my-4'>
          <Progress value={70} />
          <p className='mt-2 text-gray-600 text-sm'>
            <strong>2</strong> out of <strong>3</strong> forms created
          </p>
          <p className='text-sm text-gray-600 mt-2'>
            <strong>Upgrade</strong> to create unlimited forms
          </p>
        </div>
      </div>
    </div>
  );
}

export default SideNav;
