"use client";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const sidebarWidth = 240;
const sidebarWidthMin = 80;


interface TopbarProps {
  openSideBar: boolean;
  setOpenSideBar: (open: boolean) => void;
}


export default function Topbar({ openSideBar, setOpenSideBar }: TopbarProps) {

  const toggleSideBar = () => {
    setOpenSideBar(!openSideBar)
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'rgb(29, 41, 57)',
        width: `calc(100% - ${openSideBar ? sidebarWidth : sidebarWidthMin}px)`,
        ml: `${openSideBar ? sidebarWidth : sidebarWidthMin}px`,

        transition: (theme) => theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        })
      }}
    >
      <Toolbar>

        <IconButton onClick={toggleSideBar} sx={{ '&:hover': { backgroundColor: 'transparent' } }}>
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>


      </Toolbar>
    </AppBar>
  );
}
