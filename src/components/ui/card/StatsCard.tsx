"use client";

import { Card, CardContent, Typography } from "@mui/material";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card sx={{ minWidth: 200, flex: 1,backgroundColor: 'rgb(29, 41, 57)', color: 'white',borderRadius: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="rgb(146, 168, 198)" gutterBottom>
          {title}
        </Typography>

        <Typography variant="h5" fontWeight={600}>
          {value}
        </Typography>

        {icon && <div style={{ marginTop: 8 }}>{icon}</div>}
      </CardContent>
    </Card>
  );
}
