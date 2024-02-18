import {useInfiniteQuery} from '@tanstack/react-query';
import {Page} from '@types';

export interface UsePaginatedListResult<TData> {
  list: TData[];
  isError: boolean | null;
  isLoading: boolean;
  refresh: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
}
export function usePaginatedList<Data>(
  queryKey: readonly unknown[],
  getList: (page: number) => Promise<Page<Data>>,
): UsePaginatedListResult<Data> {
  const {data, isError, isLoading, fetchNextPage, hasNextPage, refetch} =
    useInfiniteQuery({
      queryKey,
      queryFn: ({pageParam = 1}) => getList(pageParam),
      getNextPageParam: ({meta}) =>
        meta.currentPage < meta.lastPage ? meta.currentPage + 1 : null,
    });

  const list = data?.pages.flatMap(page => page.data) || [];

  const fetchNextPageIfPossible = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return {
    list,
    isError,
    isLoading,
    refresh: refetch,
    fetchNextPage: fetchNextPageIfPossible,
    hasNextPage: !!hasNextPage,
  };
}
