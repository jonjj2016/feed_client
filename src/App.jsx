import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { useSelector } from 'react-redux'
import { Provider } from 'figbird'
import feathersClient from '@state/feathersServices'
import theme from './theme'
import { Notifications } from '@mantine/notifications'

import {
  Curricula,
  Groups,
  GroupDetails,
  CurriculaDetails,
  Lectures,
  Students,
  StudentDetails,
  FeedBacks,
  Dashboard,
} from '@pages/index'
import Layout from '@app/Layout/Layout'

function App() {
  const { mode } = useSelector((state) => state.global)
  return (
    <Provider feathers={feathersClient}>
      <BrowserRouter>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: mode,
            ...theme,
          }}
        >
          <Notifications />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/:id" element={<StudentDetails />} />
              <Route path="/groups" element={<Groups />} />
              <Route path="/groups/:id" element={<GroupDetails />} />
              <Route path="/curricula" element={<Curricula />} />
              <Route path="/curricula/:id" element={<CurriculaDetails />} />
              <Route path="/lectures" element={<Lectures />} />
              <Route path="/feedbacks" element={<FeedBacks />} />
            </Route>
          </Routes>
        </MantineProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App
