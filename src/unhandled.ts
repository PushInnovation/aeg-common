import { ILogger } from '@push_innovation/aeg-logger';

function handler (message: string, error: Error, logger: ILogger): void {

	logger.crashProcessWithError(message, error);

}

export default function registerUnhandled (logger: ILogger): void {

	process.on('uncaughtException', (err) => handler('Uncaught exception: ', err, logger));
	process.on('unhandledRejection', (err, p) => handler('Unhandled promise rejection: ', err, logger));

}
