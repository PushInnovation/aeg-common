import moment from 'moment-timezone';

const DATE_FORMAT_STRING = 'YYYY-MM-DD HH:mm:ss';

export default {
	convertUTCStringToESTString,
	convertESTStringToUTCString,
	momentToString,
	stringToMoment,
	utcStringToMoment,
	unixTimestampToUTCString,
	utcStringToUnixTimestamp
};

/**
 * Convert UTC Date string to EST string
 * @param {string} utc
 * @return {string}
 */
export function convertUTCStringToESTString (utc) {

	return moment.tz(utc, DATE_FORMAT_STRING, 'UTC').tz('America/New_York').format(DATE_FORMAT_STRING);

}

/**
 * Convert EST date string to UTC string
 * @param {string} est
 * @param {string} [format]
 * @return {string}
 */
export function convertESTStringToUTCString (est, format) {

	const f = format || DATE_FORMAT_STRING;
	return moment.tz(est, f, 'America/New_York').tz('UTC').format(DATE_FORMAT_STRING);

}

/**
 * Moment to string
 * @param {Moment} moment
 * @return {string}
 */
export function momentToString (moment) {

	return moment.format(DATE_FORMAT_STRING);

}

/**
 * String to moment
 * @param {string} str
 * @return {Moment}
 */
export function stringToMoment (str) {

	return moment(str, DATE_FORMAT_STRING);

}

/**
 * UTC date string to moment
 * @param {string} utc
 * @return {Moment}
 */
export function utcStringToMoment (utc) {

	return moment.tz(utc, DATE_FORMAT_STRING, 'UTC');

}

/**
 * Unix timestamp to UTC date string
 * @param {number} timestamp
 * @return {string}
 */
export function unixTimestampToUTCString (timestamp) {

	return moment.tz(timestamp, 'X', 'UTC').format(DATE_FORMAT_STRING);

}

/**
 * UTC date string to unix timestamp
 * @param {string} utc
 * @return {number}
 */
export function utcStringToUnixTimestamp (utc) {

	return utcStringToMoment(utc).unix();

}
