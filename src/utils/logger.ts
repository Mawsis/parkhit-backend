import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, colorize, align } = format;

// Custom format for console logs
const consoleFormat = printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level}: ${stack || message}`;
});

const logger = createLogger({
    level: 'info', // Default log level
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Timestamp format
        format.errors({ stack: true }), // Include stack traces
        format.splat(),
        format.colorize({
            colors: {
                error: 'red',
                warn: 'yellow',
                info: 'green',
                debug: 'blue',
            },
        }),

    ),
    defaultMeta: { service: 'parkhit-backend' },
    transports: [
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        }),
    ],
});

// Add pretty console output for non-production environments
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: combine(
                colorize(), // Add color based on log level
                align(), // Align logs for better readability
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
                consoleFormat // Apply custom formatting
            ),
        })
    );
}

export default logger;
