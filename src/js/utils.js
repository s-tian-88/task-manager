export function validateColumnTitle(string) {
  // Check correctness of the input data
  const regex = /^[A-z](\w\s?){2,13}[A-z0-9]$/;
  return Boolean(string.match(regex));
}

export function convertTitleToSelector (title) {
  const selector = title.toLowerCase().replaceAll(' ', '-');
  return selector;
}

