'use client'

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Chip
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DescriptionIcon from '@mui/icons-material/Description'
import FolderIcon from '@mui/icons-material/Folder'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import PsychologyIcon from '@mui/icons-material/Psychology'
import FindInPageIcon from '@mui/icons-material/FindInPage'
import PeopleIcon from '@mui/icons-material/People'
import SecurityIcon from '@mui/icons-material/Security'
import SettingsIcon from '@mui/icons-material/Settings'
import HistoryIcon from '@mui/icons-material/History'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const drawerWidth = 300

const menu = [
  {
    section: 'WORKSPACE',
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
      { title: 'Documents', path: '/dashboard/document', icon: <DescriptionIcon /> },
      { title: 'Folders', path: '/dashboard/folder', icon: <FolderIcon /> },
      { title: 'Upload', path: '/dashboard/upload', icon: <UploadFileIcon /> }
    ]
  },
  {
    section: 'AI INTELLIGENCE',
    items: [
      {
        title: 'Chat Both',
        path: '/ai/search',
        icon: <FindInPageIcon />,
        badge: 'AI'
      },
      {
        title: 'Smart Summary',
        path: '/ai/summary',
        icon: <AutoAwesomeIcon />,
        badge: 'AI'
      },
      {
        title: 'Document Insights',
        path: '/ai/insights',
        icon: <PsychologyIcon />,
        badge: 'AI'
      }
    ]
  },
  {
    section: 'MANAGEMENT',
    items: [
      { title: 'Users & Roles', path: '/users', icon: <PeopleIcon /> },
      { title: 'Access Control', path: '/security', icon: <SecurityIcon /> }
    ]
  },
  {
    section: 'SYSTEM',
    items: [
      { title: 'Audit Logs', path: '/logs', icon: <HistoryIcon /> },
      { title: 'Settings', path: '/settings', icon: <SettingsIcon /> }
    ]
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#0047AB',
          borderRight: '1px solid #E5E7EB'
        }
      }}
    >
      {/* Brand */}
      <Box px={3} py={2.5}>
        <Typography fontSize={18} fontWeight={700} color='white'>
          DocuFlow AI
        </Typography>
        <Typography fontSize={12} color="white">
          Intelligent Document Platform
        </Typography>
      </Box>
      {/* Menu */}
      <Box px={2} py={2} flexGrow={1}>
        {menu.map(group => (
          <Box key={group.section} mb={2.5}>
            <Typography
              fontSize={11}
              fontWeight={600}
              color="white"
              px={1}
              mb={1}
              letterSpacing={0.7}
            >
              {group.section}
            </Typography>

            <List disablePadding>
              {group.items.map(item => {
                const active = pathname === item.path

                return (
                  <ListItemButton
                    key={item.title}
                    component={Link}
                    href={item.path}
                    sx={{
                      mb: 0.5,
                      borderRadius: 2,
                      pl: 2.5,
                      color: active ? '#0047AB' : '#FFFFFF',
                      position: 'relative',
                      backgroundColor: active ? '#FFFFFF' : 'transparent',
                      boxShadow: active
                        ? '0 2px 6px rgba(0,0,0,0.06)'
                        : 'none',

                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 36,
                        color: active ? '#0047AB' : 'white'
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.title}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: active ? 600 : 500
                      }}
                    />
                  </ListItemButton>
                )
              })}
            </List>
          </Box>
        ))}
      </Box>

      <Box px={3} py={2}>
        <Typography fontSize={13} fontWeight={600} color='white'>
          Admin User
        </Typography>
        <Typography fontSize={12} color="white">
          AI Access Enabled
        </Typography>
      </Box>
    </Drawer>
  )
}
