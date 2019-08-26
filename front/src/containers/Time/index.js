import React, { useState, useEffect, useContext, useMemo } from 'react';
import { withRouter } from 'react-router-dom';

import _ from 'lodash';
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

function Time(props) {
    const { history, match } = props;

    const [dateSelected, setDateSelected] = useState(match.params.date ? match.params.date : new Date());

    useEffect(() => {
        history.push(`/time/${moment(dateSelected).format('YYYYMMDD')}`);
    }, [history, dateSelected]);

    const { projects } = useContext(DbProjectsContext);
    const { timeEntries } = useContext(DbTimeEntriesContext);

    const timeEntriesPopulated = useMemo(() => populateTimeEntries(timeEntries, projects), [timeEntries, projects]);
    const timeEntriesFiltered = useMemo(() => filterTimeEntries(timeEntriesPopulated, dateSelected), [
        timeEntriesPopulated,
        dateSelected
    ]);

    const theme = useTheme();

    return (
        <Box p={2}>
            <Grid container justify="center">
                <Grid item xs={12} md={8} lg={6}>
                    <Paper
                        style={{ display: 'inline-block', padding: theme.spacing(0), marginBottom: theme.spacing(2) }}
                    >
                        <DatePicker
                            inputVariant="outlined" // TODO: override TextField and add Calendar icon input adornment
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
                        timeEntries={timeEntriesFiltered}
                        setDateSelected={setDateSelected}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

export default withRouter(Time);

function populateTimeEntries(timeEntries, projects) {
    console.info(`%cpopulateTimeEntries: running`, 'color: green');
    if (_.isNil(timeEntries) || _.isNil(projects)) {
        return [];
    }

    return timeEntries.map(timeEntry => ({
        ...timeEntry,
        project: _.find(projects, p => p.id === timeEntry.project_uid.id)
    }));
}

function filterTimeEntries(timeEntriesPopulated, dateSelected) {
    console.info(`%cfilterTimeEntries: running`, 'color: green');
    const weekStartDate = parseInt(
        moment(dateSelected)
            .startOf('isoWeek')
            .format('YYYYMMDD')
    );
    const weekEndDate = parseInt(
        moment(dateSelected)
            .endOf('isoWeek')
            .format('YYYYMMDD')
    );

    return _.filter(timeEntriesPopulated, t => t.date >= weekStartDate && t.date <= weekEndDate);
}
