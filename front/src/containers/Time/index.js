import React, { useState, useEffect, useContext, useMemo } from 'react';
import { withRouter } from 'react-router-dom';

import moment from 'moment';

import { DatePicker } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useTheme } from '@material-ui/core/styles';

import CustomDatePickerInput from 'components/extensions/CustomDatePickerInput';
import Calendar from './Calendar';

import { DbProjectsContext } from 'utils/firebase';
import { DbTimeEntriesContext } from 'utils/firebase';
import { filterTimeEntries, populateTimeEntries } from './functions';

const weekFormat = 'GGGG-WW';

function Time(props) {
    const { history, match } = props;

    const [dateSelected, setDateSelected] = useState(moment(match.params.date, 'YYYYMMDD').toDate());

    useEffect(() => {
        history.push(`/time/${moment(dateSelected).format('YYYYMMDD')}`);
    }, [history, dateSelected]);

    const { projects } = useContext(DbProjectsContext);
    const { timeEntries } = useContext(DbTimeEntriesContext);

    const weekSelected = moment(dateSelected).format(weekFormat);
    const timeEntriesFiltered = useMemo(() => filterTimeEntries(timeEntries, weekSelected, weekFormat), [
        timeEntries,
        weekSelected
    ]);
    const timeEntriesPopulated = useMemo(() => populateTimeEntries(timeEntriesFiltered, projects), [
        timeEntriesFiltered,
        projects
    ]);

    const theme = useTheme();

    return (
        <Box p={2}>
            <Grid container justify="center">
                <Grid item xs={12} md={8} xl={6}>
                    <Paper style={{ display: 'inline-block', marginBottom: theme.spacing(2) }}>
                        <DatePicker
                            inputVariant="outlined"
                            showTodayButton
                            autoOk
                            label=""
                            format="dddd [·] MMM DD"
                            value={dateSelected}
                            TextFieldComponent={CustomDatePickerInput}
                            onChange={date => setDateSelected(date)}
                        />
                    </Paper>

                    <Calendar
                        dateSelected={dateSelected}
                        timeEntries={timeEntriesPopulated}
                        setDateSelected={setDateSelected}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default withRouter(Time);
