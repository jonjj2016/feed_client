import React from 'react'
import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import useModalNavigate from '@hooks/useModalRouter'

const Dashboard = () => {
  const { open } = useModalNavigate()
  return (
    <div>
      <Button onClick={() => open('students')}>Create Student</Button>
    </div>
  )
}

export default Dashboard
