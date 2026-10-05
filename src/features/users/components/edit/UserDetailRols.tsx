import { useEffect, useState } from 'react';
import { Badge } from '../../../common/components/badge';
import { Button } from '../../../common/components/button';
import { Input } from '../../../common/components/input';
import type { TabComponentProps } from './UserDetailtContainer';
import { useRolsStore } from '../../../roles/hooks/useRolsStore';
import { Formik, Form as FormikForm, type FormikHelpers } from 'formik';
import { useUpdateUserRoles } from '../../hooks/useUpdateUserRoles';
import type { UpdateUserRolesInterface } from '../../types/user-gql-types';

interface Rol {
  id: string;
  name: string;
}

const UserDetailRols = ({ user }: TabComponentProps) => {
  const { all: allRols } = useRolsStore();
  const [rolHandle, setRolHandle] = useState<Rol[]>([]);
  const [search, setSearch] = useState<string>('');
  const [localAllRols, setLocalAllRols] = useState<Rol[]>(allRols);
  const {handleUpdateUserRoles, loading, error, dataMutation: data} = useUpdateUserRoles();

  useEffect(() => {
    if(user) {
      if(user.roles) {
        setRolHandle(user.roles);
      }
    }
  }, [user, data]);

  useEffect(() => {
    if(search === '') {
      setLocalAllRols(allRols);
    } else {
      const filter = allRols.filter(item => item.name.includes(search));
      setLocalAllRols(filter);
    }
  }, [search]);

  const handleCancel = () => {
    setRolHandle(user.roles);
  }


  const toggleRol = (key: string, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
    const isSelected = rolHandle.some(r => r.id === key);
    if(isSelected) {
      const filtered = rolHandle.filter(item => item.id !== key);
      setRolHandle(filtered);
      setFieldValue('rolesSeletec', filtered.map(item => item.id));
    } else {
      const finded = allRols.find(item => item.id === key);
      if(finded) {
        const next = [...rolHandle, finded];
        setRolHandle(next);
        setFieldValue('rolesSeletec', next.map(item => item.id));
      }
    }
  };

  const handleDropRol = (id: string, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void) => {
    const filtered = rolHandle.filter(item => item.id !== id);
    setRolHandle(filtered);
    setFieldValue('rolesSeletec', filtered.map(item => item.id));
  }

  const handleSubmit = async (
    values: {rolesSeletec: string[]},
    { resetForm }: FormikHelpers<{rolesSeletec: string[]}>
  ) => {
    const formData : UpdateUserRolesInterface = {
      rolesIds: values.rolesSeletec,
      userId: user.id
    };

    await handleUpdateUserRoles(formData);
    resetForm({ values });
  }

  return (
    <Formik
      initialValues={{ rolesSeletec: user.roles.map(item => item.id)}}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, dirty, resetForm, values }) => (
      <FormikForm>
        <div className='rounded-xl border border-slate-700 overflow-hidden'>
          <div className='px-6 py-3 border-b border-slate-700'>
            <span className='text-xs font-semibold uppercase tracking-widest text-slate-400'>
              Assigned Rols
            </span>
          </div>

          <div className="flex items-center px-6 py-4 border-b border-slate-700">
            <div className='flex flex-wrap gap-2'>
              { rolHandle.map(rol => (
                <Badge key={rol.id} color='indigo' className='!w-auto'>
                  {rol.name}
                  <button
                    type='button'
                    className='ml-0.5 rounded-sm opacity-60 hover:opacity-100 transition-opacity'
                    onClick={() => handleDropRol(rol.id, setFieldValue)}
                  >
                    <svg viewBox="0 0 14 14" className="size-2 stroke-current" strokeWidth={2.5}>
                      <path d="M2 2l10 10M12 2L2 12" strokeLinecap="round" />
                    </svg>
                  </button>
                </Badge>
              )) }
            </div>
          </div>
        </div>
          
        <div className='rounded-xl border border-slate-700 overflow-hidden'>
          <div className='px-6 py-3 border-b border-slate-700 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center'>
            <div className='text-xs font-semibold uppercase tracking-widest text-slate-400'>
              Edit Rols
            </div>

            <div>
              <Input
                name='Search'
                type='text'
                placeholder='Search roles...'
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="px-6 py-3 border-b border-slate-700">
            <div className='text-xs text-slate-400'>
              Select the roles this user will have. This action will completely replace the current set of roles.         
            </div>

            <div className='py-3 flex flex-col gap-2'>
              {localAllRols.map(rol => {
                const isSelected = rolHandle.some(r => r.id === rol.id);
                return (
                  <button
                    key={rol.id}
                    type='button'
                    onClick={() => toggleRol(rol.id, setFieldValue)}
                    className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-950/50'
                        : 'border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className={`size-5 shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-slate-500'
                    }`}>
                      {isSelected && (
                        <svg viewBox="0 0 12 10" className="size-3 stroke-white fill-none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 5l3.5 3.5L11 1" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className='text-sm font-medium text-slate-200'>{rol.name}</div>
                      <div className='text-xs text-slate-400'>{'rol.description'}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className='px-6 py-3 border-b border-slate-700 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center'>
            {dirty ?
              <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 inset-ring inset-ring-gray-200 dark:text-white dark:inset-ring-white/10 self-start">
                <svg viewBox="0 0 6 6" aria-hidden="true" className="size-2 fill-amber-500 dark:fill-amber-400">
                  <circle r={3} cx={3} cy={3} />
                </svg>
                Unsaved changes
              </span>
              :
              <span className="inline-flex items-center gap-x-1.5 rounded-md px-2 py-1 text-xs font-medium text-gray-900 inset-ring inset-ring-gray-200 dark:text-white dark:inset-ring-white/10 self-start">
              </span>
            }

            <div className='flex items-center gap-4 sm:justify-end'>
              <Button
                className='bg-red-100 flex-1 sm:flex-none'
                onClick={() => {
                  handleCancel();
                  resetForm();
                }}
              >
                Cancel
              </Button>

              <Button
                type='submit'
                className='flex-1 sm:flex-none'
                disabled={!dirty || loading}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </FormikForm>
      )}
    </Formik>
  );
}

export default UserDetailRols;