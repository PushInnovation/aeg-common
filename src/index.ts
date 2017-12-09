import RetryWhilstCancelError from './errors/retry-whilst-cancel-error';
import ServiceIntervalCancelError from './errors/service-interval-cancel-error';
import DetailedError from './errors/detailed-error';
import Base from './base';
import BaseId from './base-id';
import Service from './service';
import { ServiceInterval } from './service-interval';
import registerUnhandled from './unhandled';
import dateConversions from './dates/date-conversions';
import forever from './promises/forever';
import retryWhilst from './promises/retry-whilst';
import { ILogger } from '@adexchange/aeg-logger';
import { EventEmitter } from 'events';
import * as moment from 'moment-timezone';
import * as Map from './collections/map';

const Errors = {RetryWhilstCancelError, ServiceIntervalCancelError, DetailedError}; // tslint:disable-line

const DateConversions = dateConversions; // tslint:disable-line

const ControlFlow = {forever, retryWhilst}; // tslint:disable-line

const Collections = {Map}; // tslint:disable-line

export { Errors, Base, BaseId, Service, ServiceInterval, ControlFlow, DateConversions, registerUnhandled, Collections };

export default {
	Errors,
	Base,
	BaseId,
	Service,
	ServiceInterval,
	ControlFlow,
	DateConversions,
	registerUnhandled,
	Collections
};
