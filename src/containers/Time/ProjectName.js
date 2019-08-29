import React from 'react';

import { useTheme } from '@material-ui/core/styles';

function ProjectName(props) {
	const { project } = props;
	
	const theme = useTheme();
	
	if (project) {
		return <span>{project.name}</span>;
	} else {
		return <span style={{ color: theme.palette.text.disabled }}>[Deleted Project]</span>;
	}
}

export default ProjectName;