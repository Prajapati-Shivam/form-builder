'use client';
import React, { useEffect, useState } from 'react';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import ResponseItem from './_components/ResponseItem';
import { useFormStore } from '@/app/_store/FormStore';

const Responses = () => {
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
        <h2 className='text-3xl font-bold'>Responses</h2>
      </div>
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loading ? (
          <p className='font-semibold text-lg text-center col-span-full'>
            Loading...
          </p>
        ) : forms.length > 0 ? (
          forms.map((form) => (
            <div key={form.id}>
              <ResponseItem form={JSON.parse(form.jsonform)} formId={form.id} />
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

export default Responses;
