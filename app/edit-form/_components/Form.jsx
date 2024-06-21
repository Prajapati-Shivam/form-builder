import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import EditField from './EditField';
import themes from '@/app/_data/Themes';
import { Button } from '@/components/ui/button';

const Form = ({ form, updateField, deleteField, theme, editable = true }) => {
  let themeData = themes.find((t) => t.theme === theme);
  if (!themeData) {
    let fallback = {
      theme: 'light',
      'color-scheme': 'light',
      primary: 'oklch(49.12% 0.3096 275.75)',
      secondary: 'oklch(69.71% 0.329 342.55)',
      'secondary-content': 'oklch(98.71% 0.0106 342.55)',
      accent: 'oklch(76.76% 0.184 183.61)',
      neutral: '#f8fafc',
    };
    themeData = fallback;
  }

  return (
    <div
      className='border-2 shadow-lg p-5 rounded-lg md:w-[600px]'
      style={{
        backgroundColor: themeData.neutral,
        color: themeData['neutral-content'],
        borderColor: themeData.primary,
      }}
    >
      <h2
        className='font-bold text-2xl text-center'
        style={{ color: themeData.primary }}
      >
        {form.title}
      </h2>
      <p className='text-md text-center text-gray-400'>{form.description}</p>
      <div className='mt-5'>
        {form.fields.map((field, index) => (
          <div key={index} className='flex items-start'>
            {field.type === 'select' ? (
              <div className='my-4 w-full text-gray-900'>
                <div className='flex items-center justify-between mb-2'>
                  <Label
                    style={{
                      color: themeData['neutral-content'],
                    }}
                  >
                    {field.label}
                  </Label>
                  {editable && (
                    <EditField
                      defaultValue={field}
                      updateFields={(value) => updateField(value, index)}
                      deleteField={() => deleteField(index)}
                    />
                  )}
                </div>
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
              <div className='my-4 w-full'>
                <div className='flex items-center justify-between'>
                  <Label>{field.label}</Label>
                  {editable && (
                    <EditField
                      defaultValue={field}
                      updateFields={(value) => updateField(value, index)}
                      deleteField={() => deleteField(index)}
                    />
                  )}
                </div>
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
              <div className='my-4 w-full'>
                <div className='flex items-center justify-between'>
                  <Label>{field.label}</Label>
                  {editable && (
                    <EditField
                      defaultValue={field}
                      updateFields={(value) => updateField(value, index)}
                      deleteField={() => deleteField(index)}
                    />
                  )}
                </div>
                <RadioGroup>
                  {field.options.map((option, optionIndex) => (
                    <RadioGroupItem key={optionIndex} value={option.value}>
                      {option.label}
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              </div>
            ) : (
              <div className='my-4 w-full'>
                <div className='flex items-center justify-between'>
                  <Label>{field.label}</Label>
                  {editable && (
                    <EditField
                      defaultValue={field}
                      updateFields={(value) => updateField(value, index)}
                      deleteField={() => deleteField(index)}
                    />
                  )}
                </div>
                <Input
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  name={field.name}
                  className='mt-2 text-gray-900'
                />
              </div>
            )}
          </div>
        ))}
        <Button
          className='mt-4'
          style={{
            backgroundColor: themeData.primary,
            color: themeData['neutral-content'],
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Form;
