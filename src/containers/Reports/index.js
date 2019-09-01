import React, { useState, useContext, useMemo } from 'react';

import _ from 'lodash';
import moment from 'moment';

import { DatePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';

import CustomDatePickerInput from 'components/extensions/CustomDatePickerInput';
import TimeChart from './TimeChart';
import Stats from './Stats';

import { DbTimeEntriesContext, DbProjectsContext } from 'utils/firebase';
import { addColorsToProjects, filterTimeEntries, processTimeEntries } from './functions';
import { populateTimeEntries } from 'utils/functions';

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
    const [projectIdsUnchecked, setProjectIdsUnchecked] = useState([]);

    const theme = useTheme();
    const lightThemeEnabled = theme.light();

    const { timeEntries } = useContext(DbTimeEntriesContext);
    const { projects } = useContext(DbProjectsContext);

    const projectsWithColors = useMemo(() => addColorsToProjects(lightThemeEnabled, projects), [
        lightThemeEnabled,
        projects
    ]);
    const projectsWithColorsFiltered = useMemo(
        () => _.filter(projectsWithColors, p => !projectIdsUnchecked.includes(p.id)),
        [projectIdsUnchecked, projectsWithColors]
    );

    const timeEntriesProcessed = useMemo(() => processTimeEntries(timeEntries), [timeEntries]);
    const timeEntriesPopulated = useMemo(() => populateTimeEntries(timeEntriesProcessed, projects), [
        timeEntriesProcessed,
        projects
    ]);
    const timeEntriesFiltered = useMemo(
        () => filterTimeEntries(timeEntriesPopulated, projectIdsUnchecked, startDate, endDate),
        [timeEntriesPopulated, projectIdsUnchecked, startDate, endDate]
    );

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
                        <TimeChart
                            projects={projectsWithColorsFiltered}
                            timeEntries={timeEntriesFiltered}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </Paper>

                    <Paper style={{ marginTop: theme.spacing(2), padding: theme.spacing(2) }}>
                        <Stats
                            projects={projectsWithColors}
                            timeEntries={timeEntriesProcessed}
                            projectIdsUnchecked={projectIdsUnchecked}
                            setProjectIdsUnchecked={setProjectIdsUnchecked}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Reports;
