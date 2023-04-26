import React from 'react'
import { useGet, useFind, useMutation } from 'figbird'

const useFigbird = (service, id) => {
  if (!id) return false
  return {
    get: useGet(service, id),
  }
}

export default useFigbird
