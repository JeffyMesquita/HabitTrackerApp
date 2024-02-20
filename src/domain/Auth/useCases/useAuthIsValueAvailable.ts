import {useDebounce} from '@hooks';
import {QueryKeys} from '@infra';
import {useQuery} from '@tanstack/react-query';

import {authService} from '../authService';

interface Param<T extends {length: number}> {
  value: T;
  enable: boolean;
  queryKey: QueryKeys;
  isAvailableFunc: (value: T) => Promise<boolean>;
}

function useAuthIsValueAvailable<T extends {length: number}>({
  value,
  enable,
  queryKey,
  isAvailableFunc,
}: Param<T>) {
  const debouncedValue = useDebounce(value, 1500);

  const {data, isFetching} = useQuery({
    queryKey: [queryKey, debouncedValue],
    queryFn: () => isAvailableFunc(debouncedValue),
    retry: false,
    staleTime: 20000,
    enabled: enable && debouncedValue.length > 0,
  });

  const isDebouncing = debouncedValue !== value;

  return {
    isAvailable: !!data,
    isUnavailable: data === false,
    isFetching: isFetching || isDebouncing,
  };
}

export function useAuthIsEmailAvailable({
  email,
  enable,
}: {
  email: string;
  enable: boolean;
}) {
  return useAuthIsValueAvailable({
    value: email,
    enable,
    queryKey: QueryKeys.IsEmailAvailable,
    isAvailableFunc: authService.isEmailAvailable,
  });
}
