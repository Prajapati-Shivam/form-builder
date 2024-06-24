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
      className='px-8 pt-10 pb-20 md:pt-10 md:pb-20 flex flex-col gap-2 items-center justify-center h-full'
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
          formId={params.formid}
        />
      )}
      <Link
        href={process.env.NEXT_PUBLIC_BASE_URL}
        className='flex bg-gray-900 text-blue-200 text-sm p-3 rounded-full fixed sm:left-4 bottom-4'
      >
        ✨ Build your AI form with formable.
      </Link>
    </div>
  );
};

export default LivePreview;
