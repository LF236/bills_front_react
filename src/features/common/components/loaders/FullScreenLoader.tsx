import { Transition } from '@headlessui/react';
import { useLoadingStore } from '../../store/useLoadingStore';

export const FullScreenLoader = () => {
  const { loading } = useLoadingStore((state) => state);
  return (
    <Transition
      show={loading?.isLoading || false}
    >
      <div className='fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-50'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-white border-t-transparent'/>
        <div className='text-center mt-2'>
          <h2 className='dark:text-white text-black font-semibold text-xl' style={{ userSelect: 'none' }}>
            {loading?.title || 'Loading...'}
          </h2>

          <p className='dark:text-zinc-300 text-zinc-700 text-sm mt-2' style={{ userSelect: 'none' }}>
            {loading?.subtitle || 'Please wait while we load the content for you.'}
          </p>
        </div>
      </div>
    </Transition>
  )
};