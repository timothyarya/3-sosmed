import winston from "winston";

const { combine, timestamp, json, printf } = winston.format;
const timestampFormat = "MMM-DD-YYYY HH:mm:ss";

export default winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        message,
        data, // metadata
      };

      return `[${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [new winston.transports.Console()],
});
