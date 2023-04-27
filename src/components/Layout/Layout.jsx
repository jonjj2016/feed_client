import { Outlet } from 'react-router-dom'
import {
  AppShell,
  Navbar,
  Header,
  Divider,
  ScrollArea,
  SegmentedControl,
  Group,
  Center,
  Box,
} from '@mantine/core'
import MyNavBar from './Navbar'
import { setMode } from 'src/redux/index'
import { useDispatch, useSelector } from 'react-redux'
import { IconMoon, IconSun } from '@tabler/icons-react'
import CoreModal from '@app/modals/Core'

const Layout = () => {
  const { mode } = useSelector((state) => state.global)
  const dispatch = useDispatch()
  const toggleTheme = () => {
    dispatch(setMode())
  }
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      padding="md"
      navbar={
        <Navbar hidden={false} width={{ base: 300 }} p="xs">
          <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
            <MyNavBar />
            <CoreModal />
            {/* <Divider my="sm" /> */}
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div></div>
            <Group position="center" my="xl">
              <SegmentedControl
                value={mode}
                onChange={toggleTheme}
                data={[
                  {
                    value: 'light',
                    label: (
                      <Center>
                        <IconSun size="1rem" stroke={1.5} />
                        <Box ml={10}>Light</Box>
                      </Center>
                    ),
                  },
                  {
                    value: 'dark',
                    label: (
                      <Center>
                        <IconMoon size="1rem" stroke={1.5} />
                        <Box ml={10}>Dark</Box>
                      </Center>
                    ),
                  },
                ]}
              />
            </Group>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  )
}

export default Layout
