import React, { useEffect } from 'react';
import * as Yup from 'yup';
import FileUpload from '../../../../common/components/fileUpload';
import { Formik, Form as FormikForm, Field as ForkikField } from 'formik';
import { ErrorMessage, Field, Label } from '../../../../common/components/fieldset';
import { Button } from '../../../../common/components/button';
import { useAccountStore } from '../../../../person/hooks/useAccountStore';
import { useUpdateAvatar } from '../../../hooks/useUpdateAvatar';

const ChangeProfileAvatarForm = () => {
  const { setOpenModalChangeProfile } = useAccountStore(state => state);
  const { submitAvatar, loading, error, sucefull } = useUpdateAvatar();

  const validationSchema = Yup.object({
    avatar: Yup.mixed()
      .required('An avatar image is required')
      .test('fileType', 'Unsupported File Format', (value: any) => {
        if (!value) return false;
        const supportedFormats = ['image/jpeg', 'image/png', 'image/gif'];
        return supportedFormats.includes(value.type);
      })
      .test('fileSize', 'File Size is too large. Max size is 5MB', (value: any) => {
        if (!value) return false;
        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        return value.size <= maxSizeInBytes;
      })
  })

  const handleSubmit = (values: any) => {
    submitAvatar(values.avatar);
  }

  const handleCloseModal = () => {
    setOpenModalChangeProfile(false);
  }

  useEffect(() => {
    if (sucefull) {
      setOpenModalChangeProfile(false);
    }
  }, [loading, error, sucefull]);

  return (
    <Formik
      initialValues={{ avatar: null }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, touched, errors }) => (
        <FormikForm>
          <Field>
            <Label htmlFor='avatar'>Upload a new profile picture</Label>

            <ForkikField
              as={FileUpload}
              setFieldValue={setFieldValue}
              name='avatar'
              invalid={!!(errors.avatar && touched.avatar)}
            />

            <div className='min-h-[1.5rem]'>
              <ErrorMessage>
                { errors.avatar && touched.avatar ? errors.avatar : '' }
              </ErrorMessage>
            </div>
          </Field>

          <div className='flex justify-end gap-2'>
            <Button
              className='mt-4 bg-red-600'
              onClick={handleCloseModal}
            >
              Cancel
            </Button>

            <Button type='submit' className='mt-4'>
              Update Avatar
            </Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}

export default ChangeProfileAvatarForm;