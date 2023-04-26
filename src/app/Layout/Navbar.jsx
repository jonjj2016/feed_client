import { useState } from 'react'
import { Container, NavLink } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import {
  IconHome2,
  IconAddressBook,
  IconActivity,
  IconFileInvoice,
  IconUser,
  IconAbacus,
} from '@tabler/icons-react'

const data = [
  {
    icon: IconHome2,
    label: 'Dashboard',
    href: '/',
  },

  { icon: null, label: 'Pages' },
  //   { icon: IconUser, href: '/students', label: 'Students' },
  { icon: IconAbacus, href: '/lectures', label: 'Lectures' },
  { icon: IconAddressBook, href: '/groups', label: 'Groups' },
  { icon: IconFileInvoice, href: '/feedbacks', label: 'Feedbacks' },
  { icon: IconActivity, href: '/curricula', label: 'Curricula' },
]
const Navbar = () => {
  const [active, setActive] = useState('')
  const navigate = useNavigate()
  const items = (data) => (
    <>
      {data.map((item, index) => (
        <NavLink
          key={item.label}
          active={item.label === active}
          label={item.label}
          icon={item.icon && <item.icon size="1.5rem" stroke={1.5} />}
          onClick={() => {
            if (item.icon) {
              navigate(item?.href)
              setActive(item.label)
            }
          }}
        />
      ))}
    </>
  )

  return <Container>{items(data)}</Container>
}

export default Navbar
