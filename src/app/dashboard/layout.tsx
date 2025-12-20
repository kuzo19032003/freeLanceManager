"use client";

import { Box } from "@mui/material";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import { useState } from "react";
import { useThemeMode } from "@/ThemeContext";
import useAuthInit from "@/hooks/useAuthInit";
import { useAppSelector } from "@/hooks/useRedux";
import Loading from "@/loading";

export default function DashboardLayout({ children }: any) {
  const { mode } = useThemeMode();

  const [openSideBar, setOpenSideBar] = useState<boolean>(true)

  useAuthInit()
  const { isHydrated } = useAppSelector(state => state.auth)

  return (
    <>
      {!isHydrated && (
        <Loading />
      )}
      <Box sx={{ display: "flex", bgcolor: 'rgb(16, 24, 34)', color: 'white' }}>
        {/* Header */}
        <Topbar
          openSideBar={openSideBar}
          setOpenSideBar={setOpenSideBar}
        />

        {/* Sidebar */}
        <Sidebar
          openSideBar={openSideBar}
        />

        {/* Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: (theme) =>
              mode === "dark"
                ? theme.palette.grey[100]
                : 'rgb(16, 24, 34)',
            minHeight: "100vh",
            p: 3,
            borderTop: '3px solid rgb(56, 75, 98)',
            mt: "64px",
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}
