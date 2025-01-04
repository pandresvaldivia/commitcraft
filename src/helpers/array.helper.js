/**
 * Helper function to check if a value is an empty array.
 * `null` or `undefined` are considered "empty" in this context.
 * @param value - The value to check.
 * @returns `true` if the value is an array and has items.
 */
export function isArrayEmpty(value) {
  return !Array.isArray(value) || !value.length;
}
