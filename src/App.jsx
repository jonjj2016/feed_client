import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
import { MantineProvider } from '@mantine/core'
import { useSelector } from 'react-redux'
import { Provider } from 'figbird'
import feathersClient from 'src/redux/feathersServices'
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
} from 'src/pages/index'
// const Curricula = lazy(() => import("@pages"));
// const Groups = lazy(() => import("@pages/Groups"));
// const GroupDetails = lazy(() => import("@pages/GroupDetails"));
// const CurriculaDetails = lazy(() => import("@pages/CurriculaDetails"));
// const Lectures = lazy(() => import("@pages/Lectures"));
// const Students = lazy(() => import("@pages/Students"));
// const StudentDetails = lazy(() => import("@pages/StudentDetail"));
// const FeedBacks = lazy(() => import("@pages/FeedBacks"));
// const Dashboard = lazy(() => import("@pages/Dashboard"));

import Layout from 'src/components/Layout/Layout'

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
          <Notifications position="top-right" zIndex={2077} />
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
