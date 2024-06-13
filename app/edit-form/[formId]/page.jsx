'use client';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Form from '../_components/Form';

const EditForm = ({ params }) => {
  const { user } = useUser();
  const navigate = useRouter();
  const [jsonForm, setJsonForm] = useState(null);

  useEffect(() => {
    const getFormData = async () => {
      if (!params?.formId || !user?.primaryEmailAddress?.emailAddress) return;

      const form = await db
        .select()
        .from(JsonForms)
        .where(
          and(
            eq(JsonForms.id, params.formId),
            eq(JsonForms.createdBy, user.primaryEmailAddress.emailAddress)
          )
        );

      if (form && form.length > 0) {
        setJsonForm(JSON.parse(form[0].jsonform));
      }
    };

    getFormData();
  }, [params?.formId, user?.primaryEmailAddress?.emailAddress]);

  return (
    <div className='p-10'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='border-2 rounded-lg shadow-md h-screen p-4'>
          <span className='ml-2 cursor-pointer' onClick={() => navigate.back()}>
            <ArrowLeft />
            Back
          </span>
          controller
        </div>
        <div className='md:col-span-2 border-2 rounded-lg p-5 h-full flex items-center justify-center'>
          {jsonForm ? <Form form={jsonForm} /> : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
