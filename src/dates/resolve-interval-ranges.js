import moment from 'moment-timezone';
import Constants from './constants';

/**
 * Resolves the requested interval to UTC start and end dates
 * @param {string} interval - hourly, daily, yesterday, weekly, last-week, monthly, yearly
 * @param {string} timezone
 * @param {Object} [options] - moment: the date time to resolve, otherwise now
 * @returns {{startDate: *, endDate: *}}
 */
export default function (interval, timezone, options) {

	let startDateClient, endDateClient, m;

	if (options && options.moment) {

		m = options.moment.clone().tz(timezone);

	} else {

		m = moment.tz(timezone);

	}

	switch (interval) {
		case 'hourly':
			startDateClient = m.clone().startOf('hour');
			endDateClient = m.clone().endOf('hour');
			break;
		case 'daily':
			startDateClient = m.clone().startOf('day');
			endDateClient = m.clone().endOf('day');
			break;
		case 'yesterday':
			startDateClient = m.clone().subtract('days', 1).startOf('day');
			endDateClient = m.clone().subtract('days', 1).endOf('day');
			break;
		case 'weekly':
			startDateClient = m.clone().startOf('week');
			endDateClient = m.clone().endOf('week');
			break;
		case 'last-week':
			startDateClient = m.clone().subtract('days', 7).startOf('week');
			endDateClient = m.clone().subtract('days', 7).endOf('week');
			break;
		case 'monthly':
			startDateClient = m.clone().startOf('month');
			endDateClient = m.clone().endOf('month');
			break;
		case 'yearly':
			startDateClient = m.clone().startOf('year');
			endDateClient = m.clone().endOf('year');
			break;
	}

	return {
		startDate: startDateClient.tz('UTC'),
		startDateString: startDateClient.tz('UTC').format(Constants.dateTimeFormat),
		endDate: endDateClient.tz('UTC'),
		endDateString: endDateClient.tz('UTC').format(Constants.dateTimeFormat)
	};

}
