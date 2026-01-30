import { Formik, Form as FormikForm, Field as ForkikField } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useCreatePermission } from '../../../hooks/useCreatePermission';
import { useGetPermissions } from '../../../hooks/useGetPermissions';
import { usePermissionStore } from '../../../hooks/usePermissionStore';
import type { CreatePermissionInterface } from '../../../types/permissions-gpl-types';
import { ErrorMessage, Field, Label } from '../../../../common/components/fieldset';
import { Input } from '../../../../common/components/input';
import { Button } from '../../../../common/components/button';
import { Textarea } from '../../../../common/components/textarea';

const AddPermissionForm = () => {
  const { handleCreatePermission, loading, error, data } = useCreatePermission();
  const { getPermissions } = useGetPermissions();
  const [ localBlocking, setLocalBlocking ] = useState(false);
  const { closeModalAddPermission } = usePermissionStore();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').max(15, 'Name must be at most 15 characters'),
    description: Yup.string().required('Description is required')
  });

  const handleSubmit = (values: CreatePermissionInterface) => {
    handleCreatePermission(values);
  }

  useEffect(() => {
    if(error) {
      setLocalBlocking(true);
      setTimeout(() => {
        setLocalBlocking(false);
      }, 3000);
    } else if(data) {
      getPermissions();
      setLocalBlocking(false);
      closeModalAddPermission();
    }
  }, [loading, error, data]);

  return (
    <Formik
      initialValues={{ name: '', description: '' }}
      validationSchema={ validationSchema }
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <FormikForm>
          <Field>
            <Label htmlFor='name'>Name (Don't include spaces)</Label>
            <ForkikField
              name='name'
              type='text'
              autoComplete="off"
              as={Input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('name', `${e.target.value}`.trim())}
              invalid={!!(errors.name && touched.name)}
            />

            <div className='min-h-[1.5rem]'>
              <ErrorMessage>
                {errors.name && touched.name ? errors.name : ''}
              </ErrorMessage>
            </div>
          </Field>

          <Field>
            <Label htmlFor='description'>Description</Label>
            <ForkikField
              name='description'
              type='textarea'
              autoComplete="off"
              as={Textarea}
              invalid={!!(errors.description && touched.description)}
            />

            <div className='min-h-[1.5rem]'>
              <ErrorMessage>
                {errors.description && touched.description ? errors.description : ''}
              </ErrorMessage>
            </div>
          </Field>

          <div className='flex justify-end gap-2'>
            <Button className='mt-4 bg-red-600' onClick={closeModalAddPermission}>
              Cancel
            </Button>

            <Button type='submit' className='mt-4' disabled={loading || localBlocking}>
              Add Permission
            </Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}

export default AddPermissionForm;