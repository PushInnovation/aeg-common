import RetryWhilstCancelError from './errors/retry-whilst-cancel-error';
import DetailedError from './errors/detailed-error';
import Base from './base';
import BaseId from './base-id';
import Service from './service';
import dateConversions from './dates/date-conversions';
import forever from './promises/forever';
import eachLimit from './promises/each-limit';
import retryWhilst from './promises/retry-whilst';
import { EventEmitter } from 'events';
import * as moment from 'moment-timezone';

const Errors = { RetryWhilstCancelError, DetailedError }; // tslint:disable-line

const DateConversions = dateConversions; // tslint:disable-line

const ControlFlow = { forever, eachLimit, retryWhilst }; // tslint:disable-line

export { Errors, Base, BaseId, Service, ControlFlow, DateConversions };

export default { Errors, Base, BaseId, Service, ControlFlow, DateConversions };
