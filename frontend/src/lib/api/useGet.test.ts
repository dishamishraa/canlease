import { act, renderHook } from '@testing-library/react-hooks';
import useGet from './useGet';

describe('useGet', () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return loading as true while data is being fetched', async () => {
    mockFn.mockResolvedValueOnce({});
    const { result, waitForNextUpdate } = renderHook(() => useGet(mockFn));

    expect(result.current.loading).toBe(true);

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current).toMatchObject({ loading: false });
  });

  it('should return error as undefined when data successfully fetched', async () => {
    mockFn.mockResolvedValueOnce({});
    const { result, waitForNextUpdate } = renderHook(() => useGet(mockFn));

    await waitForNextUpdate();

    expect(result.current).toMatchObject({ error: undefined });
  });

  it('should return error message when data cannot be fetched', async () => {
    mockFn.mockRejectedValueOnce({ message: 'error' });
    const { result, waitForNextUpdate } = renderHook(() => useGet(mockFn));

    await waitForNextUpdate();

    expect(result.current).toMatchObject({ error: { message: 'error' } });
  });

  it('should return data when successfully fetched', async () => {
    mockFn.mockResolvedValueOnce({ test: 'test' });
    const { result, waitForNextUpdate } = renderHook(() => useGet(mockFn));

    await waitForNextUpdate();

    expect(result.current).toMatchObject({ data: { test: 'test' } });
  });

  it('should refetch data when the refetch method is called', async () => {
    mockFn.mockResolvedValue({ test: 'test' });

    const { result, waitForNextUpdate } = renderHook(() => useGet(mockFn));

    await act(async () => {
      result.current.refetch();
      await waitForNextUpdate();
    });

    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});
