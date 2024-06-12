import { Button } from '@/components/ui/button';
import React from 'react';
import CreateForm from './_components/CreateForm';

const Dashboard = () => {
  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold'>Dashboard</h2>
        <CreateForm />
      </div>
    </div>
  );
};

export default Dashboard;
