import { act, renderHook } from '@testing-library/react-hooks';
import useUpdate from './useUpdate';

describe('useUpdate', () => {
  const mockFn = jest.fn();

  const simulateAsyncCall = (data: unknown): Promise<unknown> => new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 100);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading as true while data is being updated', async () => {
    mockFn.mockImplementationOnce(simulateAsyncCall);
    const { result, waitForNextUpdate } = renderHook(() => useUpdate(mockFn));

    const [, update] = result.current;

    expect(result.current[0].loading).toEqual(false);

    await act(async () => {
      update({});
      await waitForNextUpdate();
      expect(result.current[0].loading).toEqual(true);
      await waitForNextUpdate();
      expect(result.current[0].loading).toEqual(false);
    });
  });

  it('should return error as undefined when data successfully updated', async () => {
    mockFn.mockResolvedValueOnce({});
    const { result } = renderHook(() => useUpdate(mockFn));

    const [, update] = result.current;

    await act(async () => {
      await update({});
    });

    expect(result.current[0].error).toBe(undefined);
  });

  it('should return error message when data cannot be updated', async () => {
    mockFn.mockRejectedValueOnce({ message: 'error' });
    const { result } = renderHook(() => useUpdate(mockFn));

    const [, update] = result.current;

    await act(async () => {
      await update({});
    });

    expect(result.current[0].error).toStrictEqual({ message: "error" });
  });

  it('should return data when successfully updated', async () => {
    mockFn.mockResolvedValueOnce({ test: 'test' });
    const { result } = renderHook(() => useUpdate(mockFn));

    const [, update] = result.current;

    await act(async () => {
      await update({});
    });

    expect(result.current[0].data).toEqual({ test: 'test' });
  });
});
