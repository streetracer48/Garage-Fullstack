import titleize from 'titleize';
import * as moment from 'moment';


export const rentalType = isShared => isShared ? 'shared' : 'entire'

export const toUpperCase = value => value ? titleize(value) : ''