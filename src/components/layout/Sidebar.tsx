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
import { Bot , AudioLines } from 'lucide-react'
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
import { useTranslation } from "react-i18next";


const drawerWidth = 250
interface SidebarProps {
  isOpen: boolean
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()

  const { t } = useTranslation()


  const menu = [
  {
    section: t('dashboard.workspace'),
    items: [
      { title: t('dashboard.dashboard'), path: '/dashboard', icon: <DashboardIcon /> },
      { title: t('dashboard.my_documents'), path: '/dashboard/mydocument', icon: <DescriptionIcon /> },
      { title: t('dashboard.upload'), path: '/dashboard/document', icon: <UploadFileIcon /> }
    ]
  },
  {
    section: t('dashboard.ai_intelligence'),
    items: [
      {
        title: t('dashboard.chat_both'),
        path: '/dashboard/chatbot',
        icon: <Bot />,
        badge: 'AI'
      },
        {
          title: t('dashboard.voice_convert'),
          path: '/ai/voice',
          icon: <AudioLines/>,
          badge: 'AI'
        },
    
    ]
  },

  {
    section: t('dashboard.system'),
    items: [
      { title: t('dashboard.settings'), path: '/dashboard/setting', icon: <SettingsIcon /> }
    ]
  }
]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? drawerWidth : 0,
          boxSizing: 'border-box',
          backgroundColor: '#0047AB',
          borderRight: '1px solid #E5E7EB',
          position: 'fixed',
          height: '100vh',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          whiteSpace: 'nowrap',
          zIndex: (theme) => theme.zIndex.drawer
        }
      }}
    >
      <Box px={3} py={2.5}>
        <Typography fontSize={18} fontWeight={700} color='white'>
          {t('dashboard.document_management')}
        </Typography>
        <Typography fontSize={12} color="white">
          {t('dashboard.Intelligent_document_platform')}
        </Typography>
      </Box>
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
    </Drawer>
  )
}
