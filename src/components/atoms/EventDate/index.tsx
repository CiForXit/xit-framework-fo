import React from 'react';

//import {calculateStringOfDateRange} from 'utils/dateCalculator';
import {calculateStringOfDateRange, getKoreanDateString} from 'utils/dateCalculator';

interface EventDateProps {
  startAt?: string;
  endAt?: string;
  children?: string;
}

function EventDate({startAt, endAt, children}: EventDateProps): React.ReactElement {
  if (startAt && endAt) {
    return <>{calculateStringOfDateRange(startAt, endAt)}</>;
  }
  return <>{children ? getKoreanDateString(children) : ''}</>;
}

export default EventDate;
