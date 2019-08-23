import React from 'react';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';

function DialogTitleWithMenu(props) {
	const { title, onMore } = props;
	
	const theme = useTheme();
	
	return (
		<DialogTitle
			disableTypography
			style={{ display: 'flex', justifyContent: 'space-between' }}
		>
			<Typography variant="h6">{title}</Typography>
			<IconButton
				aria-label="more"
				style={{ position: 'absolute', right: theme.spacing(1), top: theme.spacing(1) }}
				onClick={onMore}
			>
				<MoreVertIcon />
			</IconButton>
			{props.children}
		</DialogTitle>
	);
}

export default DialogTitleWithMenu;