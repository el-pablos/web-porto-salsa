import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useConfettiEgg } from '@/components/effects/useConfettiEgg';

// Mock canvas-confetti
jest.mock('canvas-confetti', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('useConfettiEgg', () => {
  it('starts with click count 0', () => {
    const { result } = renderHook(() => useConfettiEgg(5));
    expect(result.current.clickCount).toBe(0);
  });

  it('increments click count on each click', () => {
    const { result } = renderHook(() => useConfettiEgg(5));
    act(() => result.current.handleClick());
    expect(result.current.clickCount).toBe(1);
    act(() => result.current.handleClick());
    expect(result.current.clickCount).toBe(2);
  });

  it('resets click count after reaching threshold', () => {
    const { result } = renderHook(() => useConfettiEgg(3));
    act(() => result.current.handleClick());
    act(() => result.current.handleClick());
    act(() => result.current.handleClick());
    expect(result.current.clickCount).toBe(0);
  });
});
