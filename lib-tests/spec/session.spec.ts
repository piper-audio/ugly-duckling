import { PersistentStack } from '../../src/app/Session';
import * as jasmine from 'jasmine-core';

describe('PersistentStack', () => {
  it('can add values to the front and maintain undo history', () => {
    const stack = new PersistentStack<number>();
    stack.unshift(1);
    stack.unshift(2);
    expect(stack.get(0)).toBe(2);
    expect(stack.get(1)).toBe(1);
    stack.stepBack();
    expect(stack.get(0)).toBe(1);
    expect(stack.get(1)).toBeUndefined();
  });
});

