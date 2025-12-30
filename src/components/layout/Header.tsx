'use client'

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'

interface HeaderProps {
  onSidebarOpenChange: (open: boolean) => void
}

export default function Header({ onSidebarOpenChange }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen)
    onSidebarOpenChange(isSidebarOpen)
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #E5E7EB'
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        
        {/* Left */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton edge="start">
            <MenuIcon onClick={() => handleMenuClick()} />
          </IconButton>

          <Typography variant="h6" fontWeight={600} color="text.primary">
            Admin
          </Typography>
        </Box>

        {/* Search */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            backgroundColor: '#F1F5F9',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            width: 280
          }}
        >
          <SearchIcon sx={{ color: '#64748B' }} />
          <InputBase
            placeholder="Search..."
            sx={{ ml: 1, flex: 1 }}
          />
        </Box>

        {/* Right */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar sx={{ width: 36, height: 36 }}>A</Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Box>

      </Toolbar>
    </AppBar>
  )
}
