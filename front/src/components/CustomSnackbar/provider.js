import React, { useState } from 'react';

import CustomSnackbar from './index';
import CustomSnackbarContext from './context';

function CustomSnackbarProvider(props) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('success');

    const handleClose = () => {
        setOpen(false);
    };
	
	const customSnackbar = {
		success: message => {
            setOpen(true);
            setMessage(message);
            setVariant('success');
        },
        error: message => {
            setOpen(true);
            setMessage(message);
            setVariant('error');
        }
	};
	
    return (
        <CustomSnackbarContext.Provider value={customSnackbar}>
			{props.children}
            <CustomSnackbar open={open} message={message} variant={variant} onClose={handleClose} />
        </CustomSnackbarContext.Provider>
    );
}

export default CustomSnackbarProvider;
