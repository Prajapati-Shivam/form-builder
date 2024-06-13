'use client';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Form from '../_components/Form';
import { toast } from 'sonner';

const EditForm = ({ params }) => {
  const { user } = useUser();
  const navigate = useRouter();
  const [jsonForm, setJsonForm] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState();
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
        setRecord(form[0]);
        setJsonForm(JSON.parse(form[0].jsonform));
      }
    };

    getFormData();
  }, [params?.formId, user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const handleUpdate = (value, index) => {
    jsonForm.fields[index].label = value.label;
    jsonForm.fields[index].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());
  };

  const updateJsonFormInDb = async () => {
    try {
      await db
        .update(JsonForms)
        .set({ jsonform: JSON.stringify(jsonForm) })
        .where(
          and(
            eq(JsonForms.id, record.id),
            eq(JsonForms.createdBy, user.primaryEmailAddress.emailAddress)
          )
        );

      toast('Field updated successfully');
    } catch (error) {
      console.log(error);
      toast('An error occurred. Please try again later');
    }
  };

  const deleteField = (index) => {
    try {
      jsonForm.fields.splice(index, 1);
      setUpdateTrigger(Date.now());
      toast('Field deleted successfully');
    } catch (error) {
      console.log(error);
      toast('An error occurred. Please try again later');
    }
  };
  return (
    <div className='p-10'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='border-2 rounded-lg shadow-md h-screen p-4'>
          <span
            className='cursor-pointer flex items-center gap-2 hover:font-semibold'
            onClick={() => navigate.back()}
          >
            <ArrowLeft className='size-5' />
            Back
          </span>
          controller
        </div>
        <div className='md:col-span-2 border-2 rounded-lg p-5 h-full flex items-center justify-center'>
          {jsonForm ? (
            <Form
              form={jsonForm}
              handleUpdate={handleUpdate}
              deleteField={(index) => deleteField(index)}
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditForm;
