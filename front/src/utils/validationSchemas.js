import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .email('Valid email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password should be at least 6 characters long')
        .max(64, 'Password should not exceed 64 characters')
});
