import { useState, useContext, useEffect } from 'react';

import _ from 'lodash';
import moment from 'moment';

import { DbUserContext } from 'utils/firebase';
import { getPaddedHoursMinutesSeconds } from 'utils/helpers/timeHelper';

function useTimer() {
    const [timerValue, setTimerValue] = useState(null);

    const { user } = useContext(DbUserContext);

    useEffect(() => {
        let oneSecondInterval = null;

        if (!_.isNil(user.timer_date)) {
            getAndSetTimerValue(user.timer_date, setTimerValue);
            oneSecondInterval = setInterval(() => getAndSetTimerValue(user.timer_date, setTimerValue), 1000);
        } else {
            clearInterval(oneSecondInterval);
            setTimerValue(null);
        }

        return () => clearInterval(oneSecondInterval);
    }, [user.timer_date]);

    const timerIsRunning = !_.isNil(user.timer_date);
    const timerRef = user.timer_ref;

    const { hours, minutes, seconds } = getPaddedHoursMinutesSeconds(timerValue);
    const timerValueFormatted = timerIsRunning ? `${hours}:${minutes}:${seconds}` : 'off';

    return { timerIsRunning, timerRef, timerValue, timerValueFormatted };
}

export default useTimer;

function getAndSetTimerValue(timerDate, setTimerValue) {
    const timerValue = moment().diff(timerDate.toDate(), 'seconds');
    setTimerValue(timerValue);
}
