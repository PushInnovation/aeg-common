// @flow

export type ILogger = {

	debug(message: string, data: ?Object): void;

	warn(message: string, data: ?Object): void;

	info(message: string, data: ?Object): void;

	error(message: string, data: ?Object): void;

	errorWithMessage(message: string, data: ?Object | Error, err: ?Error): void;

}
