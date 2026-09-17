import { useEffect, useState } from 'react';
import { Badge } from '../../../common/components/badge';
import UserDetailPersonalInformation from './UserDetailPersonalInformation';
import UserDetailRols from './UserDetailRols';

const tabs = [
  {
    name: 'General Information',
    active: true,
    item: UserDetailPersonalInformation
  },
  {
    name: 'Rols',
    active: true,
    item: UserDetailRols
  },
  {
    name: 'Stats',
    active: false,
    item: null
  },
  {
    name: 'Settings',
    active: false,
    item: null
  }
]

const UserDetailtContainer = () => {
  const [currentTab, setCurrentTab] = useState('General Information');
  const [renderElement, setRenderElement] = useState(<></>);

  const handleTabChange = (tab: string) => {
    if(!tab) return;
    setCurrentTab(tab);
  }

  useEffect(() => {
    const newElement = tabs.find(item => item.name === currentTab);
    if(!newElement || newElement.item === null) return;
    setRenderElement(newElement.item);
  }, [currentTab]);

  return (
    <div className='min-h-screen flex items-start justify-center py-10'>
      <div className='w-full max-w-3xl space-y-6'>
        <div>
          <div className='bg-zinc-900 rounded-t-xl p-6 flex justify-between gap-4 border border-slate-700'>
            <div className='flex gap-4'>
              <div className='relative'>
                <img
                  src='https://media.licdn.com/dms/image/v2/D5603AQG6e43laPl1gQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1699476609077?e=1790208000&v=beta&t=BSGQc_uDtf07aWriEYIM2xqLtlqE2HEMLDTBQfkn3KE'
                  alt='user_image'
                  className='w-16 h-16 sm-w-20 sm:h-20 rounded-full object-cover object-top'
                />
              </div>

              <div>
                <h2 className='font-semibold text-lg'>Luis Fernando</h2>
                <p className='text-sm text-slate-400'>fernandorodriguez@f8.com</p>
                <p className='text-sm text-slate-400 mt-1'>3f8d2c1a-e47b-4a9d-bc12-5e60f91a2d08</p>
              </div>
            </div>

            <div>
              <div>
                <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 inset-ring inset-ring-gray-200 dark:text-white dark:inset-ring-white/10">
                  <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-green-500 dark:fill-green-400">
                    <circle r={3} cx={3} cy={3} />
                  </svg>
                  Active
                </span>
              </div>

              <div>
                { (() => {
                  const roles = ['admin', 'user_admin', 'biller', 'aux', 'fer', 'holano', 'comoestas'];
                  const visible = roles.slice(0, 2);
                  const extra = roles.length - 2;
                  return (
                    <>
                      {visible.map(item => (
                        <Badge key={item} color='indigo' className='mr-1'>{item}</Badge>
                      ))}
                      {extra > 0 && (
                        <Badge color='indigo' className='mr-1'>+{extra}</Badge>
                      )}
                    </>
                  );
                })() }
              </div>
            </div>
          </div>

          <div className='bg-zinc-900 rounded-b-xl border border-slate-700 border-t-0 px-4'>
            <div className='flex gap-6 text-sm'>
              { tabs.map((item: { active: boolean, name: string }) => (
                <button
                  key={item.name}
                  disabled={!item.active}
                  className={`flex items-center gap-2 py-3 border-b-2 transition-colors duration-300
                    ${ !item.active ? 'cursor-not-allowed' : '' }
                    ${ currentTab === item.name ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white' }
                  `}
                  onClick={() => handleTabChange(item.name)}
                >
                  <span className={!item.active ? 'opacity-40' : ''}>{item.name}</span>
                  {!item.active && (
                    <span className='text-[9px] font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/25 rounded px-1.5 py-0.5 leading-none tracking-wide'>
                      Soon
                    </span>
                  )}
                </button>
              )) }
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl border border-slate-700 p-6 space-y-4 mt-2 animate-in fade-in duration-300">
            {renderElement}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailtContainer;