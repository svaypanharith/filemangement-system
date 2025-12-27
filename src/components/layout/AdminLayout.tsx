'use client'

import { Box } from '@mui/material'
import Sidebar from './Sidebar'
import Header from '../layout/Header'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box display="flex">
      < Sidebar />
      <Box flexGrow={1}>
        <Header />
        <Box p={3}>{children}</Box>
      </Box>
    </Box>
  )
}
