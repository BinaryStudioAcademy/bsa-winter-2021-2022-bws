import { subHours } from 'date-fns';

const getSubHours = (hours: number): Date => {
  return subHours(new Date(), hours);
};

export { getSubHours };
