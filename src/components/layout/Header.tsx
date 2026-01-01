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
import SwitchLanguage from '@/components/share/SwitchLanguage'
import { useGetProfileInfoQuery } from '@/redux/slices/data-slice'
import { useState } from 'react'
import { getLocalStorage } from "@/utils/storage";
import Image from 'next/image';



interface HeaderProps {
  onSidebarOpenChange: (open: boolean) => void
}

export default function Header({ onSidebarOpenChange }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    const { data: profile } = useGetProfileInfoQuery();
   let image = "";
    const userImageRaw = getLocalStorage(`user_image_${profile?.user.id}`);
    if (userImageRaw) {
      try {
        const parsed = typeof userImageRaw === "string" ? JSON.parse(userImageRaw) : userImageRaw;
        image = parsed?.imageDataUrl || "";
      } catch {
        image = "";
      }
    }

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
        </Box>
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

        <Box display="flex" alignItems="center" gap={2}>
          <IconButton>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
           <div className="flex items-center gap-4">
                  <SwitchLanguage />
                  <span className="text-sm font-medium text-black">{profile?.user.email}</span>
                  {userImageRaw ? <Image src={image || ""} alt="profile" width={36} height={36} className="rounded-full" /> : 
                  <div className="bg-gray-100 rounded-full p-2 cursor-pointer">
                    <span className="text-sm font-medium text-black w-8 h-8 flex items-center justify-center">
                      {profile?.user.email.split("@")[0].slice(0, 1).toUpperCase()}
                    </span>
                  </div>
          }
                </div>
        </Box>

      </Toolbar>
    </AppBar>
  )
}
