import React from 'react'
import { Badge } from '../../../common/components/badge';


const UserDetailRols = () => {
  const rols = ['admin', 'user_admin'];

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
              <Badge key={rol} color='indigo'>
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
        <div className='px-6 py-3 border-b border-slate-700'>
          <div className='text-xs font-semibold uppercase tracking-widest text-slate-400'>
            Edit Rols
          </div>
        </div>
      </div>
    </>
  );
}

export default UserDetailRols;