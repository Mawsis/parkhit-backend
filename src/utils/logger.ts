import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, printf, json } = format;

// Custom format for log files (human-readable)
const fileFormat = printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${stack ? `\nStack: ${stack}` : ''}`;
});

// Custom logger setup
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.splat()
    ),
    defaultMeta: { service: 'parkhit-backend' },
    transports: [
        new DailyRotateFile({
            filename: 'logs/application-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            format: combine(
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                fileFormat // Use custom file format for better readability
            ),
        }),
    ],
});

// Pretty console logging for non-production environments
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: combine(
                format.colorize(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                printf(({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`)
            ),
        })
    );
}

export default logger;
