// import { useEffect } from 'react'
// import { Button } from '@mantine/core'
// import useModalNavigate from 'src/Hooks/useModalRouter'
// import { useSelector } from 'react-redux'
// import { useMutation, useGet } from 'figbird'
// import { notifications } from '@mantine/notifications'
// import { useParams, useNavigate } from 'react-router-dom'
// import constants from 'src/ModalTypes/index'
// import ModalWrapper from 'src/components/Modal'
// import GroupForm from './Form'

// const CurriculumContainer = ({ process }) => {
//   const { id } = useParams()
//   const { open, match, close, params } = useModalNavigate()
//   const { data } = useGet(constants.GROUPS, params?.id)
//   const { create, patch, error: mutationError } = useMutation(constants.GROUPS)
//   const { userId } = useSelector((state) => state.global)

//   const onSave = async (reset, formValues) => {
//     if (process === 'create') {
//       await create({ ...formValues, createdBy: userId, curriculumId: id })
//       notifications.show({
//         title: 'Congratulations',
//         message: 'Successfully created Group',
//         color: 'green',
//       })
//     } else {
//       await patch(id, formValues, { new: true })
//     }
//     close()
//     reset({
//       text: '',
//       title: '',
//     })
//     close()
//   }
//   useEffect(() => {
//     if (mutationError) {
//       notifications.show({
//         title: mutationError.message,
//         color: 'red',
//         message: mutationError.message,
//       })
//     }
//   }, [mutationError])
//   const onDelete = async (data) => {
//     if (params?.id) {
//       await patch(params?.id, { new: true })
//       close()
//     }
//   }
//   return (
//     <div>
//       <ModalWrapper
//         opened={match(constants.GROUPS)}
//         onClose={close}
//         title="Create Group"
//       >
//         <GroupForm data={data} onSave={onSave} onDelete={onDelete} />
//       </ModalWrapper>
//       <Button variant="default" onClick={() => open(constants.GROUPS)}>
//         {process === 'create' ? 'Create Group' : 'Open'}
//       </Button>
//     </div>
//   )
// }

// export default CurriculumContainer
