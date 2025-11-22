import { useNavigate, useParams } from 'react-router-dom';
import { Heading, Subheading } from '../../features/common/components/heading';
import { Text } from '../../features/common/components/text';
import { useEffect, useRef, useState } from 'react';
import { AuthService } from '../../features/auth/api/auth.service';
import { useAlertStore } from '../../features/common/store/useAlertStore';
import { useLoadingStore } from '../../features/common/store/useLoadingStore';
import { Button } from '../../features/common/components/button';
import { RequestTokenForm } from '../../features/auth/components/RequestTokenForm';

interface Props {
  children?: React.ReactNode;
}

export const ValidateTokenPage = ({ children }: Props) => {
  const params = useParams<{ token: string }>();
  const { token } = params as { token: string };
  const [isOk, setIsOk] = useState(false);
  const addAlert = useAlertStore(state => state.addAlert);
	const { setLoading, clearLoading } = useLoadingStore();
  const [openRequestTokenForm, setOpenRequestTokenForm] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const [emailValidated, setEmailValidated] = useState('');

  const dispatchCountdown = () => {
    let counter = 5;
    const interval = setInterval(() => {
      counter -= 1;
      setCountdown(counter);
      if (counter <= 0) {
        clearInterval(interval);
        navigate('/auth/login');
      }
    }, 1000);
  };

  useEffect(() => {
    const validte = async () => {
      setLoading({
        title: 'Validating Token',
        subtitle: 'Please wait while we validate your token.',
        type: 'fullscreen'
      });
      try {
        const res = await AuthService.validateToken(token);
        setEmailValidated(res.data.email ?? '');
        setIsOk(true);
        dispatchCountdown();
      } catch (error: Error | any) {
        const err = error as Error;
        setIsOk(false);
        addAlert({ 
          title: 'Validate Token Error',
          subtitle: err.message,
          type: 'error',
          showButtonClose: true,
        });
        return;
      } finally {
        clearLoading();
      }
    }
    validte();
  }, [token]);


  const handeOpenRequestTokenForm = () => {
    setOpenRequestTokenForm(true);
  }

  return (
    <div className='flex min-h-dvh flex-col p-2'>
      <div className='flex grow items-center justify-center p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10'>
        <div className='grid w-full max-w-sm grid-cols-1 gap-8'>
          { !isOk ? (
           <>
              <Heading className='text-center'>
                Your token is invalid or has expired.
              </Heading>

              <Button onClick={handeOpenRequestTokenForm} className="w-full mt-4">
                Clic here to request a new token
              </Button>

              <RequestTokenForm open={openRequestTokenForm} onClose={() => setOpenRequestTokenForm(false)}/>
           </>
          )
            :
            <>
              <Heading>
                {emailValidated} your token has been validated successfully!
              </Heading>

              <Text>
                You will be redirected shortly
                ({countdown} seconds)
              </Text>  
            </>
          }
        </div>
      </div>
    </div>
  );
}