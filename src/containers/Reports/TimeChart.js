import React, { useMemo } from 'react';

import moment from 'moment';

import * as colors from '@material-ui/core/colors';
import { useTheme } from '@material-ui/core/styles';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { convertTimeEntriesToChartData } from './functions';
import { formatAsHmmExtended } from 'utils/helpers/timeHelper';

const COLORS = [
    // group 1
    'pink',
    'blue',
    'green',
    'amber',
    // group 2
    'cyan',
    'lime',
    'deepOrange',
    'deepPurple',
    // group 3
    'teal',
    'yellow',
    'red',
    'indigo',
    // group 4
    'orange',
    'purple',
    'lightBlue',
    'lightGreen'
];

function TimeChart(props) {
    const { timeEntries, startDate, endDate } = props;

    const theme = useTheme();

    const { data, dataKeys } = useMemo(() => convertTimeEntriesToChartData(timeEntries, startDate, endDate), [
        timeEntries,
        startDate,
        endDate
    ]);

    // TODO: verify how labelFormatter works with non-current year
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <CartesianGrid
                    strokeDasharray="2 2"
                    stroke={theme.light() ? theme.palette.grey[300] : theme.palette.grey[700]}
                />
                <XAxis dataKey="_date" stroke={theme.palette.text.secondary} tickMargin={4} />
                <YAxis
                    type="number"
                    domain={[0, dataMax => Math.ceil(dataMax / 3600) * 3600]}
                    stroke={theme.palette.text.secondary}
                    tickMargin={4}
                    tickFormatter={tick => formatAsHmmExtended(tick)}
                />
                <Tooltip
                    cursor={false}
                    isAnimationActive={false}
                    contentStyle={{ background: theme.palette.background.paper }}
                    labelStyle={{ marginBottom: theme.spacing(1) }}
                    labelFormatter={value => moment(value, 'MMM DD').format('dddd [·] MMM DD')}
                    formatter={(value, name, props) => formatAsHmmExtended(value)}
                />
                <Legend formatter={value => <span style={{ color: theme.palette.text.primary }}>{value}</span>} />
                {dataKeys.map((dataKey, index) => {
                    const colorIndex = theme.light() ? 500 : 'A200';
                    const colorName = COLORS[index % COLORS.length]; // will start looping colors eventually

                    return <Bar key={dataKey} dataKey={dataKey} stackId="time" fill={colors[colorName][colorIndex]} />;
                })}
            </BarChart>
        </ResponsiveContainer>
    );
}

export default TimeChart;
