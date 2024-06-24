'use client';
import React, { useEffect, useState } from 'react';
import CreateForm from './_components/CreateForm';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import { useFormStore } from '../_store/FormStore';
import FormListItem from './_components/FormListItem';

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
    <div className='p-6'>
      <div className='flex items-center justify-between'>
        <h2 className='text-3xl font-bold'>Dashboard</h2>
        <CreateForm />
      </div>
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loading ? (
          <p className='font-semibold text-lg text-center col-span-full'>
            Loading...
          </p>
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
