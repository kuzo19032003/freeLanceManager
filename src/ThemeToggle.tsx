"use client";

import { Switch } from "@mui/material";
import { useThemeMode } from "@/ThemeContext";

export default function ThemeToggle() {
  const { mode, toggle } = useThemeMode();



  return (
    <Switch
      checked={mode === "dark"}
      onChange={toggle}
    />
  );
}
