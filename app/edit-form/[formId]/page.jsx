'use client';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { ArrowLeft, Share2, SquareArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Form from '../_components/Form';
import { toast } from 'sonner';
import Controller from '../_components/Controller';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const EditForm = ({ params }) => {
  const { user } = useUser();
  const navigate = useRouter();
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [selectedBackground, setSelectedBackground] = useState('none');
  const [jsonForm, setJsonForm] = useState(null);
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const getFormData = async () => {
      if (!params?.formId || !user?.primaryEmailAddress?.emailAddress) return;

      try {
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
          const formRecord = form[0];
          setRecord(formRecord);
          setJsonForm(JSON.parse(formRecord.jsonform));
          setSelectedTheme(formRecord.theme);
          setSelectedBackground(formRecord.background);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
        toast(
          'An error occurred while fetching the form data. Please try again later'
        );
      }
    };

    getFormData();
  }, [params?.formId, user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    if (updateTrigger !== undefined) {
      updateJsonFormInDb();
    }
  }, [updateTrigger]);

  const handleUpdate = (value, index) => {
    const updatedForm = { ...jsonForm };
    updatedForm.fields[index].label = value.label;
    updatedForm.fields[index].placeholder = value.placeholder;
    setJsonForm(updatedForm);
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
      console.error('Error updating form:', error);
      toast('An error occurred. Please try again later');
    }
  };

  const deleteField = (index) => {
    try {
      const updatedForm = { ...jsonForm };
      updatedForm.fields.splice(index, 1);
      setJsonForm(updatedForm);
      setUpdateTrigger(Date.now());
      toast('Field deleted successfully');
    } catch (error) {
      console.error('Error deleting field:', error);
      toast('An error occurred. Please try again later');
    }
  };

  const updateController = async (value, colName) => {
    try {
      await db
        .update(JsonForms)
        .set({ [colName]: value })
        .where(
          and(
            eq(JsonForms.id, record.id),
            eq(JsonForms.createdBy, user.primaryEmailAddress.emailAddress)
          )
        );

      toast('Theme/Background updated successfully');
    } catch (error) {
      console.error('Error updating theme/background:', error);
      toast('An error occurred. Please try again later');
    }
  };

  return (
    <div className='px-8 py-4'>
      <div className='flex items-center justify-between mb-4'>
        <span
          className='cursor-pointer flex items-center gap-2 hover:font-semibold'
          onClick={() => navigate.back()}
        >
          <ArrowLeft className='size-5' />
          Back
        </span>
        <div className='flex gap-x-2'>
          <Link href={'/aiform/' + record?.id} target='_blank'>
            <Button>
              <SquareArrowUpRight className='size-5 mr-2' />
              Live Preview
            </Button>
          </Link>
          <Button className='bg-green-500 hover:bg-green-600'>
            <Share2 className='size-5 mr-2' />
            Share
          </Button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='border-2 rounded-lg shadow-md h-screen p-4'>
          <Controller
            selectedTheme={(value) => {
              updateController(value, 'theme');
              setSelectedTheme(value);
            }}
            selectedBackground={(value) => {
              setSelectedBackground(value);
              updateController(value, 'background');
            }}
          />
        </div>
        <div
          className='md:col-span-2 border-2 rounded-lg p-5 h-full flex items-center justify-center'
          style={{ backgroundColor: selectedBackground }}
        >
          {jsonForm ? (
            <Form
              form={jsonForm}
              theme={selectedTheme}
              handleUpdate={handleUpdate}
              deleteField={deleteField}
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
