'use client';
import React, { useEffect, useState } from 'react';
import CreateForm from './_components/CreateForm';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { useFormStore } from '../_store/FormStore';
import FormListItem from './_components/FormListItem';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const forms = useFormStore((state) => state.forms);
  const setForms = useFormStore((state) => state.setForms);
  useEffect(() => {
    const getFormData = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    getFormData();
  }, [user?.primaryEmailAddress?.emailAddress, setForms]);

  return (
    <div className='md:p-6 p-4'>
      <div className='flex gap-y-2 sm:gap-0 flex-col sm:flex-row sm:items-center sm:justify-between'>
        <h2 className='text-2xl md:text-3xl font-bold'>Dashboard</h2>
        <CreateForm />
      </div>
      <div className='mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loading ? (
          <div className='font-semibold flex items-center gap-x-2 text-lg text-center col-span-full'>
            <Loader2 className='size-5 animate-spin' />
            <span>Loading...</span>
          </div>
        ) : forms.length > 0 ? (
          forms.map((form) => (
            <div key={form.id}>
              <FormListItem form={JSON.parse(form.jsonform)} formId={form.id} />
            </div>
          ))
        ) : (
          <p className='font-semibold text-lg text-center col-span-full'>
            You have not created any forms yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
