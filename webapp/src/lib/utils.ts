import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const passwordRefine = (password: string, ctx: z.RefinementCtx) => {
  const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
  const containsLowercase = (ch: string) => /[a-z]/.test(ch);
  const containsSpecialChar = (ch: string) =>
    /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);

  let countOfUpperCase = 0,
    countOfLowerCase = 0,
    countOfNumbers = 0,
    countOfSpecialChar = 0;

  for (let i = 0; i < password.length; i++) {
    const ch = password.charAt(i);

    if (!isNaN(+ch)) countOfNumbers++;
    else if (containsUppercase(ch)) countOfUpperCase++;
    else if (containsLowercase(ch)) countOfLowerCase++;
    else if (containsSpecialChar(ch)) countOfSpecialChar++;
  }

  if (
    countOfLowerCase < 1 ||
    countOfUpperCase < 1 ||
    countOfSpecialChar < 1 ||
    countOfNumbers < 1
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Password does not meet complexity requirements",
    });
  }
};

export function formatDate(
  date: string | number | Date,
  options: Intl.DateTimeFormatOptions = {},
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: undefined,
    hour: undefined,
    minute: undefined,
    second: undefined,
    timeZoneName: undefined,
  };

  const formatOptions = { ...defaultOptions, ...options };

  // Ensure the input is a valid date
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date");
  }

  return new Intl.DateTimeFormat("en-US", formatOptions).format(parsedDate);
}

/**
 * Format a number as a currency string.
 *
 * This function uses the `Intl.NumberFormat` API to format a number as a currency string.
 * It takes four parameters:
 *
 * - `value`: The number to format. If `undefined`, the function returns `'N/A'`.
 * - `currency`: The currency to use (default `'USD'`).
 * - `style`: The style of the currency format (default `'currency'`).
 * - `fractionDigits`: An object with `minDecimals` and `maxDecimals` that specify the
 *   minimum and maximum number of digits to display after the decimal point (default `{ minDecimals: 2, maxDecimals: 2 }`).
 *
 * If both `minDecimals` and `maxDecimals` are 0, the function replaces `,` with `.`.
 *
 * @example
 * formatCurrency(1234.5) // => '$1,234.50'
 * formatCurrency(1234.5, 'EUR') // => '1,234.50 '
 * formatCurrency(1234.5, 'EUR', 'decimal') // => '1234.50'
 * formatCurrency(1234.5, 'EUR', 'decimal', { minDecimals: 0, maxDecimals: 0 }) // => '1234'
 */
export const formatCurrency = (
  value: number | undefined,
  currency: string | undefined = "RON",
  style: "decimal" | "currency" = "currency",
  fractionDigits: {
    minDecimals?: number | undefined;
    maxDecimals?: number | undefined;
  } = { minDecimals: 2, maxDecimals: 2 },
) => {
  if (value === undefined) {
    return "N/A";
  }

  const formattedValue = new Intl.NumberFormat("ro-RO", {
    style: style,
    currency: currency,
    minimumFractionDigits: fractionDigits.minDecimals,
    maximumFractionDigits: fractionDigits.maxDecimals,
  }).format(value);

  // If both minDecimals and maxDecimals are 0, replace ',' with '.'
  if (fractionDigits.minDecimals === 0 && fractionDigits.maxDecimals === 0) {
    return formattedValue.replace(/,/g, ".");
  }

  return formattedValue;
};
