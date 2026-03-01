const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};

export const sanitizeString = (value: string): string => {
  return value.replace(/[&<>"'/]/g, (char) => HTML_ESCAPE_MAP[char] ?? char);
};

export const parseHashParams = (hash: string): Record<string, string> => {
  if (!hash) return {};

  const normalizedHash = hash.startsWith("#") ? hash.slice(1) : hash;
  if (!normalizedHash) return {};

  try {
    const params = new URLSearchParams(normalizedHash);
    const result: Record<string, string> = {};

    params.forEach((rawValue, rawKey) => {
      const key = sanitizeString(rawKey.trim());
      const value = sanitizeString(rawValue.trim());
      if (key.length > 0) {
        result[key] = value;
      }
    });

    return result;
  } catch {
    return {};
  }
};

export const validateEnum = <T extends string>(
  value: string | undefined,
  allowedValues: readonly T[]
): value is T => {
  if (!value) return false;
  return (allowedValues as readonly string[]).includes(value);
};
