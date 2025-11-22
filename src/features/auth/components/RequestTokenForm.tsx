import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '../../common/components/dialog';
import { ErrorMessage, Field, Label } from '../../common/components/fieldset';
import { Button } from '../../common/components/button';
import { Input } from '../../common/components/input';
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import { useAlertStore } from '../../common/store/useAlertStore';
import { AuthService } from '../api/auth.service';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Text } from '../../common/components/text';
import { useLoadingStore } from '../../common/store/useLoadingStore';

interface Props {
  open: boolean;
  onClose?: (val: boolean) => void;
}

export const RequestTokenForm = ({ open, onClose }: Props) => {
  const addAlert = useAlertStore(state => state.addAlert);
  const [isOk, setIsOk] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const { setLoading, clearLoading } = useLoadingStore();
  
  
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });
  
  const handleSubmit = async (values: { email: string }) => {
    try {
      setLoading({
        title: 'Requesting New Token',
        subtitle: 'Please wait while we process your request.',
        type: 'fullscreen',
      });
      const response = await AuthService.requestNewToken(values.email);
      if (response) {
        addAlert({
          title: 'Token Requested',
          subtitle: 'A new token has been sent to your email address',
          type: 'success',
        });
        setIsOk(true);

        let counter = 5;
        const interval = setInterval(() => {
          counter -= 1;
          setCountdown(counter);
          if (counter <= 0) {
            clearInterval(interval);
            navigate('/auth/login');
          }
        }, 1000);
      }

    } catch (error: Error | any) {
      const err = error as Error;
      addAlert({
        title: 'Request Token Error',
        subtitle: err.message,
        type: 'error',
        showButtonClose: true,
        isWithTimeToClose: true,
        timeToClose: 2000,
      });
      setIsOk(false);
    } finally {
      clearLoading();
    }
  };

  return (
    <Dialog open={open} onClose={onClose && !isOk ? onClose : (() => {})} className='z-40'>
      <DialogTitle>Request a New Token</DialogTitle>
      <DialogDescription>
        To request a new token, please write to email account associated with your account.
        <br />
        If your token has expired, we will send you a new one.
        <br />
        Each 15 minutes, you can request a new token.
      </DialogDescription>
      
      <Formik
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <FormikForm>
            <DialogBody>
              <Field>
                <Label htmlFor="email">
                  Email
                </Label>

                <FormikField
                  as={Input}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  invalid={touched.email && !!errors.email}
                  disabled={isOk}
                />

                <div className='min-h-[1.5rem]'>
                  <ErrorMessage>
                    {touched.email && errors.email ? errors.email : ''}
                  </ErrorMessage>
                </div>
              </Field>
            </DialogBody>

            <DialogActions>
              {!isOk &&
                <Button type="submit" disabled={isOk}>
                  Request Token
                </Button>
              }

              {isOk &&
                <Text>
                  You will receive an email with the token shortly.
                  You will be redirected to the login page on {countdown} seconds.
                </Text>
              }
            </DialogActions>
          </FormikForm>
        )}
         
      </Formik>
    </Dialog>
  );
}