import { useMutation } from '@apollo/client/react'
import { CombinedGraphQLErrors } from '@apollo/client';
import { ADMIN_RESEND_VALIDATION_EMAIL_MUTATION } from '../api/users.mutations';


export const useAdminResendValidationEmail = () => {
    const [ adminResendValidationEmail, { loading } ] = useMutation<{adminResendValidationEmail: {
        message:string;
    }}> (ADMIN_RESEND_VALIDATION_EMAIL_MUTATION);

    const handleAdminResendValidationEmail = async ( userId: string ) => {
        try{
            const { data } = await adminResendValidationEmail({
                variables:{
                    userId,
                },
            });
            return {
                success:true,
                message: data?.adminResendValidationEmail?.message ?? '',
                errorMessage: null,
            };
        }catch(error){
            if(CombinedGraphQLErrors.is(error)){
                const graphQlError = error.errors[0];
                const errorCode = graphQlError?.extensions?.code;

                if (errorCode === 429 || errorCode === '429') {
                    return {
                        success:false,
                        message:null,
                        errorMessage: 'You have reached the limit for validation email requests. Please try again later.',
                    };
                }

                return {
                    success:false,
                    message:null,
                    errorMessage:
                    graphQlError?.message || 'An error occurred while sending the validation email.',
                };
            }
            return{
                success:false,
                message:null,
                errorMessage: 'An error occurred while sending the validation email.'
            };
        }
    };

    return{
        handleAdminResendValidationEmail,
        loading,
    };
}
