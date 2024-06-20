'use client';
import React, { useEffect } from 'react';
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
import { useFormStore } from '../_store/FormStore';
import DeleteForm from './_components/DeleteForm';

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useRouter();
  const forms = useFormStore((state) => state.forms);
  const setForms = useFormStore((state) => state.setForms);

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
  }, [user?.primaryEmailAddress?.emailAddress, setForms]);

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
              <TableHead>Date</TableHead>
              <TableHead className='text-right'>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {forms.map((form, index) => (
              <TableRow
                key={form.id}
                className='cursor-pointer hover:text-primary'
              >
                <TableCell
                  onClick={() => navigate.push('/edit-form/' + form.id)}
                >
                  {index + 1}
                </TableCell>
                <TableCell
                  onClick={() => navigate.push('/edit-form/' + form.id)}
                >
                  {form?.title || `Form ${index + 1}`}
                </TableCell>
                <TableCell
                  onClick={() => navigate.push('/edit-form/' + form.id)}
                >
                  {form.createdBy}
                </TableCell>
                <TableCell
                  onClick={() => navigate.push('/edit-form/' + form.id)}
                >
                  {form.createdAt}
                </TableCell>
                <TableCell className='text-right'>
                  <DeleteForm formId={form.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Dashboard;
