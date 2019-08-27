export function getLocationName(pathname) {
	if (pathname === '/') {
		return 'Projects';
	} else if (pathname.startsWith('/time')) {
		return 'Time';
	} else if (pathname === '/account') {
		return 'Account';
	} else {
		return '';
	}
}