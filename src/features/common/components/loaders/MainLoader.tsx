import React from 'react'
import { FullScreenLoader } from './FullScreenLoader';
import { useLoadingStore } from '../../store/useLoadingStore';

export const MainLoader = () => {
  const { loading } = useLoadingStore((state) => state);
  return (
    <>
      {loading?.type === 'fullscreen' && <FullScreenLoader />}
    </>
  );
}