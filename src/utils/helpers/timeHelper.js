export function getHoursFromSeconds(totalSeconds) {
    return Math.floor(totalSeconds / 3600);
}

export function getMinutesFromSeconds(totalSeconds) {
    return Math.floor((totalSeconds % 3600) / 60);
}

export function getPaddedHoursMinutesSeconds(totalSeconds) {
    const hours = getHoursFromSeconds(totalSeconds);
    const minutes = getMinutesFromSeconds(totalSeconds)
        .toString()
        .padStart(2, 0);
    const seconds = (totalSeconds % 60).toString().padStart(2, 0);

    return { hours, minutes, seconds };
}

export function formatAsHmm(totalSeconds) {
    const hours = getHoursFromSeconds(totalSeconds);
    const minutes = getMinutesFromSeconds(totalSeconds)
        .toString()
        .padStart(2, 0);

    return `${hours}:${minutes}`;
}

export function formatAsHmmExtended(totalSeconds) {
    const hours = getHoursFromSeconds(totalSeconds);
    const minutes = getMinutesFromSeconds(totalSeconds)
        .toString()
        .padStart(2, 0);

    return `${hours}h ${minutes}m`;
}
