import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useIdleDetection } from '@/hooks';

describe('useIdleDetection', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts as not idle', () => {
    const { result } = renderHook(() => useIdleDetection(5000));
    expect(result.current.isIdle).toBe(false);
  });

  it('becomes idle after timeout', () => {
    const { result } = renderHook(() => useIdleDetection(5000));

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(result.current.isIdle).toBe(true);
  });

  it('resets activity on resetActivity call', () => {
    const { result } = renderHook(() => useIdleDetection(5000));

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(result.current.isIdle).toBe(true);

    act(() => {
      result.current.resetActivity();
    });

    expect(result.current.isIdle).toBe(false);
  });

  it('tracks lastActivity', () => {
    const now = Date.now();
    const { result } = renderHook(() => useIdleDetection(5000));

    expect(result.current.lastActivity).toBeGreaterThanOrEqual(now);
  });
});
