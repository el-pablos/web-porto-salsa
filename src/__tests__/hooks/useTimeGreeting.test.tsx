import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useTimeGreeting } from '@/hooks';
import { renderHook } from '@testing-library/react';

describe('useTimeGreeting', () => {
  const mockDate = (hour: number) => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2024, 0, 1, hour, 0, 0));
  };

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns morning greeting between 4-10', () => {
    mockDate(8);
    const { result } = renderHook(() => useTimeGreeting());
    expect(result.current.greeting).toBe('Selamat Pagi');
    expect(result.current.period).toBe('morning');
    expect(result.current.emoji).toBe('🌅');
  });

  it('returns afternoon greeting between 11-14', () => {
    mockDate(12);
    const { result } = renderHook(() => useTimeGreeting());
    expect(result.current.greeting).toBe('Selamat Siang');
    expect(result.current.period).toBe('afternoon');
    expect(result.current.emoji).toBe('☀️');
  });

  it('returns evening greeting between 15-17', () => {
    mockDate(16);
    const { result } = renderHook(() => useTimeGreeting());
    expect(result.current.greeting).toBe('Selamat Sore');
    expect(result.current.period).toBe('evening');
    expect(result.current.emoji).toBe('🌇');
  });

  it('returns night greeting between 18-21', () => {
    mockDate(20);
    const { result } = renderHook(() => useTimeGreeting());
    expect(result.current.greeting).toBe('Selamat Malam');
    expect(result.current.period).toBe('night');
    expect(result.current.emoji).toBe('🌙');
  });

  it('returns late night greeting between 22-3', () => {
    mockDate(23);
    const { result } = renderHook(() => useTimeGreeting());
    expect(result.current.greeting).toBe('Halo Night Owl');
    expect(result.current.period).toBe('latenight');
    expect(result.current.emoji).toBe('🦉');
  });

  it('returns contextual message', () => {
    mockDate(8);
    const { result } = renderHook(() => useTimeGreeting());
    expect(result.current.contextualMessage).toBeDefined();
    expect(typeof result.current.contextualMessage).toBe('string');
  });
});
