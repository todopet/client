import { env } from "@/config/env";

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogMeta {
  source?: string;
  data?: unknown;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  source: string;
  data?: unknown;
}

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const SENSITIVE_KEYS = ["password", "token", "secret", "apikey", "apiKey", "authorization", "cookie"];

const getThreshold = (): LogLevel => {
  if (env.env === "production" && LEVEL_PRIORITY[env.logLevel] < LEVEL_PRIORITY.warn) {
    return "warn";
  }
  return env.logLevel;
};

const shouldLog = (level: LogLevel) => {
  return LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[getThreshold()];
};

const sanitizeData = (value: unknown, depth = 0): unknown => {
  if (depth > 4 || value == null) {
    return value;
  }

  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: import.meta.env.DEV ? value.stack : undefined,
    };
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeData(item, depth + 1));
  }

  if (typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
      const isSensitive = SENSITIVE_KEYS.some((sensitiveKey) =>
        key.toLowerCase().includes(sensitiveKey.toLowerCase())
      );
      result[key] = isSensitive ? "***" : sanitizeData(item, depth + 1);
    }
    return result;
  }

  return value;
};

const getConsoleMethod = (level: LogLevel): keyof Console => {
  if (level === "error") return "error";
  if (level === "warn") return "warn";
  if (level === "info") return "info";
  return "debug";
};

const emit = (entry: LogEntry) => {
  const consoleRef = globalThis["console"];
  const method = getConsoleMethod(entry.level);

  if (!consoleRef || typeof consoleRef[method] !== "function") {
    return;
  }

  if (import.meta.env.DEV) {
    const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}] [${entry.source}]`;
    if (entry.data !== undefined) {
      consoleRef[method](prefix, entry.message, entry.data);
      return;
    }
    consoleRef[method](prefix, entry.message);
    return;
  }

  consoleRef[method](JSON.stringify(entry));
};

const log = (level: LogLevel, message: string, meta?: LogMeta) => {
  if (!shouldLog(level)) {
    return;
  }

  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    source: meta?.source ?? "app",
    data: meta?.data !== undefined ? sanitizeData(meta.data) : undefined,
  };

  emit(entry);
};

export const logger = {
  debug: (message: string, meta?: LogMeta) => log("debug", message, meta),
  info: (message: string, meta?: LogMeta) => log("info", message, meta),
  warn: (message: string, meta?: LogMeta) => log("warn", message, meta),
  error: (message: string, meta?: LogMeta) => log("error", message, meta),
};
