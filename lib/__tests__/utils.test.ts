import { cn } from '../utils';

describe('cn', () => {
  it('combines class names with a space', () => {
    expect(cn('a', 'b')).toBe('a b');
  });

  it('handles falsy values and deduplicates', () => {
    const value = false as unknown as string;
    expect(cn('a', value, 'a')).toBe('a a');
  });
});
