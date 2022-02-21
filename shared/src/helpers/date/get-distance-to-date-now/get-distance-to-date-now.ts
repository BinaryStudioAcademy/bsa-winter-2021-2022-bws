import { formatDistanceToNowStrict } from 'date-fns';

const getDistanceToDateNow = (date: Date): string => {
  return formatDistanceToNowStrict(date);
};

export { getDistanceToDateNow };
