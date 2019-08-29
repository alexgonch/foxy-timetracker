import React, { useState, useContext, useMemo } from 'react';

import moment from 'moment';

import { DatePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import CustomDatePickerInput from 'components/extensions/CustomDatePickerInput';
import TimeChart from './TimeChart';

import { DbTimeEntriesContext, DbProjectsContext } from 'utils/firebase';
import { filterTimeEntries, processTimeEntries } from './functions';
import { populateTimeEntries } from 'utils/functions';
import { formatAsHmmExtended } from 'utils/helpers/timeHelper';

function Reports(props) {
    const [startDate, setStartDate] = useState(
        moment()
            .startOf('month')
            .toDate()
    );
    const [endDate, setEndDate] = useState(
        moment()
            .endOf('month')
            .toDate()
    );

    const theme = useTheme();

    const { timeEntries } = useContext(DbTimeEntriesContext);
    const { projects } = useContext(DbProjectsContext);

    const timeEntriesFiltered = useMemo(() => filterTimeEntries(timeEntries, startDate, endDate), [
        timeEntries,
        startDate,
        endDate
    ]);
    const timeEntriesPopulated = useMemo(() => populateTimeEntries(timeEntriesFiltered, projects), [
        timeEntriesFiltered,
        projects
    ]);
    const timeEntriesProcessed = useMemo(() => processTimeEntries(timeEntriesPopulated), [timeEntriesPopulated]);

    const totalTime = useMemo(() => timeEntriesFiltered.reduce((sum, timeEntry) => (sum += timeEntry.time), 0), [
        timeEntriesFiltered
    ]);

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
                                onChange={date => setStartDate(date)}
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
                                onChange={date => setEndDate(date)}
                            />
                        </Paper>
                    </Box>

                    <Paper style={{ padding: theme.spacing(2) }}>
                        <TimeChart timeEntries={timeEntriesProcessed} startDate={startDate} endDate={endDate} />
                    </Paper>

                    <Paper style={{ marginTop: theme.spacing(2), padding: theme.spacing(2) }}>
                        <Typography variant="body1" color="textSecondary">
                            Total time: {formatAsHmmExtended(totalTime)}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Reports;
