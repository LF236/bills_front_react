import { useState } from 'react';
import type { UserDetailInterface } from '../../domain/user-detail.interface'
import { useAdminResendValidationEmail } from '../../hooks/useAdminResendValidationEmail';
import { Button } from '../../../common/components/button';

interface Props{
    user:UserDetailInterface;
}
const UserDetailSettings = ({ user } : Props) => {
    const {handleAdminResendValidationEmail , loading }= useAdminResendValidationEmail();

    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null> (null);

    const handleResendValidationEmail = async () => {
        setSuccessMessage(null);
        setErrorMessage(null);

        const result = await handleAdminResendValidationEmail(user.id);

        if(result.success){
            setSuccessMessage(
                result.message || 'Validation email sent successfully.',
            );
            return;
        }

        setErrorMessage(
            result.errorMessage || 'An error occurred while sending the validation email.',
        );
    };

    if(user.verified_at != null){
        return null;
    }

    return (
        <div className='space-y-4'>
            <div className='rounded-xl border border-slate-700 overflow-hidden'>
                <div className='px-6 py-4 border-b border-slate-700'>
                    <h3 className='text-sm font-semibold text-white'>Resend validation email</h3>
                    <p className='mt-1 text-sm text-slate-400'>Generates a new validation link and sends it to the user's email.</p>
                </div>

                <div className='flex items-center justify-between gap-4 px-6 py-4'>
                    <div className='min-w-0'>
                        <p className='text-sm text-slate-300'>
                            {user.name}
                        </p>

                        <p className='mt-1 text-sm text-slate-500'>
                            {user.email}
                        </p>
                    </div>

                    <Button
                    type='button'
                    variant='solid'
                    color='cyan'
                    disabled={loading}
                    onClick={handleResendValidationEmail}
                    className='shrink-0'>{loading ? (
                    <span className='inline-flex items-center gap-2'>
                        <svg className='size-4 animate-spin' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                            <circle className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                    </svg>Sending...

                    </span>
                    ) : 'Resend email'
                    }
                    </Button>
                </div>

                {successMessage && (
                    <div className='border-t border-slate-700 px-6 py-4'>
                        <p className='text-sm text-green-400'>{successMessage}</p>
                    </div>
                )}

                {errorMessage && (
                    <div className='border-t border-slate-700 px-6 py-4'>
                        <p className='text-sm text-red-400'>
                            {errorMessage}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserDetailSettings;