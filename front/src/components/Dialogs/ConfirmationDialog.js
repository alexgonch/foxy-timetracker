import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';

function ConfirmationDialog(props) {
    const { open, danger, dialogTitle, dialogContentText, action, onClose, onSubmit } = props;
	
	const theme = useTheme();

    return (
        <Dialog fullWidth open={open} aria-labelledby="confirmation-dialog" onClose={onClose}>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{dialogContentText}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button style={{ color: danger ? theme.palette.error.main : theme.palette.secondary.main }} onClick={onSubmit}>
                    {action}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;
