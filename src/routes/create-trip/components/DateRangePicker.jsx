import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';

export function DateRangePicker({ className, onRangeChange }) {
  const [range, setRange] = useState({ from: undefined, to: undefined });

  const handleSelect = (selectedRange) => {
    setRange(selectedRange);
    if (onRangeChange) {
      onRangeChange(selectedRange);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal p-4 text-sm border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              !range && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {range?.from ? (
              range.to ? (
                <>
                  {format(range.from, 'LLL dd, y')} - {format(range.to, 'LLL dd, y')}
                </>
              ) : (
                format(range.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4 bg-white z-50 rounded-lg border" align="start">
          <DayPicker
            initialFocus
            mode="range"
            defaultMonth={new Date()}
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={1}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
