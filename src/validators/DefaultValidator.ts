/**
 * Checks if the given date string is valid.
 * @param dateStr - The date string to validate (YYYYMMDD).
 * @returns True if the date string is valid, false otherwise.
 */
const isValidDate = (dateStr: string): boolean => {
  if (dateStr.length !== 8) {
    return false;
  }

  if (!/^\d+$/.test(dateStr)) {
    return false;
  }

  const year = parseInt(dateStr.substr(0, 4));
  const month = parseInt(dateStr.substr(4, 2));
  const day = parseInt(dateStr.substr(6, 2));

  const parsedDate = new Date(year, month - 1, day);
  return (
    parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day
  );
};

/**
 * Checks if the given amount string is valid.
 * @param amount - The amount string to validate.
 * @returns True if the amount string is valid, false otherwise.
 */
const isValidAmount = (amount: string): boolean => {
  const amountNumber = Number(amount);
  if (isNaN(amountNumber)) return false;

  if (amountNumber <= 0) return false;

  const amountDecimal = amount.split('.')[1];
  return !(amountDecimal && amountDecimal.length > 2);
};

/**
 * Checks if the given transaction type is valid.
 * @param type - The transaction type to validate.
 * @returns True if the transaction type is valid (either 'W' or 'D'), false otherwise.
 */
const isValidType = (type: string): boolean => {
  return type === 'W' || type === 'D';
};

/**
 * Checks if the given interest rate string is valid.
 * @param interestRate - The interest rate string to validate.
 * @returns True if the interest rate string is valid, false otherwise.
 */
const isValidInterestRate = (interestRate: string): boolean => {
  const interestNumber = Number(interestRate);
  if (isNaN(interestNumber)) return false;

  return interestNumber > 0 && interestNumber < 100;
};

/**
 * Validates the given month string.
 * @param month - The month string to validate.
 * @returns True if the month string is valid (between 01 and 12), false otherwise.
 */
const validateMonth = (month: string): boolean => {
  const monthNumber = Number(month);
  if (isNaN(monthNumber)) return false;

  return monthNumber >= 1 && monthNumber <= 12;
};

export {
  isValidDate,
  isValidAmount,
  isValidType,
  isValidInterestRate,
  validateMonth,
};

  