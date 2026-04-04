import React, { useState } from 'react';
import { Formik, Form as FormikForm, Field as FormikField } from 'formik';
import * as Yup from 'yup';
import { Heading, Subheading } from '../../../common/components/heading';
import { Divider } from '../../../common/components/divider';
import { ErrorMessage, Field, Label } from '../../../common/components/fieldset';
import { Text } from '../../../common/components/text';
import { Input } from '../../../common/components/input';
import { Select } from '../../../common/components/select';
import { Button } from '../../../common/components/button';

const initValues = {
  first_name: '',
  last_name: '',
  second_last_name: '',
  sex: '',
  birth_date: '',
  curp: '',
  rfc: '',
  person_type: '',
  company_name: ''
}

interface SexOption {
  value: string;
  label: string;
}

interface PersonTypeOption {
  value: string;
  label: string;
}

const sexOptions : SexOption[] = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' }
];

const personTypeOptions: PersonTypeOption[] = [
  { value: 'moral', label: 'Moral' },
  { value: 'physical', label: 'Physical' }
];

const CreatePersonForm = () => {
  const validationSchema = Yup.object({
    first_name: Yup.string().required('First name is required').min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
    last_name: Yup.string().required('Last name is required').min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
    second_last_name: Yup.string().optional().min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
    sex: Yup.string().oneOf(['Male', 'Female'], 'Please select a valid sex').required(),
    birth_date: Yup.date().required('Birth date is required'),
    curp: Yup.string().required('CURP is required').matches(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/, 'Invalid CURP format'),
    rfc: Yup.string().required('RFC is required').matches(/^([A-ZÑ&]{3,4}) ?-? ?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?-? ?([A-Z\d]{3})$/, 'Invalid RFC format'),
    person_type: Yup.string().oneOf(['moral', 'physical'], 'Please select a valid person type').required('Person type is required'),
    company_name: Yup.string().when('person_type', (person_type: any, schema: any) => {
      return person_type === 'moral'
        ? schema.required('Company name is required for company type').max(10, 'Company name must be at most 10 characters')
        : schema.optional();
    })
  });

  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={(val) => console.log(val)}
    >
      {({ errors, touched, setFieldValue, values, dirty }) => (
        <FormikForm>
          <div className='mx-auto max-w-4xl'>
            <Heading>Create Person</Heading>
            <Subheading className='mt-2'>
              To use all the system's feautures, you need to fill in the person's information. You can edit this information later.
            </Subheading>

            <Divider className='my-5 mt-6' />

            <Field>
              <section className='grid gap-x-8 gap-y-6 sm:grid-cols-2'>
                <div className='space-y-1'>
                  <Subheading>First name</Subheading>
                  <Text>This is the first name field (required).</Text>
                </div>
                
                <div>
                  <FormikField
                    name='first_name'
                    type='text'
                    autoComplete='off'
                    as={Input}
                    onChange={(e: any) => setFieldValue('first_name', e.target.value)}
                    invalid={!!(errors.first_name && touched.first_name)}
                  />

                  <div className='min-h-[1.5.rem]'>
                    <ErrorMessage>
                      { errors.first_name && touched.first_name ? errors.first_name : ' ' }
                    </ErrorMessage>
                  </div>
                </div>
              </section>
            </Field>

            <Divider className='my-5' soft/>

            <Field>
              <section className='grid gap-x-8 gap-y-6 grid-cols-2 sm:grid-cols-2'>
                <div className='space-y-1'>
                  <Subheading>Last Name</Subheading>
                  <Text>This is the last name field (required).</Text>
                </div>

                <div className='space-y-1'>
                  <Subheading>Second Last Name</Subheading>
                  <Text>This is the second last name field (optional).</Text>
                </div>

                <div>
                  <FormikField
                    name='last_name'
                    type='text'
                    autoComplete='off'
                    as={Input}
                    onChange={(e: any) => setFieldValue('last_name', e.target.value)}
                    invalid={!!(errors.last_name && touched.last_name)}
                  />

                  <div className='min-h-[1.5rem]'>
                    <ErrorMessage>
                      { errors.last_name && touched.last_name ? errors.last_name : ' ' }
                    </ErrorMessage>
                  </div>
                </div>

                <div>
                  <FormikField
                    name='second_last_name'
                    type='text'
                    autoComplete='off'
                    as={Input}
                    onChange={(e: any) => setFieldValue('second_last_name', e.target.value)}
                    invalid={!!(errors.second_last_name && touched.second_last_name)}
                  />

                  <div className='min-h-[1.5rem]'>
                    <ErrorMessage>
                      { errors.second_last_name && touched.second_last_name ? errors.second_last_name : ' ' }
                    </ErrorMessage>
                  </div>
                </div>
              </section>
            </Field>

            <Divider className='my-5' soft/>

            <Field>
              <section className='grid gap-x-8 gap-y-6 grid-cols-2 sm:grid-cols-2'>
                <div className='space-y-1'>
                  <Subheading>Sex</Subheading>
                  <Text>Select the sex of the person (required).</Text>
                </div>

                <div className='space-y-1'>
                  <Subheading>Birth Date</Subheading>
                  <Text>Select the birth date of the person (required).</Text>
                </div>

                <div>
                  <FormikField
                    as={Select}
                    name='sex'
                    value={values.sex}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFieldValue('sex', e.target.value);
                    }}
                    invalid={!!(errors.sex && touched.sex)}
                  >
                    <option value=''>Select a sex</option>
                    {sexOptions.map((option: SexOption) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </FormikField>

                  <div className='min-h-[1.5rem]'>
                    <ErrorMessage>
                      { errors.sex && touched.sex ? errors.sex : ' '}
                    </ErrorMessage>
                  </div>
                </div>

                <div>
                  <FormikField
                    name='birth_date'
                    type='date'
                    autoComplete='off'
                    as={Input}
                    onChange={(e: any) => setFieldValue('birth_date', e.target.value)}
                    invalid={!!(errors.birth_date && touched.birth_date)}
                  />

                  <div className='min-h-[1.5rem]'>
                    <ErrorMessage>
                      { errors.birth_date && touched.birth_date ? errors.birth_date : ' ' }
                    </ErrorMessage>
                  </div>
                </div>
              </section>
            </Field>

            <Divider className='my-5' soft/>
            <Field>
              <section className='grid gap-x-8 gap-y-6 grid-cols-2 sm:grid-cols-2'>
                <div className='space-y-1'>
                  <Subheading>CURP</Subheading>
                  <Text>This is the CURP field (required).</Text>
                </div>
                
                <div className='space-y-1'>
                  <Subheading>RFC</Subheading>
                  <Text>This is the RFC field (required).</Text>
                </div>

                <div>
                  <FormikField
                    name='curp'
                    type='text'
                    autoComplete='off'
                    as={Input}
                    onChange={(e: any) => setFieldValue('curp', e.target.value)}
                    invalid={!!(errors.curp && touched.curp)}
                  />

                  <div className='min-h-[1.5rem]'>
                    <ErrorMessage>
                      { errors.curp && touched.curp ? errors.curp : ' ' }
                    </ErrorMessage>
                  </div>
                </div>

                <div>
                  <FormikField
                    name='rfc'
                    type='text'
                    autoComplete='off'
                    as={Input}
                    onChange={(e: any) => setFieldValue('rfc', e.target.value)}
                    invalid={!!(errors.rfc && touched.rfc)}
                  />

                  <div className='min-h-[1.5rem]'>
                    <ErrorMessage>
                      { errors.rfc && touched.rfc ? errors.rfc : ' ' }
                    </ErrorMessage>
                  </div>
                </div>
              </section>
            </Field>

            <Divider className='my-5' soft/>

            <Field>
              <section className='grid gap-x-8 gap-y-6 grid-cols-2 sm:grid-cols-2'>
                <div className='space-y-1'>
                  <Subheading>Person Type</Subheading>
                  <Text>Select the person type (required).</Text>
                </div>

                {
                  values.person_type === 'moral' ? (
                    <div className='space-y-1'>
                      <Subheading>Company Name</Subheading>
                      <Text>This is the company name field (required if person type is moral).</Text>
                    </div>
                  ) : <div></div>
                }

                <div>
                  <FormikField
                    as={Select}
                    name='person_type'
                    value={values.person_type}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue('person_type', e.target.value)}
                    invalid={!!(errors.person_type && touched.person_type)}
                  >
                    <option value=''>Select a person type</option>
                    {personTypeOptions.map((option: PersonTypeOption) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </FormikField>

                  <div className='min-h-[1.5rem]'>
                    <ErrorMessage>
                      { errors.person_type && touched.person_type ? errors.person_type : ' ' }
                    </ErrorMessage>
                  </div>
                </div>

                { values.person_type === 'moral' ? (
                  <div>
                    <FormikField
                      name='company_name'
                      type='text'
                      as={Input}
                      autoComplete='off'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue('company_name', e.target.value)}
                      invalid={!!(errors.company_name && touched.company_name)}
                    />
                    
                    <div className='min-h-[1.5rem]'>
                      <ErrorMessage>
                        { errors.company_name && touched.company_name ? errors.company_name : ' ' }
                      </ErrorMessage>
                    </div>
                  </div>
                ) : <div></div> }
              </section>
            </Field>
          </div>

          <div className='flex justify-end gap-2'>
            <Button className='mt-4 bg-red-600'>
              Cancel
            </Button>

            <Button className='mt-4' type='submit' disabled={!dirty}>
              Create Person
            </Button>
          </div>
        </FormikForm>
      )}

    </Formik>
  );
}

export default CreatePersonForm;