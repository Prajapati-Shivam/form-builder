import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

const Form = ({ form }) => {
  return (
    <div className='border p-5 rounded-lg md:min-w-[600px]'>
      <h2 className='font-bold text-2xl text-center text-primary'>
        {form.title}
      </h2>
      <p className='text-md text-center text-gray-600'>{form.description}</p>
      <div className='mt-5'>
        {form.fields.map((field, index) => (
          <div key={index}>
            {field.type === 'select' ? (
              <div className='my-4'>
                <Label>{field.label}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder='Select an option' />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((option, optionIndex) => (
                      <SelectItem key={optionIndex} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : field.type === 'checkbox' ? (
              <div className='my-4'>
                <Label>{field.label}</Label>
                {field.options.map((option, optionIndex) => (
                  <div
                    className='flex items-center space-x-2 my-2'
                    key={optionIndex}
                  >
                    <Checkbox id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </div>
            ) : field.type === 'radio' ? (
              <div className='my-4'>
                <Label>{field.label}</Label>
                <RadioGroup>
                  {field.options.map((option, optionIndex) => (
                    <RadioGroupItem key={optionIndex} value={option.value}>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </div>
            ) : (
              <div className='my-4'>
                <Label>{field.label}</Label>
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  name={field.name}
                  className='mt-2'
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
