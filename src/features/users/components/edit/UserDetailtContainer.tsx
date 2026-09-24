import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from '../../../common/components/badge';
import UserDetailPersonalInformation from './UserDetailPersonalInformation';
import UserDetailRols from './UserDetailRols';
import { useGetUser } from '../../hooks/useGetUser';
import type { UserDetailInterface } from '../../domain/user-detail.interface';
import { ComonService } from '../../../common/api/comon.service';

export interface TabComponentProps {
  user: UserDetailInterface;
}

const tabs: { name: string; active: boolean; item: React.ComponentType<TabComponentProps> | null }[] = [
  {
    name: 'General Information',
    active: true,
    item: UserDetailPersonalInformation
  },
  {
    name: 'Rols',
    active: false,
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

interface Props {
  id: string;
}

const UserDetailtContainer = ({id} : Props) => {
  const [currentTab, setCurrentTab] = useState('General Information');
  const [userImage, setUserImage] = useState('');
  const { getUser, userData, loading, error, called } = useGetUser();
  const navigate = useNavigate();

  useEffect(() => {
    getUser(id);
  }, [id]);

  const handleTabChange = (tab: string) => {
    if(!tab) return;
    setCurrentTab(tab);
  }

  useEffect(() => {
    const getImage = async (url: string) => {
      const img = await ComonService.getImageWithToken(url);
      setUserImage(img);
    }
    
    if(userData && userData.avatarUrl) {
      getImage(userData.avatarUrl);
    }
  }, [userData]);

  const ActiveComponent = tabs.find(t => t.name === currentTab)?.item ?? null;

  if (!called || loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <div className='h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-white' />
          <p className='text-sm text-slate-400'>Loading user...</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-sm space-y-4 text-center'>
          <div className='bg-zinc-900 border border-slate-700 rounded-xl p-8 space-y-4'>
            <div className='flex justify-center'>
              <div className='size-12 rounded-full bg-red-500/10 flex items-center justify-center'>
                <svg viewBox="0 0 24 24" className='size-6 text-red-400 fill-none stroke-current' strokeWidth={1.5} strokeLinecap='round' strokeLinejoin='round'>
                  <path d='M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z' />
                </svg>
              </div>
            </div>
            <div>
              <h2 className='font-semibold text-white'>User not found</h2>
              <p className='text-sm text-slate-400 mt-1'>
                {error ? error.message : 'The requested user does not exist.'}
              </p>
            </div>
            <button
              onClick={() => navigate('/users')}
              className='flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 mx-auto'
            >
              <svg viewBox="0 0 16 16" className='size-4 fill-none stroke-current' strokeWidth={1.8} strokeLinecap='round' strokeLinejoin='round'>
                <path d='M10 3L5 8l5 5' />
              </svg>
              Back to users
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-start justify-center py-10'>
      <div className='w-full max-w-3xl space-y-6'>
        <div>
          <button
            onClick={() => navigate('/users')}
            className='flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200'
          >
            <svg viewBox="0 0 16 16" className='size-4 fill-none stroke-current' strokeWidth={1.8} strokeLinecap='round' strokeLinejoin='round'>
              <path d='M10 3L5 8l5 5' />
            </svg>
            Users
          </button>
        </div>
        <div>
          <div className='bg-zinc-900 rounded-t-xl p-6 flex justify-between gap-4 border border-slate-700'>
            <div className='flex gap-4'>
              <div className='relative'>
                <img
                  src={userImage}
                  alt='user_image'
                  className='w-20 h-16 sm-w-20 sm:h-20 rounded-full object-cover object-top'
                />
              </div>

              <div>
                <h2 className='font-semibold text-lg'>{userData?.name}</h2>
                <p className='text-sm text-slate-400'>{userData?.email}</p>
                <p className='text-sm text-slate-400 mt-1'>{userData?.id}</p>
              </div>
            </div>

            <div>
              <div>
              { userData?.is_active ? (
                <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 inset-ring inset-ring-gray-200 dark:text-white dark:inset-ring-white/10">
                  <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-green-500 dark:fill-green-400">
                    <circle r={3} cx={3} cy={3} />
                  </svg>
                  Active
                </span>
                ) : (
                <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 inset-ring inset-ring-gray-200 dark:text-white dark:inset-ring-white/10">
                  <svg viewBox="0 0 6 6" aria-hidden="true" className="size-1.5 fill-red-500 dark:fill-red-400">
                    <circle r={3} cx={3} cy={3} />
                  </svg>
                  Inactive
                </span>
                )
              }
              </div>

              <div>
                { (() => {
                  const roles = userData ?  userData.roles.map(item => item.name) : [];
                  const visible = roles.slice(0, 2);
                  const extra = roles.length - 2;
                  return (
                    <>
                      {visible.map(item => (
                        <Badge key={item} color='indigo' className='mr-1 !w-auto'>{item}</Badge>
                      ))}
                      {extra > 0 && (
                        <Badge color='indigo' className='mr-1 !w-auto'>+{extra}</Badge>
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
            {ActiveComponent && userData && <ActiveComponent user={userData} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetailtContainer;