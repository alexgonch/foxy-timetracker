import * as yup from 'yup';

export const signUpSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .email('Valid email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Should be at least 6 characters long')
        .max(128, 'Should not exceed 128 characters') // should cover users with crazy password managers
});

export const forgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .email('Valid email is required')
});
