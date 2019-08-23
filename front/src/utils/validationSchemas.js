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
        .max(128, 'Should not exceed 128 characters'), // should cover users with crazy password managers
    name: yup
        .string()
        .required('Full name is required')
        .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/, 'Special characters are not allowed')
});

export const forgotPasswordSchema = yup.object().shape({
    email: yup
        .string()
        .required('Email is required')
        .email('Valid email is required')
});

export const passwordChangeSchema = yup.object().shape({
    passwordCurrent: yup.string().required('Current password is required'),
    password: yup
        .string()
        .required('New password is required')
        .min(6, 'Should be at least 6 characters long')
        .max(128, 'Should not exceed 128 characters'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
});

export const projectSchema = yup.object().shape({
    name: yup.string().required('Project name is required')
});
