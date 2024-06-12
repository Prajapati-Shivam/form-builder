'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/configs/AiModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

function CreateForm() {
  const { user } = useUser();
  const navigate = useRouter();
  const [userInput, setUserInput] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const COMMAND =
    'on basis of the description provided, create a form in JSON format with a title, description, and fields like field name, placeholder, label, type, and required. Give response in json format only';

  const handleSubmit = async (prompt) => {
    try {
      setLoading(true);
      const result = await chatSession.sendMessage(
        'Description: ' + prompt + ' ' + COMMAND
      );
      const response = await db
        .insert(JsonForms)
        .values({
          jsonform: result.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD/MM/YYYY'),
        })
        .returning({ id: JsonForms.id });
      console.log('form id: ', response[0].id);
      if (response[0].id) {
        navigate.push(`/edit-form/${response[0].id}`);
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>+ Create Form</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Form</DialogTitle>
          <DialogDescription>
            <Textarea
              onChange={(e) => setUserInput(e.target.value)}
              value={userInput}
              placeholder='Enter your prompt here...'
              className='my-4'
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type='submit'
            variant='destructive'
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button disabled={loading} onClick={() => handleSubmit(userInput)}>
            {loading ? (
              <>
                <LoaderCircle size={24} className='animate-spin' />
                <span className='ml-2'>Creating...</span>
              </>
            ) : (
              'Create Form'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateForm;
