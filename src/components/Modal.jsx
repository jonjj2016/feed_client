import { Modal } from '@mantine/core'

const CustomModal = ({ children, ...props }) => {
  return (
    <Modal opened={props.opened} {...props}>
      {children}
    </Modal>
  )
}

export default CustomModal
