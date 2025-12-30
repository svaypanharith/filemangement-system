'use client'


import { Box } from '@mui/material'
import Sidebar from './Sidebar'
import Header from '../layout/Header'
import { useState } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  return (
    <Box display="flex" minHeight="100vh" position="relative">
      <Sidebar isOpen={!isSidebarOpen} />
      <Box 
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: isSidebarOpen ? '0px' : 0,
          transition: 'margin 0.3s ease, width 0.3s ease',
          minHeight: '100vh',
          overflow: 'auto',
          position: 'relative',
          backgroundColor: '#f9fafb'
        }}
      >
        <Header 
          onSidebarOpenChange={(open: boolean) => {
            console.log("isOpen from AdminLayout", open)
            setIsSidebarOpen(open)
          }} 
        />
        <Box p={3}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
