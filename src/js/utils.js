export function validateColumnTitle(string) {
  const regex = /^[A-z](\w\s?){2,13}[A-z0-9]$/;
  return Boolean(string.match(regex));
};
