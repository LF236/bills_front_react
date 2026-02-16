import * as Yup from 'yup';
import { Button } from '../../../common/components/button';
import { Checkbox, CheckboxField, CheckboxGroup } from '../../../common/components/checkbox';
import { Divider } from '../../../common/components/divider';
import { ErrorMessage, Field, Label } from '../../../common/components/fieldset';
import { Heading, Subheading } from '../../../common/components/heading';
import { Input } from '../../../common/components/input';
import { Switch } from '../../../common/components/switch';
import { Text } from '../../../common/components/text';
import { Textarea } from '../../../common/components/textarea';
import { Formik, Field as FormikField, Form as FormikForm } from 'formik';
import type { Rol } from '../../domain/rol.model';
import { useEffect, useState } from 'react';
import { useUpdateRol } from '../../hooks/useUpdateRol';
import { useNavigate } from 'react-router-dom';
import { filterListPermissionsWithPermissionFromRol, orderPermissionsListByText, plainArryPermissions } from '../../utils/roles-utils';

interface UpdateRolFormProps {
  permissionsList?: any[];
  rolToUpdateOrDelete?: Rol | null;
}

const UpdateRolForm = ({
  permissionsList = [],
  rolToUpdateOrDelete = null
} : UpdateRolFormProps) => {
  
  const [ localPermissionCheckedList, setLocalPermissionsCheckedList ] = useState<any[]>([]);
  const [ searchPermissionsText, setPermissionsText ] = useState<string>('');
  const [ localBlocking, setLocalBlocking ] = useState(false);
  const { handleUpdateRol, loading, error, data } = useUpdateRol();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/roles');
  }

  useEffect(() => {
    const filtered = filterListPermissionsWithPermissionFromRol(permissionsList, rolToUpdateOrDelete ? rolToUpdateOrDelete.permissions : []);
    setLocalPermissionsCheckedList(filtered);
  }, [rolToUpdateOrDelete, permissionsList]);

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
      const orderedList = filterListPermissionsWithPermissionFromRol(permissionsList, rolToUpdateOrDelete ? rolToUpdateOrDelete.permissions : []);
      setLocalPermissionsCheckedList(orderedList);
    } else {
      const orderedList = orderPermissionsListByText(localPermissionCheckedList, searchPermissionsText);
      setLocalPermissionsCheckedList(orderedList);
    }
  }, [searchPermissionsText]);

  useEffect(() => {
    if(error) {
      setLocalBlocking(true);
      setTimeout(() => {
        setLocalBlocking(false);
      }, 3000);
    } else if(data) {
      setLocalBlocking(false);
      handleClose();
    }
  },[loading, error, data]);
  
  return (
    <Formik
      initialValues={{
        name: rolToUpdateOrDelete?.name || '',
        description: rolToUpdateOrDelete?.description || '',
        is_active: rolToUpdateOrDelete?.is_active || false,
        permissions: rolToUpdateOrDelete?.permissions ? plainArryPermissions(rolToUpdateOrDelete.permissions) : []
      }}
      validationSchema={ validationSchema }
      onSubmit={(val) => handleUpdateRol({ ...val, id: rolToUpdateOrDelete!.id })}
    >
      {({ errors, touched, setFieldValue, values, dirty }) => (
        <FormikForm>
          <div className='mx-auto max-w-4xl'>
            <Heading>Update Role</Heading>
            <Divider className='my-10 mt-6' />
            <Field>
              <section className='grid gap-x-8 gap-y-6 sm:grid-cols-2'>
                <div className='space-y-1'>
                  <Subheading>Rol Name</Subheading>
                  <Text>This name will be unique across the system.</Text>
                </div>
                <div>
                  <FormikField
                    name='name'
                    type='text'
                    autoComplete='off'
                    as={Input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('name', `${e.target.value}`.trim().toLowerCase())}
                    invalid={!!(errors.name && touched.name)}
                  />
                  <div className='min-h-[1.5rem]'>
                    <ErrorMessage>
                      {errors.name && touched.name ? errors.name : ''}
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
                    checked={values.is_active}
                    onChange={(va) => setFieldValue('is_active', va)}
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
                    as={Textarea}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFieldValue('description', e.target.value)}
                    invalid={!!(errors.description && touched.description)}
                  />
                  <div className='min-h-[1.5rem]'>
                    <ErrorMessage>
                      {errors.description && touched.description ? errors.description : ''}
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
                  <Text>List of permissions assigned to this role.</Text>
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
                  <CheckboxGroup className='flex flex-col max-h-80 overflow-y-auto borderrounded-md p-4'>
                    { localPermissionCheckedList.map((permission) => (
                      <CheckboxField key={ permission.id }>
                        <Checkbox
                          value={ permission.id }
                          checked={ permission.checked }
                          onChange={(val) => {
                            handleChangeCheckedPermission(permission.id, val, setFieldValue);
                          }}
                        />
                        <Label>{ permission.name }</Label>
                      </CheckboxField>
                    )) }
                  </CheckboxGroup>
                </div>
              </section>
            </Field>

            <Divider className='my-10' soft/>

            <div className='flex justify-end gap-4'>
              <Button 
                className='bg-red-600'
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
              <Button 
                type='submit'
                disabled={localBlocking || loading || !dirty}
              >
                Update Role
              </Button>
            </div>
          
          </div>
        </FormikForm>
      )}
    </Formik>
  )
}

export default UpdateRolForm;