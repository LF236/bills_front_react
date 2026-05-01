import React, { useState } from 'react'
import EditUserForm from './forms/EditUserForm';
import EditPersonForm from './forms/EditPersonForm';
import { useAccountStore } from '../../../person/hooks/useAccountStore';
import { useAuth } from '../../../auth/hooks/useAuth';

const tabs = ['General', 'Profile Information', 'Notifications', 'Manage', 'Privacy', 'Alerts'];

const ProfileContainer = () => {
  const [currentTab, setCurrentTab] = useState('General');
  const { setOpenModalChangeProfile } = useAccountStore( state => state );
  const { profileImageUrl } = useAuth();

  const handleTabChange = (tab: string) => {
    if(!tab) return
    setCurrentTab(tab);
  }
  
  const handleOpenModalChangeProfile = () => {
    setOpenModalChangeProfile(true);
  }

  return (
    <div className='min-h-screen flex items-start justify-center py-10'>
      <div className='w-full max-w-3xl space-y-6'>
        <div>
          <h1 className='text-2xl font-semibold'>
            Settings
          </h1>
        </div>
 
        <div>
          <div className='bg-zinc-900 rounded-t-xl p-6 flex items-center gap-4 border border-slate-700'>
            <div className='relative cursor-pointer hover:transition-opacity duration-300 opacity-80 hover:opacity-100'>
              <img 
                src={profileImageUrl!}
                alt='User avatar'
                className='w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover object-top'
                onClick={handleOpenModalChangeProfile}
              />
              <button
                className='absolute bottom-0 right-0 p-1 rounded-full text-xs'
              >
                📷
              </button>
            </div>

            <div>
              <h2 className='font-semibold text-lg'>Luis Fernando</h2>
              <p className='text-sm text-slate-400'>fernandorodriguez@f8.com</p>
            </div>
          </div>

          <div className='bg-zinc-900 rounded-b-xl border border-slate-700 border-t-0 px-4'>
            <div className='flex gap-6 text-sm'>
              { tabs.map((tab, i) => (
                <button
                  key={tab}
                  className={`py-3 border-b-2 transition-colors duration-300
                    ${ currentTab === tab ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:text-white' }  
                  `}
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </button>
              )) }
            </div>
          </div>

          <div className="bg-zinc-900 rounded-xl border border-slate-700 p-6 space-y-4 mt-2 animate-in fade-in duration-300">
            {
              currentTab === 'General' && <EditUserForm />
            }
            {
              currentTab === 'Profile Information' && <EditPersonForm />
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileContainer;