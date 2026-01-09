"use client";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  IconButton,
  styled
} from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import MenuSetting from "../ui/MenuSetting";
import ThemeToggle from "@/ThemeToggle";
interface SidebarProps {
  openSideBar: boolean;
}
interface navItemsType {
  label: string;
  href: string;
  icon: React.ReactNode;
}


const sidebarWidthMax = 240;
const sidebarWidthMin = 80;

const navItems: navItemsType[] = [
  { label: "Dashboard", href: "/dashboard", icon: <DashboardOutlinedIcon /> },
  { label: "Tasks", href: "/dashboard/tasks", icon: <AssignmentIcon /> },
  { label: "Clients", href: "/dashboard/clients", icon: <GroupsOutlinedIcon /> },
  { label: "Projects", href: "/dashboard/projects", icon: <CasesOutlinedIcon /> },
];


const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? sidebarWidthMax : sidebarWidthMin,
  flexShrink: 0,
  height: '100vh',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    width: open ? sidebarWidthMax : sidebarWidthMin,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    backgroundColor: 'rgb(29, 41, 57)',
    borderRight: '3px solid rgb(56, 75, 98)',
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    color: 'white',
  },

}))

export default function Sidebar({ openSideBar }: SidebarProps) {

  const pathname = usePathname();

  return (
    <StyledDrawer
      open={openSideBar}
      variant="permanent"
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'space-between' }}>
        <Box >
          {/* Title Project */}
          <Box sx={{ display: 'flex', alignItems: 'center', p: 1, ml: 2 }}>
            <LeaderboardIcon fontSize="medium" sx={{ m: openSideBar ? 2 : 1, color: 'rgb(71, 145, 224)' }} />

            {openSideBar && (
              <Typography variant="h5" noWrap component="h5" sx={{ fontWeight: 'bold' }}>
                FlowDash
              </Typography>
            )}

          </Box>

          {/* List item sidebar */}
          <List>
            {navItems.map((item) => {

              const isActive = pathname === item.href;

              return (
                <ListItemButton
                  key={item.href}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: isActive ? 'rgb(75, 139, 212)' : 'rgb(146, 168, 198)',
                    backgroundColor: isActive ? 'rgb(40, 61, 92)' : 'transparent',
                    borderRadius: 3,
                    width: '90%',
                    marginX: 'auto',
                    marginY: 2,
                    paddingX: 3,
                    '&:hover': {
                      color: isActive ? 'white' : 'white',
                      backgroundColor: isActive ? 'rgb(40, 61, 92)' : 'rgba(200, 200, 200, 0.1)',
                    }
                  }}>
                  <ListItemIcon
                    sx={{
                      color: isActive ? 'rgb(75, 139, 212)' : 'rgb(146, 168, 198)',
                      fontSize: 20,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      '& .MuiListItemText-primary': {
                        fontWeight: 'bold',
                        fontSize: 16,
                      }
                    }}
                  />
                </ListItemButton>
              )
            })
            }
          </List>
        </Box>

        {/* Setting */}
        <MenuSetting />

      </Box>

    </StyledDrawer>
  );
}
