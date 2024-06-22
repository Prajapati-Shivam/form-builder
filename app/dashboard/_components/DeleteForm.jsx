'use client';
import { Trash } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useFormStore } from '@/app/_store/FormStore';
import { db } from '@/configs';
import { JsonForms } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';

const DeleteForm = ({ formId }) => {
  const deleteForm = useFormStore((state) => state.deleteForm);
  const handleDelete = async (formId) => {
    try {
      await db.delete(JsonForms).where(eq(JsonForms.id, formId));
      deleteForm(formId);
      toast('Form deleted successfully');
    } catch (error) {
      console.error('Error deleting form:', error);
      toast(
        'An error occurred while deleting the form. Please try again later'
      );
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash className='size-5 text-red-500' />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this form?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(formId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteForm;
