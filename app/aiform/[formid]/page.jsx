'use client';
import Form from '@/app/edit-form/_components/Form';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { and, eq } from 'drizzle-orm';
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
      className='p-10 flex items-center justify-center h-full'
      style={
        record?.background === 'none' ? {} : { background: record?.background }
      }
    >
      {jsonForm && (
        <Form
          form={jsonForm}
          theme={record?.theme}
          handleUpdate={() => console.log()}
          deleteField={() => console.log()}
          editable={false}
        />
      )}
    </div>
  );
};

export default LivePreview;
