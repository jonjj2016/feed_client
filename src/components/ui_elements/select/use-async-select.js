import { useDebouncedState } from '@mantine/hooks'
import { useFind } from 'figbird'
import { useEffect } from 'react'

const useAsyncSelect = ({
  queryParams,
  serviceName,
  searchQueryKey = 'title',
  valueKey = '_id',
  labelKey = 'title',
  renderOptionLabel,
}) => {
  const initialQuery = {
    $sort: '-createdAt',
    isDeleted: false,
    ...queryParams,
  }
  const [searchValue, setSearchValue] = useDebouncedState('', 500)
  const { data, isFetching, status, refetch } = useFind(serviceName, {
    query: { ...initialQuery, query: { [searchQueryKey]: searchValue } },
    skip: false,
  })

  const onChangeInput = (value) => setSearchValue(value)

  const optionAdapter = (item) => {
    return {
      value: item[valueKey],
      label: renderOptionLabel ? renderOptionLabel(item) : item[labelKey],
    }
  }
  return {
    isLoading: status === 'loading',
    isFetching,
    selectProps: {
      data: data ? data.map(optionAdapter) : [],
      onSearchChange: onChangeInput,
    },
  }
}

export default useAsyncSelect
