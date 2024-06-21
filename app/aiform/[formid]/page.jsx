'use client';
import Form from '@/app/edit-form/_components/Form';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { and, eq } from 'drizzle-orm';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const LivePreview = ({ params }) => {
  const [jsonForm, setJsonForm] = useState(null);
  const [record, setRecord] = useState(null); // Initialize to null
  let url = 'http:localhost:3000/dashboard';
  useEffect(() => {
    const GetFormData = async () => {
      const form = await db
        .select()
        .from(JsonForms)
        .where(eq(JsonForms.id, params.formid));

      if (form && form.length > 0) {
        const formRecord = form[0];
        setRecord(formRecord);
        setJsonForm(JSON.parse(formRecord.jsonform));
      }
    };
    GetFormData();
  }, [params]);

  return (
    <div
      className='p-10 flex items-center justify-center h-full'
      style={
        record?.background === 'none' ? {} : { background: record?.background }
      }
    >
      {jsonForm && (
        <Form
          form={jsonForm}
          theme={record?.theme}
          updateField={() => console.log()}
          deleteField={() => console.log()}
          editable={false}
        />
      )}
      <Link href={url}>
        <div className='flex bg-gray-900 text-blue-200 text-sm p-3 fixed bottom-4 left-4 rounded-full'>
          ✨ Build your AI form with formable.
        </div>
      </Link>
    </div>
  );
};

export default LivePreview;
