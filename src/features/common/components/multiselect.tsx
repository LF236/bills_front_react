import { Listbox } from '@headlessui/react';
import clsx from 'clsx';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

type Option = {
  id: string;
  name: string;
}

type MultiSelectProps = {
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}

export function MultiSelect({
  value,
  onChange,
  options,
  placeholder = 'Select options',
  disabled = false,
} : MultiSelectProps) {
  const selectedNames = options
    .filter(option => value.includes(option.id))
    .map(opt => opt.name);

  return (
    <Listbox value={value} onChange={onChange} multiple disabled={disabled}>
      <div className="relative">
        <Listbox.Button
          className={clsx(
            'relative w-full cursor-default rounded-md',
            'bg-zinc-900 text-zinc-100',
            'border border-zinc-700',
            'py-2 pl-3 pr-10 text-left shadow-sm',
            'focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
          )}
        >
          <span className="block truncate">
            {selectedNames.length ? selectedNames.join(', ') : placeholder}
          </span>

          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-zinc-400" />
          </span>
        </Listbox.Button>

        {/* Options */}
        <Listbox.Options
          className={clsx(
            'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md',
            'bg-zinc-900 text-zinc-100',
            'border border-zinc-700 shadow-lg',
            'focus:outline-none'
          )}
        >
          {options.map(option => (
            <Listbox.Option
              key={option.id}
              value={option.id}
              className={({ active }) =>
                clsx(
                  'relative cursor-pointer select-none py-2 pl-10 pr-4',
                  active
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-300'
                )
              }
            >
              {({ selected }) => (
                <>
                  <span
                    className={clsx(
                      'block truncate',
                      selected && 'font-medium text-white'
                    )}
                  >
                    {option.name}
                  </span>

                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                      <CheckIcon className="h-5 w-5" />
                    </span>
                  )}
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
