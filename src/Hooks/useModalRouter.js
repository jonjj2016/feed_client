import {
  useNavigate,
  useLocation,
  useSearchParams,
  useParams,
} from 'react-router-dom'

const useModalNavigate = () => {
  const navigate = useNavigate()
  const { pathname, hash, state } = useLocation()
  let [searchParams] = useSearchParams()
  const params = useParams()
  const updateId = searchParams.get('updateId')
  const groupId = searchParams.get('groupId')
  return {
    state: { ...state, params, updateId, pathname, groupId },
    match: (checkHash) => {
      return hash === `#${checkHash}`
    },
    open: (hash, params) => {
      navigate({ pathname, hash, ...params })
    },
    close: () => {
      navigate({ hash: '', state: '' })
    },
  }
}
export default useModalNavigate
