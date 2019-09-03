import React, { useState, useContext, useMemo } from 'react';

import _ from 'lodash';
import moment from 'moment';
import { parse } from 'json2csv';
import FileSaver from 'file-saver';

import { DatePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';

import CustomDatePickerInput from 'components/extensions/CustomDatePickerInput';
import TimeChart from './TimeChart';
import Stats from './Stats';

import { CustomSnackbarContext } from 'components/extensions/CustomSnackbar';
import { DbTimeEntriesContext, DbProjectsContext } from 'utils/firebase';
import { filterTimeEntriesByDates } from './functions';
import { formatAsHmmExtended } from 'utils/helpers/timeHelper';
import useDates from './hooks/useDates';
import useProcessedData from './hooks/useProcessedData';

// TODO: move export into a separate component
function Reports(props) {
    const { startDate, handleStartDate, endDate, handleEndDate } = useDates();
    const [projectIdsUnchecked, setProjectIdsUnchecked] = useState([]);

    const theme = useTheme();
    const lightThemeEnabled = theme.light();

    const customSnackbar = useContext(CustomSnackbarContext);

    const { timeEntries } = useContext(DbTimeEntriesContext);
    const { projects } = useContext(DbProjectsContext);

    const timeEntriesFilteredByDate = useMemo(() => filterTimeEntriesByDates(timeEntries, startDate, endDate), [
        timeEntries,
        startDate,
        endDate
    ]);

    const { timeEntriesInChart, projectsInChart, projectsInStats } = useProcessedData(
        lightThemeEnabled,
        timeEntriesFilteredByDate,
        projects,
        projectIdsUnchecked,
        startDate,
        endDate
    );

    const handleDownloadCSV = timeEntries => {
        try {
            const data = timeEntries.map(timeEntry => ({
                date: timeEntry.date,
                project_name: timeEntry.project.name,
                description: timeEntry.description.trim(),
                time: formatAsHmmExtended(timeEntry.time),
                duration: timeEntry.time
            }));
            const dataSorted = _.orderBy(data, d => new Date(d.date));
            const totalTime = timeEntries.reduce((sum, timeEntry) => (sum += timeEntry.time), 0);
            dataSorted.push({
                duration: totalTime,
                time: formatAsHmmExtended(totalTime)
            });

            const csv = parse(dataSorted, {
                fields: ['date', 'project_name', 'description', 'time', 'duration']
            });

            const startDateFormatted = moment(startDate).format('MMM DD');
            const endDateFormatted = moment(endDate).format('MMM DD');
            const projectNames = _.uniq(data.map(t => t.project_name)).join(', ');

            const csvBlob = new Blob([csv], { type: 'text/plain;charset=utf-8' });
            FileSaver.saveAs(csvBlob, `${projectNames} ${startDateFormatted} - ${endDateFormatted}.csv`);
        } catch (err) {
            customSnackbar.error('Error occured while saving CSV. Try again later.');
        }
    };

    return (
        <Box p={2}>
            <Grid container justify="center">
                <Grid item xs={12} lg={10} xl={8}>
                    <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                        <Paper
                            style={{
                                display: 'inline-block',
                                marginRight: theme.spacing(2),
                                marginBottom: theme.spacing(2)
                            }}
                        >
                            <DatePicker
                                inputVariant="outlined"
                                showTodayButton
                                autoOk
                                format="dddd [·] MMM DD"
                                value={startDate}
                                TextFieldComponent={CustomDatePickerInput}
                                onChange={date => handleStartDate(date)}
                            />
                        </Paper>
                        <Paper style={{ display: 'inline-block', marginBottom: theme.spacing(2) }}>
                            <DatePicker
                                inputVariant="outlined"
                                showTodayButton
                                autoOk
                                format="dddd [·] MMM DD"
                                value={endDate}
                                TextFieldComponent={CustomDatePickerInput}
                                onChange={date => handleEndDate(date)}
                            />
                        </Paper>
                    </Box>

                    <Paper style={{ padding: theme.spacing(2) }}>
                        <TimeChart
                            projects={projectsInChart}
                            timeEntries={timeEntriesInChart}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Paper>

                    <Paper style={{ marginTop: theme.spacing(2), padding: theme.spacing(2) }}>
                        <Stats
                            projects={projectsInStats}
                            projectIdsUnchecked={projectIdsUnchecked}
                            setProjectIdsUnchecked={setProjectIdsUnchecked}
                        />
                    </Paper>

                    <Paper style={{ marginTop: theme.spacing(2), padding: theme.spacing(2) }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDownloadCSV(timeEntriesInChart)}
                        >
                            Download CSV
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Reports;
