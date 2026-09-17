import { useState } from 'react';
import { Badge } from '../../../common/components/badge';
import { Button } from '../../../common/components/button';
import { Input } from '../../../common/components/input';

type AvailableRol = {
  key: string;
  label: string;
  description: string;
};

const availableRols: AvailableRol[] = [
  { key: 'admin', label: 'admin', description: 'Acceso completo al panel de administración' },
  { key: 'user_admin', label: 'user_admin', description: 'Administración de usuarios del sistema' },
];

const UserDetailRols = () => {
  const rols = ['admin', 'user_admin'];
  const [selectedRols, setSelectedRols] = useState<string[]>([]);

  const toggleRol = (key: string) => {
    setSelectedRols(prev =>
      prev.includes(key) ? prev.filter(r => r !== key) : [...prev, key]
    );
  };

  return (
    <>
      <div className='rounded-xl border border-slate-700 overflow-hidden'>
        <div className='px-6 py-3 border-b border-slate-700'>
          <span className='text-xs font-semibold uppercase tracking-widest text-slate-400'>
            Assigned Rols
          </span>
        </div>

        <div className="flex items-center px-6 py-4 border-b border-slate-700">
          <div className='flex flex-wrap gap-2'>
            { rols.map(rol => (
              <Badge key={rol} color='indigo' className='!w-auto'>
                {rol}
                <button
                  type='button'
                  className='ml-0.5 rounded-sm opacity-60 hover:opacity-100 transition-opacity'
                  onClick={() => {}}
                >
                  <svg viewBox="0 0 14 14" className="size-2 stroke-current" strokeWidth={2.5}>
                    <path d="M2 2l10 10M12 2L2 12" strokeLinecap="round" />
                  </svg>
                </button>
              </Badge>
            )) }
          </div>
        </div>
      </div>

      <div className='rounded-xl border border-slate-700 overflow-hidden'>
        <div className='px-6 py-3 border-b border-slate-700 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center'>
          <div className='text-xs font-semibold uppercase tracking-widest text-slate-400'>
            Edit Rols
          </div>

          <div>
            <Input
              name='Search'
              type='text'
              placeholder='Search roles...'
            />
          </div>
        </div>

        <div className="px-6 py-3 border-b border-slate-700">
          <div className='text-xs text-slate-400'>
            Select the roles this user will have. This action will completely replace the current set of roles.         
          </div>

          <div className='py-3 flex flex-col gap-2'>
            {availableRols.map(rol => {
              const isSelected = selectedRols.includes(rol.key);
              return (
                <button
                  key={rol.key}
                  type='button'
                  onClick={() => toggleRol(rol.key)}
                  className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/50'
                      : 'border-slate-700 hover:border-slate-500'
                  }`}
                >
                  <div className={`size-5 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-500'
                      : 'border-slate-500'
                  }`}>
                    {isSelected && (
                      <svg viewBox="0 0 12 10" className="size-3 stroke-white fill-none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 5l3.5 3.5L11 1" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className='text-sm font-medium text-slate-200'>{rol.label}</div>
                    <div className='text-xs text-slate-400'>{rol.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className='px-6 py-3 border-b border-slate-700 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center'>
          <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 inset-ring inset-ring-gray-200 dark:text-white dark:inset-ring-white/10 self-start">
            <svg viewBox="0 0 6 6" aria-hidden="true" className="size-2 fill-amber-500 dark:fill-amber-400">
              <circle r={3} cx={3} cy={3} />
            </svg>
            Unsaved changes
          </span>

          <div className='flex items-center gap-4 sm:justify-end'>
            <Button
              className='bg-red-100 flex-1 sm:flex-none'
              onClick={() => alert('Cancel')}
            >
              Cancel
            </Button>

            <Button
              type='submit'
              className='flex-1 sm:flex-none'
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetailRols;