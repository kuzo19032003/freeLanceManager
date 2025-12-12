import StatsCard from "@/components/ui/StatsCard";
import { Grid } from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export default function DashboardPage() {
  const stats = [
    { title: "Clients", value: 12, icon: <PersonIcon fontSize="large" /> },
    { title: "Projects", value: 8, icon: <WorkIcon fontSize="large" /> },
    { title: "Tasks", value: 34, icon: <AssignmentIcon fontSize="large" /> },
    { title: "Income", value: "$12,500", icon: <MonetizationOnIcon fontSize="large" /> },
  ];

  return (
    <div>
      <Grid container spacing={4} mb={4}>
        {stats.map((stat) => (
          <Grid  key={stat.title} size={3} >
            <StatsCard title={stat.title} value={stat.value} icon={stat.icon} />
          </Grid>
        ))}
      </Grid>
      <StatsCard title="Additional Stats" value="More details here" icon={<AssignmentIcon fontSize="large" />} />
    </div>
  );
}
