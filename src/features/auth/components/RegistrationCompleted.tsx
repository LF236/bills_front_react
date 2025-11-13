import React, { useEffect, useState } from 'react';
import { Dialog, DialogBody, DialogDescription, DialogTitle } from '../../common/components/dialog';

interface Props {
  isOpen?: boolean;
  onClose?: (value: boolean) => void;
}


export const RegistrationCompleted = ({ isOpen = false, onClose }: Props) => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    if(isOpen) {
      setSeconds(8);
    }
  }, [isOpen]);


  useEffect(() => {
    if(seconds <= 0) return;
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

        <DialogBody>
          You'll be redirected to the login page once your email is verified. Redirecting in {seconds} seconds...
        </DialogBody>

      </Dialog>
    </>
  );
}
