import _ from 'lodash';
import moment from 'moment';

export function filterTimeEntries(timeEntries, startDate, endDate) {
    return _.filter(
        timeEntries,
        t => moment(t.date, 'YYYYMMDD').isSameOrAfter(startDate) && moment(t.date, 'YYYYMMDD').isSameOrBefore(endDate)
    );
}

export function processTimeEntries(timeEntries) {
    // Remove seconds and time entries with less than a minute of tracked time
    const timeEntriesWithoutSeconds = timeEntries.map(timeEntry => ({
        ...timeEntry,
        time: timeEntry.time - (timeEntry.time % 60)
    }));
    
    return _.filter(timeEntriesWithoutSeconds, t => t.time > 0);
}

export function convertTimeEntriesToChartData(timeEntries, startDate, endDate) {
    const data = [];
    const dataKeys = [];

    let currentDate = moment(startDate);
    while (currentDate.isSameOrBefore(endDate)) {
        data.push({ _date: currentDate.format('MMM DD') });
        const allTimeEntriesOnDate = _.filter(
            timeEntries,
            t => moment(t.date, 'YYYYMMDD').isSame(currentDate) && !_.isNil(t.project)
        );
        allTimeEntriesOnDate.forEach(timeEntry => {
            const previousTimeStored = _.get(_.last(data), timeEntry.project.name, 0);
            _.set(_.last(data), timeEntry.project.name, previousTimeStored + timeEntry.time);

            if (!dataKeys.includes(timeEntry.project.name)) {
                dataKeys.push(timeEntry.project.name);
            }
        });

        currentDate.add(1, 'days');
    }

    return { data, dataKeys };
}
