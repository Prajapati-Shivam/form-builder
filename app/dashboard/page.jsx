'use client';
import React, { useEffect, useState } from 'react';
import CreateForm from './_components/CreateForm';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [forms, setForms] = useState([]);
  const { user } = useUser();
  const navigate = useRouter();

  useEffect(() => {
    const getFormData = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      try {
        const form = await db
          .select()
          .from(JsonForms)
          .where(
            eq(JsonForms.createdBy, user.primaryEmailAddress.emailAddress)
          );

        if (form && form.length > 0) {
          setForms(form);
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    getFormData();
  }, [user?.primaryEmailAddress?.emailAddress]);

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold'>Dashboard</h2>
        <CreateForm />
      </div>
      <div className='mt-6'>
        <Table>
          <TableCaption>A list of your created forms.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Sr. No.</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead className='text-right'>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.map((form, index) => (
              <TableRow
                key={index}
                onClick={() => navigate.push('/edit-form/' + form.id)}
                className='cursor-pointer hover:text-primary'
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>Form {index + 1}</TableCell>
                <TableCell>{form.createdBy}</TableCell>
                <TableCell className='text-right'>{form.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
