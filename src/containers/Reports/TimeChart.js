import React, { useMemo } from 'react';

import moment from 'moment';

import { useTheme } from '@material-ui/core/styles';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import { convertTimeEntriesToChartData } from './functions';
import { formatAsHmmExtended } from 'utils/helpers/timeHelper';

// TODO: show weekly/monthly stats when date range reaches particular size
function TimeChart(props) {
    const { projects, timeEntries, startDate, endDate } = props;

    const theme = useTheme();

    const { data } = useMemo(() => convertTimeEntriesToChartData(timeEntries, startDate, endDate), [
        timeEntries,
        startDate,
        endDate
    ]);

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
                <XAxis
                    dataKey="_date"
                    stroke={theme.palette.text.secondary}
                    tickMargin={4}
                    tickFormatter={tick => moment(tick).format('MMM DD')}
                />
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
                    labelFormatter={value => moment(value).format('dddd [·] MMM DD')}
                    formatter={(value, name, props) => formatAsHmmExtended(value)}
                />
                <Legend formatter={value => <span style={{ color: theme.palette.text.primary }}>{value}</span>} />
                {projects.map(project => {
                    return <Bar key={project.id} dataKey={project.name} stackId="projects" fill={project.color} />;
                })}
            </BarChart>
        </ResponsiveContainer>
    );
}

export default TimeChart;
