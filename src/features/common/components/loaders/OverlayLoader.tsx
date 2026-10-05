import { Transition } from '@headlessui/react';

interface OverlayLoaderProps {
  show: boolean;
}

export const OverlayLoader = ({ show }: OverlayLoaderProps) => {
  return (
    <Transition
      show={show}
      enter='transition-opacity duration-300 ease-out'
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leave='transition-opacity duration-200 ease-in'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
    <div className='absolute inset-0 z-50 flex flex-col items-center justify-center rounded-xl backdrop-blur-sm bg-black/60'>
      <div className='relative flex items-center justify-center'>
        <div className='absolute size-16 rounded-full border border-slate-500/20 animate-ping' />
        <div className='absolute size-12 rounded-full border border-slate-600/30' />
        <div className='size-8 rounded-full border-2 border-slate-700 border-t-slate-300 animate-spin' />
      </div>

      <div className='mt-6 flex flex-col items-center gap-1'>
        <span className='text-sm font-medium text-slate-200 tracking-wide'>
          Loading
        </span>
        <div className='flex gap-1'>
          <span className='size-1 rounded-full bg-slate-400 animate-bounce [animation-delay:0ms]' />
          <span className='size-1 rounded-full bg-slate-400 animate-bounce [animation-delay:150ms]' />
          <span className='size-1 rounded-full bg-slate-400 animate-bounce [animation-delay:300ms]' />
        </div>
      </div>
    </div>
    </Transition>
  );
};
