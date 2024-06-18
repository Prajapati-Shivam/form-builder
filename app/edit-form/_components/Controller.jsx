import themes from '@/app/_data/Themes';
import backgrounds from '@/app/_data/Backgrounds';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const Controller = ({ selectedTheme, selectedBackground }) => {
  const [showMore, setShowMore] = useState(6);
  return (
    <div>
      <h2 className='font-semibold text-xl my-2'>Select Theme</h2>
      <Select onValueChange={(value) => selectedTheme(value)}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Theme' />
        </SelectTrigger>
        <SelectContent>
          {themes.map((theme, index) => (
            <SelectItem key={index} value={theme.theme}>
              <div className='flex items-center '>
                <div
                  className='size-5 rounded-l-md'
                  style={{
                    backgroundColor: theme.primary,
                    color: theme['primary-content'] || '#000000',
                  }}
                ></div>
                <div
                  className='size-5'
                  style={{
                    backgroundColor: theme.secondary,
                  }}
                ></div>
                <div
                  className='size-5'
                  style={{
                    backgroundColor: theme.accent,
                  }}
                ></div>
                <div
                  className='size-5 rounded-r-md'
                  style={{
                    backgroundColor: theme.neutral,
                  }}
                ></div>
                <span className='uppercase font-medium text-md ml-4'>
                  {theme.theme}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <h2 className='font-semibold text-xl my-2'>Select Background</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
        {backgrounds.map(
          (background, index) =>
            index < showMore && (
              <div key={index} value={background.name} className='group'>
                <div
                  onClick={() => selectedBackground(background.color)}
                  className='w-full h-16 rounded-lg cursor-pointer hover:ring-2 ring-black ring-offset-2 flex items-center justify-center uppercase font-medium text-md text-white'
                  style={{
                    background: background.color,
                    color:
                      background.color === 'hsla(0, 0%, 0%, 1)'
                        ? '#fff'
                        : '#000',
                  }}
                >
                  <span className='text-center text-sm hidden group-hover:block'>
                    {background.name}
                  </span>
                </div>
              </div>
            )
        )}
      </div>
      <Button
        variant='ghost'
        onClick={() => setShowMore(showMore === 6 ? backgrounds.length : 6)}
        className='w-full mt-4'
      >
        {showMore === 6 ? 'Show More' : 'Show Less'}
      </Button>
    </div>
  );
};

export default Controller;
