export function getHoursFromSeconds(seconds) {
	return Math.floor(seconds / 3600);
}

export function getMinutesFromSeconds(seconds) {
	return Math.floor(seconds % 3600 / 60);
}
