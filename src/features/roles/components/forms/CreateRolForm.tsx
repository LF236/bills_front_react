import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Button } from '../../../common/components/button';
import { useNavigate } from 'react-router-dom';
import { Heading, Subheading } from '../../../common/components/heading';
import { Divider } from '../../../common/components/divider';
import { Text } from '../../../common/components/text';
import { ErrorMessage, Field, Label } from '../../../common/components/fieldset';
import { Input } from '../../../common/components/input';
import { Switch } from '../../../common/components/switch';
import { filterListPermissionsWithPermissionFromRol, orderPermissionsListByText } from '../../utils/roles-utils';
import { Checkbox, CheckboxField, CheckboxGroup } from '../../../common/components/checkbox';
import { useCreateRol } from '../../hooks/useCreateRol';

interface Props {
  permissionsList?: any[];
}

const CreateRolForm = ({
  permissionsList
} : Props) => {
  const [ localPermissionCheckedList, setLocalPermissionsCheckedList ] = useState<any[]>([]);
  const [ searchPermissionsText, setPermissionsText ] = useState<string>('');
  const [ localBlocking, setLocalBlocking ] = useState(false);
  const { handleCreateRol, loading, error, data } = useCreateRol();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/roles');
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required').max(15, 'Name must be at most 15 characters'),
    description: Yup.string().required('Description is required'),
    is_active: Yup.boolean().required('Status is required'),
    permissions: Yup.array().of(Yup.string()).optional()
  });

  const handleChangeCheckedPermission = (id: string, checked: boolean, setFieldValue: (field: string, value: any) => void) => {
    const updatedList = localPermissionCheckedList.map(permission => 
      permission.id === id ? { ...permission, checked } : permission
    );
    setLocalPermissionsCheckedList(updatedList);
    setFieldValue('permissions', updatedList.filter(p => p.checked).map(p => p.id));
  }

  useEffect(() => {
    if(searchPermissionsText.trim() === '') {
      const orderedList = filterListPermissionsWithPermissionFromRol(permissionsList || [], []);
      setLocalPermissionsCheckedList(orderedList);
    } else {
      const orderedList = orderPermissionsListByText(localPermissionCheckedList, searchPermissionsText);
      setLocalPermissionsCheckedList(orderedList);
    }
  }, [searchPermissionsText]);

  useEffect(() => {
    const filtered = filterListPermissionsWithPermissionFromRol(permissionsList || [], []);
    setLocalPermissionsCheckedList(filtered);
  }, [permissionsList]);

  useEffect(() => {
    if(error) {
      setLocalBlocking(false);
      setTimeout(() => {
        setLocalBlocking(false);
      }, 3000);
    } else if (data) {
      setLocalBlocking(false);
      handleClose();
    }
  }, [loading, error, data]);

  return (
    <Formik
      initialValues={{
        name: '',
        description: '',
        is_active: true,
        permissions: []
      }}
      validationSchema={ validationSchema }
      onSubmit={(val) => handleCreateRol(val)}
    >
      {({ errors, touched, setFieldValue, values, dirty }) => (
        <FormikForm>
          <div className='mx-auto max-w-4xl'>
            <Heading>Create Role</Heading>

            <Divider className='my-10 mt-6'/>

            <Field>
              <section className='grid gap-x-8 gap-y-6 sm:grid-cols-2'>
                <div className='space-y-1'>
                  <Subheading>Rol name</Subheading>
                  <Text>This name will be unique across the system.</Text>
                </div>

                <div>
                  <FormikField
                    name='name'
                    type='text'
                    autoComplete='off'
                    as={ Input }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('name', `${e.target.value}`.trim().toLowerCase())}
                    invalid={!!(errors.name && touched.name)}
                  />

                  <div className='min-h-[1.5.rem]'>
                    <ErrorMessage>
                      { errors.name && touched.name ? errors.name : ' ' }
                    </ErrorMessage>
                  </div>

                </div>
              </section>
            </Field>

            <Divider className='my-10' soft/>

            <Field>
              <section className='grid gap-x-8 gap-y-6 sm:grid-cols-2'>
                <div className='space-y-1'>
                  <Subheading>Active</Subheading>
                  <Text>Indicates whether the role is active or inactive.</Text>
                </div>

                <div className='space-y-4 flex justify-start items-start'>
                  <Switch
                    color='blue'
                    name='is_active'
                    checked={ values.is_active }
                    onChange={(val) => setFieldValue('is_active', val)}
                  />
                </div>
              </section>
            </Field>

            <Divider className='my-10' soft/>

            <Field>
              <section className='grid gap-x-8 gap-y-6 sm:grid-cols-2'>
                <div className='space-y-1'>
                  <Subheading>Description</Subheading>
                  <Text>A brief description of the role's purpose.</Text>
                </div>

                <div className='space-y-4'>
                  <FormikField
                    name='description'
                    type='textarea'
                    autoComplete='off'
                    as={ Input }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('description', `${e.target.value}`.trim())}
                    invalid={!!(errors.description && touched.description)}
                  />

                  <div className='min-h-[1.5rem]'>
                    <ErrorMessage>
                      { errors.description && touched.description ? errors.description : ' ' }
                    </ErrorMessage>
                  </div>
                </div>
              </section>
            </Field>

            <Divider className='my-10' soft/>

            <Field>
              <section className='grid gap-x-8 gap-y-6 sm:grid-cols-2'>
                <div className='space-y-1'>
                  <Subheading>Permissions</Subheading>
                  <Text>Assign permissions to the role.</Text>
                  <Text>Total {localPermissionCheckedList.filter(p => p.checked).length}</Text>
                </div>

                <div className='space-y-4'>
                  <div>
                    <Input
                      placeholder='Search permissions... Enter to search'
                      value={searchPermissionsText}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPermissionsText(e.target.value)}
                      autoComplete='off'
                    />
                  </div>

                  <CheckboxGroup className='flex flex-col max-h-80 overflow-y-auto p-4'>
                    { localPermissionCheckedList.map((permission) => (
                      <CheckboxField key={permission.id}>
                        <Checkbox
                          value={ permission.id }
                          checked={ permission.checked }
                          onChange={(val) => handleChangeCheckedPermission(permission.id, val, setFieldValue)}
                        />
                        <Label>{ permission.name }</Label>
                      </CheckboxField>
                    )) }
                  </CheckboxGroup>
                </div>
              </section>
            </Field>
          </div>

          <div className='flex justify-end gap-4'>
            <Button
              className='bg-red-600'
              onClick={ handleClose }
            >
              Cancel
            </Button>

            <Button
              type='submit'
              disabled={ !dirty || loading || localBlocking }
            >
              Create Role
            </Button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}

export default CreateRolForm;