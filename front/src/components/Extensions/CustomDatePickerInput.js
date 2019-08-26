import React from 'react';

import EventIcon from '@material-ui/icons/Event';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    notchedOutline: {
        border: 'none'
    }
}));

function CustomDatePickerInput(props) {
    const classes = useStyles();

    return (
        <OutlinedInput
            classes={{ notchedOutline: classes.notchedOutline }}
            type="text"
            readOnly
            id={props.id}
            value={props.value}
            disabled={props.disabled}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={() => undefined}>
                        <EventIcon />
                    </IconButton>
                </InputAdornment>
            }
            onClick={props.onClick}
            {...props.inputProps}
        />
    );
}

export default CustomDatePickerInput;
