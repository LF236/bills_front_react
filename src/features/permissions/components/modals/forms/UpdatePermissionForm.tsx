import { Formik, Form as FormikForm, Field as ForkikField } from 'formik';
import { Description, ErrorMessage, Field, Label } from '../../../../common/components/fieldset';
import * as Yup from 'yup';
import { Button } from '../../../../common/components/button';
import { usePermissionStore } from '../../../hooks/usePermissionStore';
import { Input } from '../../../../common/components/input';
import { Textarea } from '../../../../common/components/textarea';
import { Switch, SwitchField, SwitchGroup } from '../../../../common/components/switch';
import { Select } from '../../../../common/components/select';
import { MultiSelect } from '../../../../common/components/multiselect';
import type { UpdatePermissionInterface } from '../../../types/permissions-gpl-types';
import { useUpdatePermission } from '../../../hooks/useUpdatePermission';
import { useEffect, useState } from 'react';

interface Props {
  id: string;
}

const UpdatePermissionForm = ({ id } : Props) => {
  const { idPermissionToUpdateOrDelete, closeUpdatePermissionModal, permissionToUpdateOrDelete } = usePermissionStore();
  const { handleUpdatePermission: handleUpdatePermissionRequest, loading, error, data } = useUpdatePermission();
  const [ localBlocking, setLocalBlocking] = useState(false);
  
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').max(15, 'Name must be at most 15 characters'),
    description: Yup.string().required('Description is required'),
    is_active: Yup.boolean().required('Status is required')
  });
  
  const handleCancel = () => {
    closeUpdatePermissionModal();
  }
 
  if(!permissionToUpdateOrDelete) {
    return <div>Invalid data provided</div>;
  }

  const handleUpdatePermission = (values: UpdatePermissionInterface) => {
    handleUpdatePermissionRequest(values);
  }

  useEffect(() => {
    if(error) {
      setLocalBlocking(true);
      setTimeout(() => {
        setLocalBlocking(false);
      }, 3000);
    } else if(data) {
      setLocalBlocking(false);
      closeUpdatePermissionModal();
    }
  }, [loading, error, data]);

  return (
    <Formik
      initialValues={{
        name: permissionToUpdateOrDelete.name,
        description: permissionToUpdateOrDelete.description,
        is_active: permissionToUpdateOrDelete.is_active,
        ids_roles: permissionToUpdateOrDelete.roles.map(role => role.id)
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        handleUpdatePermission({ ...values, id: idPermissionToUpdateOrDelete! });
      }}
    >
      {({ errors, touched, values, setFieldValue, dirty }) => (
        <FormikForm>
          <Field>
            <Label htmlFor='name'>Name</Label>
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
                {errors.name && touched.name && errors.name}
              </ErrorMessage>
            </div>
          </Field>

          <SwitchGroup className='flex mb-4'>
            <SwitchField className='flex items-center gap-4'>
              <Label htmlFor='is_active'>Is Active</Label>
              <Switch
                checked={values.is_active}
                onChange={(va) => setFieldValue('is_active', va)}
                name='is_active'
                color='blue'
              />
            </SwitchField>
          </SwitchGroup>

          <div className='mb-4'>
            <MultiSelect
              value={values.ids_roles}
              options={permissionToUpdateOrDelete.roles}
              disabled={true}
              placeholder={values.ids_roles.length === 0 ? 'No roles assigned' : 'Roles assigned'}
              onChange={() => {}}
            />
          </div>

          <Field>
            <Label htmlFor='description'>Description</Label>
            <ForkikField
              name='description'
              type='textarea'
              autoComplete='off'
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
            <Button className='mt-4 bg-red-600' onClick={handleCancel}>
              Cancel
            </Button>
            <Button type='submit' className='mt-4' disabled={loading || localBlocking || !dirty} title={dirty ? '' : 'No changes to update'}>
              Update Permission
            </Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}

export default UpdatePermissionForm;