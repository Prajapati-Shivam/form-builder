'use client';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';
import { userResponses } from '@/configs/schema';
import { db } from '@/configs';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

const ResponseItem = ({ form, formId }) => {
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const getResponses = async () => {
      try {
        const result = await db
          .select()
          .from(userResponses)
          .where(eq(userResponses.formRef, formId))
          .orderBy(userResponses.createdAt, 'desc');
        if (result) {
          const parsedResponses = result.map((res) =>
            JSON.parse(res.jsonResponse)
          );
          setResponses(parsedResponses);
        }
      } catch (error) {
        toast('An error occurred while fetching responses');
        console.error('Error fetching responses:', error);
      }
    };

    getResponses();
  }, [formId]);

  const exportToExcel = (responses) => {
    setLoading(true);
    const ws = XLSX.utils.json_to_sheet(responses);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Responses');
    XLSX.writeFile(wb, `${form.title}_responses.xlsx`);
    setLoading(false);
  };

  return (
    <div className='hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]'>
      <div className='rounded-[10px] bg-white px-4 py-2'>
        <h2 className='mt-1 text-lg font-medium text-gray-900'>{form.title}</h2>
        <p className='text-sm text-gray-500 line-clamp-2'>{form.description}</p>
        <hr className='my-2 border-gray-200' />
        <div className='flex items-center justify-between py-2'>
          <p className='text-sm text-gray-500'>
            {responses.length > 0
              ? `${responses.length} response(s)`
              : 'No responses yet.'}
          </p>
          <Button
            variant='secondary'
            disabled={loading || responses.length === 0}
            size='sm'
            onClick={() => exportToExcel(responses)}
          >
            {loading ? (
              <>
                <LoaderCircle className='animate-spin size-5' />
                <span className='ml-2'>Exporting...</span>
              </>
            ) : (
              'Export'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResponseItem;
