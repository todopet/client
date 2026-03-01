type AppEnv = "development" | "staging" | "production";
type LogLevel = "debug" | "info" | "warn" | "error";

interface EnvConfig {
  apiUrl: string;
  apiTimeout: number;
  env: AppEnv;
  logLevel: LogLevel;
  enableDebugTools: boolean;
  sentryDsn?: string;
}

const getStringEnv = (key: string, defaultValue: string) => {
  const value = import.meta.env[key];
  return typeof value === "string" && value.length > 0 ? value : defaultValue;
};

const getNumberEnv = (key: string, defaultValue: number) => {
  const value = import.meta.env[key];
  if (typeof value !== "string" || value.length === 0) return defaultValue;

  const parsed = Number(value);
  if (Number.isNaN(parsed)) return defaultValue;
  return parsed;
};

const getBooleanEnv = (key: string, defaultValue: boolean) => {
  const value = import.meta.env[key];
  if (typeof value !== "string" || value.length === 0) return defaultValue;
  return value === "true" || value === "1";
};

const getAppEnv = () => {
  const value = getStringEnv("VITE_ENV", "development");
  if (value === "development" || value === "staging" || value === "production") {
    return value;
  }
  return "development";
};

const getLogLevel = () => {
  const value = getStringEnv("VITE_LOG_LEVEL", "debug");
  if (value === "debug" || value === "info" || value === "warn" || value === "error") {
    return value;
  }
  return "debug";
};

export const env: EnvConfig = {
  apiUrl: getStringEnv("VITE_API_URL", "http://localhost:3001/api/v1/"),
  apiTimeout: getNumberEnv("VITE_API_TIMEOUT", 30000),
  env: getAppEnv(),
  logLevel: getLogLevel(),
  enableDebugTools: getBooleanEnv("VITE_ENABLE_DEBUG_TOOLS", true),
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
};
