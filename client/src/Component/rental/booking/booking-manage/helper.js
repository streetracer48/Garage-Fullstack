import titleize from 'titleize';
import * as moment from 'moment';

export const toUpperCase = value => value ? titleize(value) : ''

export const pretifyDate = date => moment(date).format('MMM Do YY')