import React, { useEffect, useState } from 'react';
import { Dialog, DialogBody, DialogDescription, DialogTitle } from '../../common/components/dialog';
import { useNavigate } from 'react-router-dom';

interface Props {
  isOpen?: boolean;
  onClose?: (value: boolean) => void;
}

export const RegistrationCompleted = ({ isOpen = false, onClose }: Props) => {
  const [seconds, setSeconds] = useState(0);
  const navigate = useNavigate();
  
  useEffect(() => {
    if(isOpen) {
      setSeconds(5);
    }
  }, [isOpen]);

  useEffect(() => {
    if(seconds <= 0 && isOpen) {
      navigate('/auth/login');
      return;
    }
    const interval = setInterval(() => {
      setSeconds(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);
  
  return (
    <>
      <Dialog open={isOpen} onClick={() => {}} onClose={onClose || (() => {})}>
        <DialogTitle>
          Registration Completed Successfully!
        </DialogTitle>
        <DialogDescription>
          Please check your email to verify your account and complete the registration process.
        </DialogDescription>

        <DialogBody className='dark:text-white/50'>
          You'll be redirected to the login page once your email is verified. Redirecting in {seconds} seconds...
        </DialogBody>
      </Dialog>
    </>
  );
}
