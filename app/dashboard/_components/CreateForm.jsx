'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogClose,
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
import { toast } from 'sonner';
import { useFormStore } from '@/app/_store/FormStore';

function CreateForm() {
  const { user } = useUser();
  const forms = useFormStore((state) => state.forms);
  const navigate = useRouter();
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const COMMAND =
    'on basis of the description provided, create a form in JSON format with a title, description, and fields like field name, placeholder, label, type, and required. Give response in json format only';

  const handleSubmit = async (prompt) => {
    try {
      setLoading(true);
      const result = await chatSession.sendMessage(
        'Description: ' + prompt + ' ' + COMMAND
      );

      let jsonString = result.response.text().toString();
      jsonString = jsonString.replace(/^```json/, '');
      jsonString = jsonString.replace(/```$/, '');
      let formTitle = JSON.parse(jsonString).title;
      const response = await db
        .insert(JsonForms)
        .values({
          title: formTitle,
          jsonform: jsonString,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD/MM/YYYY'),
        })
        .returning({ id: JsonForms.id });
      if (response[0].id) {
        navigate.push(`/edit-form/${response[0].id}`);
      }
      toast.success('Form created successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to create form');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={forms.length === 3}>+ Create Form</Button>
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
          <DialogClose asChild>
            <Button variant='destructive'>Cancel</Button>
          </DialogClose>
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
