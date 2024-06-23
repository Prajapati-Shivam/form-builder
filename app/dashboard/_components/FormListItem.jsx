import { Edit, Share2 } from 'lucide-react';
import React from 'react';
import DeleteForm from './DeleteForm';
import Link from 'next/link';
import { RWebShare } from 'react-web-share';

const FormListItem = ({ form, formId }) => {
  return (
    <div className='hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]'>
      <div className='rounded-[10px] bg-white px-4 py-2'>
        <div className='flex justify-end mt-1 p-2'>
          <DeleteForm formId={formId} />
        </div>
        <h2 className='mt-1 text-lg font-medium text-gray-900'>{form.title}</h2>
        <p className='text-sm text-gray-500 line-clamp-2'>{form.description}</p>
        <hr className='my-2 border-gray-200' />
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-500'>{form.fields.length} fields</p>
          <div className='flex items-center gap-x-3'>
            <Link href={'/edit-form/' + formId}>
              <div className='rounded-full hover:bg-primary hover:text-white p-2 transition-colors duration-300 ease-in-out'>
                <Edit className='size-5' />
              </div>
            </Link>
            <div className='rounded-full hover:bg-green-500 hover:text-white p-2 transition-colors duration-300 ease-in-out'>
              <RWebShare
                data={{
                  text:
                    form.description + ' - Build your AI form with formable.',
                  url: process.env.NEXT_PUBLIC_BASE_URL + '/aiform/' + formId,
                  title: form.title,
                }}
              >
                <Share2 className='size-5' />
              </RWebShare>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormListItem;
