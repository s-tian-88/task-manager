import { validateColumnTitle, convertTitleToSelector } from '../utils';

describe('validate utils', () => {
  test.each([
    ['current title', 'column title', true],
    ['short current title', 'test', true],
    ['to short title', 'A', false],
    ['long current title', 'A'.repeat(15), true],
    ['to long title', 'a'.repeat(16), false],
    ['startswith digit', '1test', false],
    ['current title with digits', 'te111st', true],
    ['current title with space', 'te11 1st', true],
    ['incurrent title with startswith space', ' te11 1st', false],
    ['incurrent title with double space', ' te11  1st', false],
  ])('testing %s with value "%s" and expected - %s', (desc, string, expected) => {
    expect(validateColumnTitle(string)).toBe(expected);
  });

  test.each([
    ['input with upper case', 'TEST input', 'test-input'],
    ['input with several spaces', 'input element selector', 'input-element-selector'],
  ])('testing "%s", test: %s, expected: %s', (desc, string, expected) => {
    expect(convertTitleToSelector(string)).toBe(expected);
  });
});
