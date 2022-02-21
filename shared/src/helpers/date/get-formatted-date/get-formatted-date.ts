import { format } from 'date-fns';
import { DateFormat } from '~/common/enums/enums';

const getFormattedDate = (date: Date, formatType: DateFormat): string => {
  return format(date, formatType);
};

export { getFormattedDate };
