import { useState } from 'react';

import moment from 'moment';

function useDates() {
    const lsStartDate = localStorage['startDate'];
    const lsEndDate = localStorage['endDate'];

    const [startDate, setStartDate] = useState(
        lsStartDate
            ? moment(lsStartDate).toDate()
            : moment()
                  .startOf('month')
                  .toDate()
    );
    const [endDate, setEndDate] = useState(
        lsEndDate
            ? moment(lsEndDate).toDate()
            : moment()
                  .endOf('month')
                  .toDate()
    );

    const handleStartDate = date => {
        setStartDate(date);
        localStorage['startDate'] = date.toISOString();
    };

    const handleEndDate = date => {
        setEndDate(date);
        localStorage['endDate'] = date.toISOString();
    };

    return { startDate, handleStartDate, endDate, handleEndDate };
}

export default useDates;
