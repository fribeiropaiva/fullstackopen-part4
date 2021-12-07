const { palindrome } = require('../utils/for_testing');

test('palindrome of a', () => {
  const result = palindrome('a');

  expect(result).toBe('a');
});

test('palindrome of releveler', () => {
  const result = palindrome('releveler');

  expect(result).toBe('releveler');
});
